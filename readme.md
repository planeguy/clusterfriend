# Clusterfriend
I love social networks, but I hate the people who run them beacause invariably they fuck them up trying to monetize them. I want to host my own network for just me & my friends, free of any corporate bullshit. More in the spirit of usenet, but with more not-text.

So in a rant on the [Rudram Thread](https://www.facebook.com/chris.rudram/posts/10153870108165247), I said:

>"fuck bookface. we should all go back to blogging with rss feeds in a distributed fashion. I mean seriously, we developed a decentralized, robust network of connected servers AND a really simple syndication format for dissemination of information, only to end up putting all our shit on some corporations server cluster with the faint hope they won't curate my photos of dinner out of your feed."

Easier said than done, but in that spirit (the spirit of put my money where my mouth is) I started this project: a decentralized social network. I'm sure someone has thought of this before, <del>I've yet to find it</del> such as the [W3C](http://www.w3.org/Social/WG). There is still a focus on servers and API, which means my webmaster must grant me the privilege of sharing my feed.

# Goals
1. Distributed
3. Private
2. No special server
4. Connected

# Distributed
Each user would have at least one feed object that describes the feed and has a list of items. It would also point people to the next feed file sequentially (though it is assumed items are in descending order of datetime). These objects would be accessible by http - in other words a simple file.

In the past, I've compared it to an rss2 feed file and made Clusterfriend an add-on to rss2, but there's so much more in rss2 than we need, so let's go *deeper* and make this more abstract. Let's use json for now since it's much more become the interchange format of the web, but it should be possible to have an xml schema that defined Clusterfriend to use xml as well. 


```json
{
    "name":"Delek Turner",
    "guid":"http://cf.delek.org/feeds/1",
    "is-home":false,
    "items": [
        {
            "guid":"http://cf.delek.org/feeds/1/1",
            "published":"12 Jul 2016",
            "description":"Hello",
        }
    ]
}
 ```
# Private
Not everyone wants to send things out into the internet publicly or to all their friends. Users should be able to create private groups or feeds to post amongst only authorized friends.

We can add an encryption key to a channel. It's a synchronous key encrypted using a friend's public key. Groups allow us to target different people.
```json
[
    {
        "fingerprint":"public key fingerprint",
        "group":"1",
        "key":"encrypted synchronous key"
    },
    {
        "fingerprint":"public key fingerprint",
        "group":"1",
        "key":"encrypted synchronous key"
    },
    {
        "fingerprint":"public key fingerprint",
        "group":"2",
        "key":"encrypted synchronous key"
    }
]
    
```

Items in the channel are then encrypted 
```json
{
    "description":"Encrypted Item",
    "encrypted": {
        "group":"2",
        "content":"stuff"
    }
}
```

# No special server
If we want to do this without a special server, everything must be able to function using basic http/ftp on basic web hosting. This is mostly possible thanks to RESTful services being written to resemble basic http. For posting, an app may require ftp access and credentials to write files. Any server software API must account for things that basic file http does not usually use, like query parameters. There is one matter of CORS access for webpages accessing the file through AJAX, but we'll cross that bridge when we get to it.

# Connected
The difference between a basic blog and a social network is the interconnectedness of posts. We can add this connectednes simply by enabling a link to another item.
```json
{
    "re":"https://cf.delek.org/channels/7f043796980974bcb3c2/4",
    "about":"https://cf.inter.net/users/pixelante/channels/1/5",
    "feels":"like"
}
```
You could argue that this is the same as the rss *link* tag, but using custom elements allow us to add context to the link's appearance:
  - if the *re* link is one of my own posts, show it as a reply to that post.
  - we can also do the above recursively to show a line of conversation.
  - *about* can be added to show the original reason a line of conversation startedin case a line of conservation is interrupted by a user you don't have access to
  - if the post is in reply something I'm not involved in and don't care about, I can filter out those posts based on the *re* & *about* tags
  - a proper reshare can be identified as a post with *about* and rss *link* to the same content
