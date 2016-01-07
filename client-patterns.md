#Client Patterns
##Local Caching
###Profile
We should cache each profile object and last-updated. We can use the last-updated with If-Modified-Since to check for 304 not-modified status on http requests.

###Feeds
We should cache each profile's current feed address. We only have to check for a new one if the profile has been updated. We should also store the last-updated of the feed object for 304 checks.

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
FetchProfile(profileUrl, lastUpdated)
    let profileResult = HttpGet(profileUrl, lastUpdated)
    switch(profileResult.status)
        301:
            /* not modified */
            return
        200:
            let profile = CreateProfileFrom(profileResult.body)
            /* first check for encryption */
            if exists(profile.keys) and exists(profile.profile) then
                let key = GetDecryptionKey(profileUrl)
                SaveProfile(profileUrl, CreateProfileFrom(Decrypt(profile, key)))
            else
                SaveProfile(profileUrl, profile)
```

##Fetch Items