#Clusterfriend
I love social networks, but I hate the people who run them beacause invariably they fuck them up trying to monetize them. I want to host my own network for just me & my friends, free of any corporate bullshit. More in the spirit of usenet, but with more not-text.

So in a rant on the [Rudram Thread](https://www.facebook.com/chris.rudram/posts/10153870108165247), I said:

>"fuck bookface. we should all go back to blogging with rss feeds in a distributed fashion. I mean seriously, we developed a decentralized, robust network of connected servers AND a really simple syndication format for dissemination of information, only to end up putting all our shit on some corporations server cluster with the faint hope they won't curate my photos of dinner out of your feed."

Easier said than done, but in that spirit (the spirit of put my money where my mouth is) I started this project: a decentralized social network. I'm sure someone has thought of this before, <del>I've yet to find it</del> such as the [W3C](http://www.w3.org/Social/WG). There is still a focus on servers and API, which means my webmaster must grant me the privilege of sharing my feed.

#Goals
1. Distributed
3. Private
2. No special server

#Distributed
Each user would have a profile resource accessible by http. In other words, a file. The file should have some info about the user and a list of the last X feed files. This coincidentally looks a lot like an RSS2 feed.

We can use the standard RSS2 fields for most things, though we can add fields for extra CF functions (see later).

```xml
<rss>
    <channel>
        <item>
            <description>paged channel</description>
            <pubDate>July 1 2016</pubDate>
            <link>https://cf.delek.org/channels/7f043796980974bcb3c2</link>
        </item>
    </channel>
 </rss>
 ```
#Private
Not everyone wants to send things out into the internet publicly or to all their friends. Users should be able to create private groups or feeds to post amongst only authorized friends.

We can add a property to the main profile channel that indicates an encryption scheme:

```xml
<rss>
    <cf:encrypted>http://cf.delek.org/keys/7f043796980974bcb3cc</cf:encrypted>
```

The encrypted field includes a link to a keys file. A symmetric key distributed to group members by that file:
```xml
<cf:keys>
    <cf:key fingerprint="PUBLIC KEY FINGERPRINT">ENCRYPTED KEY OBJECT</cf:key>
    <cf:key fingerprint="PUBLIC KEY FINGERPRINT">ENCRYPTED KEY OBJECT</cf:key>
    <cf:key fingerprint="PUBLIC KEY FINGERPRINT">ENCRYPTED KEY OBJECT</cf:key>
</cf:keys>
    
```

Channel items themselves are encrypted.
```xml
<item>
    <cf:encrypted-item>
        ENCRYPTED ITEM 
    </cf:encrypted-item>
</item>
```

If someone would like to be fully private, he can not post a public profile and only distribute the encrypted one.   
 

#No special server
If we want to do this without a special server, everything must be able to function using basic http/ftp on basic web hosting. This is mostly possible thanks to RESTful services being written to resemble basic http. For posting, an app may require ftp access and credentials to write files. Any server software API must account for things that basic file http does not usually use, like query parameters. There is one matter of CORS access for webpages accessing the file through AJAX.
