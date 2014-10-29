#Basic Concept
I love social networks, but I hate the people who run them beacause invariably they fuck them up trying to monetize them. I want to host my own network for just me & my friends, free of any corporate bullshit. More in the spirit of usenet, but with more not-text.

So in a rant on the Rudram Thread, I said: 


In that spirit I offer this alternative: the decentralized social network.
List of friends -> Query friend URL for updates -> Collate locally

##Encryped for multiple recipients
The basic idea is that everything is encrypted. For space and sanity's sake let's limit friend lists? Something nerdy like 128 or 256?
posts can be:

1. all friends
2. specific friends

An update feed would be able to communicate new posts and their intended recipients (or "all friends"). 
###A little more techincal
I was thinking of implementing a simplified version of OpenPGP that allows for separtion of the key/user resources. For example, the current feed would be encrypted with a single session key, then each user would have his session key available in a seperate file/server call...
```
GET http://pg.delek.org/feed
```
returns
```JSON
{
	"@id":65,
	"@type":"feed",
	"session":65,
	"style":"combined",
	"feed":"ENCRYPTED-FEED"
}
```
then 
```
GET http://pg.delek.org/sessions/65/pixelante
```
returns
```
"ENCRYPED-SESSION-KEY-FOR-FEED-65-FOR-PIXELANTE"
```

If something in the feed is not meant for all friends, it is encrypted again in a more traditional way of prefixing with the session keys for recipients.
```JSON
  {
    "for":{
      "chanceula":"ENCRYPTED-SESSION-KEY",
      "pixelante":"ENCRYPTED-SESSION-KEY"
    },
    "date":""
    "url":"http://pg.delek.org/posts/123",
	"content":"ENCYPTED-CONTENT",
	"relationships":"ENCRYPTED-RELATIONSHIPS"
  }
```

##Not-encryption techinical
###Polling for updates
When polling for updates, the client app should send a either an If-None-Match or If-Modified-Since header. This way only actual updates are sent back to the client, the rest of servers throwing a 304. Conversely, the server needs to support these methods as well.