#Algorithms

##Add or get updated friend
```
function UpdateFriend(friendHomeHref, myFriends)
  set friendHome = HttpGet(homeHref)
  if IsValidHome(friendHome) then
    set myFriends(friendHomeHref) = friendHome
    return friendHome
```

##Update Groups From Friend
```
function UpdateGroupsFromFriend (friendHomeHref, friendFriendsHref, myHomeHref, groupsIBelongTo)
  set groupsHref = friendFriendsHref + '/' + myHomeHref
  set groups = HttpGet(groupsHref)
  if IsValidGroupFile(groups) then
     set groupsIBelongTo(friendHomeHref) = groups
     return groupsIBelongTo
```

##Get New Items From Feed
```
function GetNewItemsFromFeed (friendHomeHref, friendFeedHref, friendFriendsHref, myHomeHref, myCachedItems, groupsIBelongTo)
  set feed = HttpGet(friendFeedHref)
  if IsValidFeed(feed) then
    set feedItems = feed.items
    set currentItem = feedItems[0]
    while (not Contains(currentItem, myCachedItems))
      if currentItem.sdata <> null and currentItem.sgroup <> null and groupsIBelongTo(friendHomeHref)(currentItem.sgroup) <> null then
        set newItemToAdd = Decrypt(currentItem.sdata, groupsIBelongTo(friendHomeHref)(currentItem.sgroup))
      else
        set newItemToAdd = currentItem
      Add(myCachedItems,newItemToAdd)
      
    if feed.old = true then
      set newFriendHome = UpdateFriend(friendHomeHref)
      set newGroupsIBelongTo = UpdateGroupsFromFriend(friendHomeHref, friendFriendsHref, myHomeHref, groupsIBelongTo)
      if newFriendHome.feed <> friendFeedHref then
        GetNewItemsFromFeed (friendHomeHref, newFriendHome.feed, newFriendHome.friends, myHomeHref, myCachedItems, newGroupsIBelongTo)
```
##Make a Post
```
function Post (post, myGroups, myFeedHref, myHomeHref)
  set myFeed = HttpGet(myFeedHref)
  if IsValidFeed(myFeed) then
    if PostCount(myFeed) >= MAX_FEED_COUNT then
      set myFeed.old = true
      HttpPut(myFeedHref, myFeed)
      set myFeedHref = NextFeedHref(myFeedHref)
      set myHome = HttpGet(myHomeHref)
      set myHome.feed = myFeedHref
      HttpPut(myHomeHref, myHome)
      set myFeed = NewFeed() 
    if post.sgroup AND myGroups(post.sgroup) <> NULL then
      set postToAdd = Encrypt(post, myGroups(post.sgroup))
    else
      set postToAdd = post
    set postToAdd.id = NextItemId(myFeed)
    set postToAdd.feed = myFeedHref
    set postToAdd.home = myHomeHref
    myFeed.items.add(postToAdd)
    HttpPut(myFeedHref, myFeed)
    