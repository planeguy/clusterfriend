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
Each user would have at least one feed object that describes the feed and has a list of items. These objects would be accessible by http - in other words a simple file.

In the past, I've compared it to an rss2 feed file and made Clusterfriend an add-on to rss2, but there's so much more in rss2 than we need, so let's go *deeper* and make this more abstract. Let's use json for now since it's much more become the interchange format of the web, but it should be possible to have an xml schema that defined Clusterfriend to use xml as well. 


```json
{
    "name":"Delek Turner",
    "id":"http://cf.delek.org/feeds/home",
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

Encryption should be done on a feed-by-feed basis. This allows 2 main ways to secure a feed:
1. **Server-side security**: you can secure the feed file in any way you wish and that your host supports
2. **Synchronous key encryption**: you can encrypt a file using a synchronous key, and distribute the synchronous key to your followers via a secure mechanism

# No special server
If we want to do this without a special server, everything must be able to function using basic http/ftp on basic web hosting. This is mostly possible thanks to RESTful services being written to resemble basic http. For posting, an app may require ftp access and credentials to write files. Any server software API must account for things that basic file http does not usually use, like query parameters. There is one matter of CORS access for webpages accessing the file through AJAX, but we'll cross that bridge when we get to it.

# Connected
The difference between a basic blog and a social network is the interconnectedness of posts. We can add this connectedness simply by enabling a link to another item with a relation.
```json
{
    "reply":"https://cf.delek.org/channels/7f043796980974bcb3c2/4",
    "about":"https://cf.inter.net/users/pixelante/channels/1/5",
    "feels":"like"
}
```
- the *re* link is a post, so show it as a reply to that post.
- we can also do the above recursively to show a line of conversation.
- *about* can be added to show the original reason a line of conversation started in case a line of conservation is interrupted by a user you don't have access to
- if the post is in reply something I'm not involved in and don't care about, I can filter out those posts based on the *re* & *about* tags

#Other Stuff
##File size: Paged and Ephemeral
Feed file sizes should be kept small, so a paging mechanism could be used. Another way to reduce file size is to remove old items that are expired. I prefer the second way because it's a more fun social networking thing.