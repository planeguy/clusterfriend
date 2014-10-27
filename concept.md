#Basic Concept
I love social networks, but I hate the people who run them beacause invariably they fuck them up trying to monetize them. I want to host my own network for just me & my friends, free of any corporate bullshit. More in the spirit of usenet, but with more not-text.

So in a rant on the Rudram Thread, I said: 


In that spirit I offer this alternative: the decentralized social network.
List of friends -> Query friend URL for updates -> Collate locally

##Encryped for multiple recipients
The basic idea is that everything is encrypted. For space and sanity's sake let's limit friend lists? Something nerdy like 128 to 256?
posts can be:

1. all friends
2. specific friends

An update feed would be able to communicate new posts and their intended recipients (or "all friends"). 
###OpenPGP
OpenPGP enables a way to encrypt something for multiple recipients, but does not readily facilitate a post-by-post basis where the friends-only posts can be tied to the same symmetric key by default, while other posts use more PGP-like session keys. One way around this may be to encrypt each update feed with a session key for all friends and any "non-all-friends" posts would be encrypted again. The problem with this is the need to download all session keys for all friends before even being able to start decrypting it (and if you're unpopular, you may not even have any content). OpenPGP also implements ID authentication which may slow down/ is not completely necessary (maybe, i dunno).
###Custom A
It may be a good to implement a simplified version of OpenPGP that allows for separtion of these resources. For example, the current feed would be encrypted with a single session key, then each user would have his session key available in a seperate file/server call...
```
GET http://pg.delek.org/feed
```
returns
```JSON
{"@id":65,"@type":"feed","feed":"ENCRYPTED-FEED"}
```
then 
```
GET http://pg.delek.org/sessions/65/pixelante
```
returns
```
"ENCRYPED-SESSION-KEY-FOR-FEED-65-FOR-PIXELANTE"
```

If something in the feed is not meant for all friends, it is encrypted in a more traditional way of prefixing with the session keys for recipients.
```JSON
[
  {
    "url":"http://pg.delek.org/posts/123",
    "relationships":{
      "in-reply-to":"http://z-star.cfhost.org/posts/98"
    }
  },
  {
    "recipients":{
      "chanceula":"ENCRYPTED-SESSION-KEY",
      "pixelante":"ENCRYPTED-SESSION-KEY"
    },
    "post":"ENCRYPTED-POST-UPDATE"
  }
]
```
###Custom B
This is a similar idea as custom a, but takes it in the other direction. each friend gets a custom update feed and a session key. This method may actually be usable with OpenPGP as the feed is isolated from everyone else...
```
GET http://pg.delek.org/feeds/pixelante
```
returns
```JSON
{
  "@id":65,
  "@type":"feed",
  "for":{"pixelante":"ENCRYPTED-SESSION-KEY"},
  "feed":"ENCRYPTED-FEED",
  "post-session":"SESSION-KEY-FOR-POSTS"
}
```
There's a lot of duplication if someone posts to everyone more than selected individuals. It could be possible that both formats could be supported:
```
GET http://pg.delek.org/feed
```
```JSON
{
  "@id":65,
  "@type":"feed",
  "format":"combined",
  "feed":"ENCRYPTED-FEED"
}
```
OR
```JSON
{
  "@id":65,
  "@type":"feed",
  "format":"individual",
  "recipients":{
    "chanceula": "http://pg.delek.org/feeds/chanceula",
    "pixelante": "http://pg.delek.org/feeds/pixelante"
  }
}
```
