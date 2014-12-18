#Basic Concept
I love social networks, but I hate the people who run them beacause invariably they fuck them up trying to monetize them. I want to host my own network for just me & my friends, free of any corporate bullshit. More in the spirit of usenet, but with more not-text.

So in a rant on the [Rudram Thread](https://www.facebook.com/chris.rudram/posts/10153870108165247), I said: 

>"fuck bookface. we should all go back to blogging with rss feeds in a distributed fashion. I mean seriously, we developed a decentralized, robust network of connected servers AND a really simple syndication format for dissemination of information, only to end up putting all our shit on some corporations server cluster with the faint hope they won't curate my photos of dinner out of your feed."

Easier said than done, but in that spirit (the spirit of put my money where my mouth is) I started this project: a decentralized social network. I'm sure someone has thought of this before, <del>I've yet to find it</del> such as the [W3C](http://www.w3.org/Social/WG). There is still a focus on servers and API, which means my webmaster must grant me the privilege of sharing my feed.

List of friends -> Query friend URL for updates -> Collate locally

I would imagine it like rss feeds but with a focus on short posts and being able to reference other posts. Yes I know trying to compete with RSS/Atom is dumb.

#Encryped for multiple recipients
The basic idea is that everything is encrypted. For space and sanity's sake let's limit friend lists? Something nerdy like 128 or 256?
posts can be:

1. a group of friends
2. specific friends
3. public

An update feed would be able to communicate new posts and their intended recipients. 

Public feeds are seperate as they are not encrypted in any way. If they follow the standard, then they should still be readable by clusterfriend clients.

#General
So a user would make a post targeted for a specific group or specific set of friends.

- in the case of a group: the more common case, since we would most often post to the "all friends" group. The post would be marked with a "for" object that includes a url to a resource containing a list of encrypted session keys. If the client does not find its public key in the session resource, it is not part of the group. Both the session key, its expiry date, and if the user is not part of this group can be cached by the user's client.
- in the case of specific friends: a one-time session key is generated and added to a one-time group (and then all encrypted for each recipient, of course). If the client can't find the user's public key, then the message is not for him and the message is ignored. The one-time group should not be cached, though the fact the message is not for the user can be cached.

Post content has a structured relation part, and an unstructured content part. The relation part refers to other posts and posters and can be totalled/cached locally for meta data. The unstructured part is raw content.

##Shares
A common social network action is sharing another user's post. In the post relationship field, we can add the entire post object in the "shares" property. So, for example the post content of my share could look similar to:
```json
{"relates":[
  {"shares":{
    "url":"http://a.server/~myfriend/postid",
    "poster":"myfriend",
    "public":"Hello all"
  }}
]}
```
This would send the entire content to my friends, but it would break the social contract with the friend I'm sharing (i.e. you're sharing my friends-only post with people who are not my friend). G+ currently allows this, but it warns you what you're doing. In addition, it also allows you to disable re-sharing of a post: something only a centralized system could do. Due to the distrbuted nature of our system here, there's nothing to stop a malicious CF client from sharing things once its decrypted. But I suppose that goes for any cryptogaphy: if you can't trust the person you're sending encrypted things to, then what's the point?
##Likes & Dislikes
The most common, and probably most problamatic part of this system is likes & dislikes. I think we can get away with just including a url to the post for these, because if you can't see the original, then who cares if your friend likes it. The like should be cached, though in case it's just a matter that you haven't checked the feed of the original poster yet.
