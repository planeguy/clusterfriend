#Basic Concept
I love social networks, but I hate the people who run them beacause invariably they fuck them up trying to monetize them. I want to host my own network for just me & my friends, free of any corporate bullshit. More in the spirit of usenet, but with more not-text.

So in a rant on the Rudram Thread, I said: 

"fuck bookface. we should all go back to blogging with rss feeds in a distributed fashion. I mean seriously, we developed a decentralized, robust network of connected servers AND a really simple syndication format for dissemination of information, only to end up putting all our shit on some corporations server cluster with the faint hope they won't curate my photos of dinner out of your feed."

Easier said than done, but in that spirit started this project: the decentralized social network.

List of friends -> Query friend URL for updates -> Collate locally

I would imagine it like rss feeds (remember those?) but with a focus on short posts and beinag able to reference other posts. Yes I know trying to compete with RSS/Atom is dumb.

##Encryped for multiple recipients
The basic idea is that everything is encrypted. For space and sanity's sake let's limit friend lists? Something nerdy like 128 or 256?
posts can be:

1. all friends
2. specific friends
3. public

An update feed would be able to communicate new posts and their intended recipients (or "all friends"). 

Public feeds are seperate as they are not encrypted in any way. If they follow the standard, then they should still be readable by clusterfriend clients.
###A little more techincal
After some experimentation, I think it would be totally feasible to just use OpenPGP (minus keyrings & trusted verifiers) to encrypt a public feed resource, and additionally any private posts within. 
```
GET http://cf.delek.org/
```
returns
```JSON
{
	"name":"planeguy",
	"user":"http://cf.delek.org/",
	"feed":"http://cf.delek.org/feed",
	"public-key":"PUBLIC-KEY"
}
```
then 
```
GET http://cf.delek.org/feed
```
returns
```
"OPENPGP-ENCRYPED-FEED"
```
which decypts to something like
```JSON
[
	{
		"date":"03-11-2015T14:00:00.0Z",
		"user":"http://cf.delek.org/planeguy",
		"post":{
			"url":"http://cf.delek.org/planeguy/posts/1",
			"relates":{
				"replies-to":"http://cf.delek.org/chanceula/posts/1",
				"tags":"http://cf.delek.org/chanceula",
				"shares":"http://cf.delek.org/pixelante/posts/2"
			}
		}
	},
...
]
```
If something in the feed is not meant for all friends, it is encrypted before adding it to the feed, so you get:
```JSON
	{
		"for":["chanceula", "pixelante"]
		"date":"03-11-2015T14:00:00.0Z",
		"user":"http://cf.delek.org/planeguy",
		"post":{
			"private":"ENCRYPTED-POST-WITH-ONLY-SESSION-KEYS-FOR-CHANCEULA-AND-PIXELANTE"
			}
		}
	}
```
At the post itself, the format is similar, but with actual content. It is encrypted at the permalink.
```JSON
{
	"date":"03-11-2015T14:00:00.0Z",
	"user":"http://cf.delek.org/planeguy",
	"post":{
		"url":"http://cf.delek.org/planeguy/posts/1",
		"relates":{
			"replies-to":"http://cf.delek.org/chanceula/posts/1",
			"tags":"http://cf.delek.org/chanceula",
			"shares":"http://cf.delek.org/pixelante/posts/2"
		},
		"content":"STUFF"
	}
}
```
##Not-encryption techinical
###Polling for updates
When polling for updates, the client app should send a either an If-None-Match or If-Modified-Since header. This way only actual updates are sent back to the client, the rest of servers throwing a 304. Conversely, the server needs to support these methods as well.