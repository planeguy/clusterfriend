#Client Patterns
##Local Caching
###Profile
We should cache each profile object and last-updated. We can use the last-updated with If-Modified-Since to check for 304 not-modified status on http requests.

###Feeds
We do not have to cache the feed address or the feed object itself. the most current feed address should be in the cached profile. We should however store the last-updated of the feed object for 304 checks.

###Items
We should naturally be caching items locally.
####Poster
The poster of an item is not included in the item as - in theory - we know who posted it from where we got it when storing an item. We should include the poster in the local copy.
```json
{
  "url":"http://cf.delek.org/feeds/1#1",
  "date":"2015-10-28T16:22:00.0Z",
  "text":"hello",
  "cachedData": {
    "poster":"http://cf.delek.org"
  }
}
```

##I Got a Profile
In theory, the process for adding a friend is:

1. Friend sends you a link to their profile
1. You download the file and cache the relevant data
1. You can start receiving items

```
FetchProfile(profileUrl)
    set profileResult = HttpGet(profileUrl, ProfileLastUpdated(profileUrl))
    switch(profileResult.status)
        301:
            /* not modified */
            return
        200:
            set profile = CreateProfileFrom(profileResult.body)
            /* first check for encryption */
            if exists(profile.keys) and exists(profile.profile) then
                if not exists(DecryptionKeys(profileUrl)) FetchDecryptionKey(profile.keys, profileUrl)
                SaveProfile(profileUrl, CreateProfileFrom(Decrypt(profile, DecryptionKeys(profileUrl))), IS_ENCRYPTED)
            else
                SaveProfile(profileUrl, profile, IS_NOT_ENCRYPTED)
```
##Fetch Items
Getting feed items is a simple process:

1. fetch the profile. if not modified/error, no harm no foul
1. download the feed file at the url indicated in the profile
1. save any items we don't have yet

```
FetchFeed(profileUrl)
    FetchProfile(profileUrl)
    set feedUrl = Profiles(profileUrl).feed
    set feedLastUpdated = FeedLastUpdated(profileUrl)
    set feedResult = HttpGet(feedUrl, feedLastUpdated)
    switch(feedResult.status)
        301:
            /* not modified */
            return
        200:
            if exists DecryptionKeys(profileUrl) then
                set feed = CreateFeedFrom(Decrypt(feedResult.body, DecryptionKeys(profileUrl))
            else
                set feed = CreateFeedFrom(feedResult.body)
            for each item in feed.items do
                if not exists(Items(item.url)) then SaveItem(profileUrl, item)
            SaveFeedLastUpdatedNow(profileUrl)
```

##Fetch Decryption Key
If a profile is encrypted, a user would be given the decryption key in that profile's keys file.
```
FetchDecryptionKeys(keysUrl, profileUrl)
    set keysLastUpdated(keysUrl)
    set keysResponse = HttpGet(keysUrl, keyLastUpdated)
    switch(keysResponse.status)
        304:
            /* not modified */
            return
        200:
            set keys = CreateKeysSetFrom(keysResponse.body)
            set myFingerprint = Myself.publicKeyFingerPrint
            if exists keys(myFingerprint) then SaveDecryptionKey(profileUrl,keys(myFingerprint)) 

```
##Comment Threads
Every time a user replies to another item, we should be able to get that and other related items

1. We want to display an item with a "re" property
1. We should search the items cache for the re: item
1. If the item is found, add it to the display of the original item
1. If the found item also has a re: property, repeat until a maximum depth is hit