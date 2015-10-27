#Algorithms

##Add or get updated friend
```
UpdateFriend (friendHomeHref, myFriends)
  set friendHome = HttpGet(homeHref)
  if IsValidHome(friendHome) then
    set myFriends(friendHomeHref) = friendHome
    return friendHome
```

##Update Groups From Friend
```
UpdateGroupsFromFriend (friendHome, myHome, groupsIBelongTo)
  set groupsHref = friendHome.friends + '/' + myHomeHref
  set groups = HttpGet(groupsHref)
  if IsValidGroupFile(groups) then
     set groupsIBelongTo(friendHomeHref) = groups
     return groupsIBelongTo
```

##Get New Items From Feed
```
GetNewItemsFromFeed (feedHref, friendHome, myHome, myCachedItems, groupsIBelongTo)
  set feed = HttpGet(feedHref)
  if IsValidFeed(feed) then
    set feedItems = feed.items
    set currentItem = feedItems[0]
    while (not Contains(currentItem, myCachedItems))
      if currentItem.sdata <> null and currentItem.sgroup <> null and groupsIBelongTo(friendHome.home)(currentItem.sgroup) <> null then
        set newItemToAdd = Decrypt(currentItem.sdata, groupsIBelongTo(friendHomeHref)(currentItem.sgroup))
      else
        set newItemToAdd = currentItem
      Add(myCachedItems,newItemToAdd)
      
    if feed.next <> null then
      GetNewItemsFromFeed (feed.next, friendHome, myHome, myCachedItems, groupsIBelongTo)
```
##Make a Post
```
Post (post, myGroups, myHome)
  set myFeed = HttpGet(myHome.feed)
  if IsValidFeed(myFeed) then
    if Size(myFeed) >= MAX_FEED_SIZE then
      set newFeedId = NewFeedId(myHome)
      set myFeed.next = newFeedId
      HttpPut(myHome.feed, myFeed)
      set myHome.feed = newFeedId
      HttpPut(myHome.home, myHome)
      set myFeed = NewFeed()
    if post.sgroup AND myGroups(post.sgroup) <> NULL then
      set postToAdd = Encrypt(post, myGroups(post.sgroup))
    else
      set postToAdd = post
    set postToAdd.id = NextItemId(myFeed)
    set postToAdd.home = myHome.home
    myFeed.items.add(postToAdd)
    HttpPut(myHome.feed, myFeed)
```

##Add a friend to a group
```
AddFriendToGroup(savedFriend, myHome, group, symmetricKey)
  set friendHome = savedFriend.home
  set savedFriend.groups(group) = Encrypt(symmetricKey, friendHome.publicKey)
  HttpPut(myHome.friends + '/' + friendHome.home, savedFriend)
```
