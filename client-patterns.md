#Client Patterns
##Local Caching
###Items
We should naturally be caching items locally.
####Poster
The poster of an item is not included in the item as - in theory - we know who posted it from where we got it when storing an item. We should include the poster in the local copy.
```json
{
  "id":"http://cf.delek.org/feeds/1#1",
  "date":"2015-10-28T16:22:00.0Z",
  "text":"hello",
  "cachedData": {
    "poster":"http://cf.delek.org"
  }
}
```
###Friends
We should cache each friend's home profile object and last-downloaded. We can use the last-downloaded with If-Modified-Since to check for 304 not-modified status on http requests.

###Feeds
We should cache each friend's current feed address. We only have to check for a new one if the friend's home profile has been updated. We should also store the last-downloaded of the feed object for 304 checks.

##Fetching Feeds & Items
```
FetchFeed (feedAddress, feedLastDL)
  let feedResponse = HttpGet(feedAddress, feedLastDL)
  switch (HttpStatus(feedResponse))
    304:
      /* not modified */
      return
    301,308:
      /* moved/permanent redirect */
      let newFeedAddress = HttpHeader(feedResponse, "Location")
      UpdateFeedAddress(feedAddress, newFeedAddress)
      FetchFeed (newFeedAddress, feedLastDL)
      return
    307:
      /* temporary redirect */
      let newFeedAddress = HttpHeader(feedResponse, "Location")
      FetchFeed (newFeedAddress, feedLastDL)
      return
    200:
      let feed = CreateFeed(HttpBody(feedResponse))
      for each item in Items(feed)
        if not ItemExists(item) then
          SaveItem(item)
      return

FetchFriendUpdates (feedAddress, feedLastDL, friendAddress, friendLastDL)
  let friendResponse = HttpGet(friendAddress, friendLastDL)
  switch (HttpStatus(friendResponse))
    304:
      /* not modified */
      FetchFeed(feedAddress)
    301,308:
      /* moved/permanent redirect */
      let newFriendAddress = HttpHeader(friendResponse, "Location")
      UpdateFriendAddress(friendAddress, newFriendAddress)
      FetchFriendUpdates (feedAddress, feedLastDL, newFriendAddress, friendLastDL)
      return
    307:
      /* temporary redirect */
      let newFriendAddress = HttpHeader(friendResponse, "Location")
      FetchFriendUpdates (feedAddress, feedLastDL, newFriendAddress, friendLastDL)
      return
    200:
      let newFriend = CreateFriend(HttpBody(friendResponse))
      SaveFriend(friendAddress, newFriend)
      let newFeedAddress = GetFeedAddress(newFriend)
      if newFeedAddress <> feedAddress then
        UpdateFeedAddress(feedAddress, newFeedAddress)
        FetchFeed(newFeedAddres, lastFeedDL)
      else
        FetchFeed(feedAddres, lastFeedDL)
  
```
