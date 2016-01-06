#Clusterfriend
I love social networks, but I hate the people who run them beacause invariably they fuck them up trying to monetize them. I want to host my own network for just me & my friends, free of any corporate bullshit. More in the spirit of usenet, but with more not-text.

So in a rant on the [Rudram Thread](https://www.facebook.com/chris.rudram/posts/10153870108165247), I said:

>"fuck bookface. we should all go back to blogging with rss feeds in a distributed fashion. I mean seriously, we developed a decentralized, robust network of connected servers AND a really simple syndication format for dissemination of information, only to end up putting all our shit on some corporations server cluster with the faint hope they won't curate my photos of dinner out of your feed."

Easier said than done, but in that spirit (the spirit of put my money where my mouth is) I started this project: a decentralized social network. I'm sure someone has thought of this before, <del>I've yet to find it</del> such as the [W3C](http://www.w3.org/Social/WG). There is still a focus on servers and API, which means my webmaster must grant me the privilege of sharing my feed.

#Goals
1. Distributed
3. Private
2. Small updates/low bandwidth
2. No special server

#Distributed
Each user would have a profile resource accessible by http. In other words, a file. This profile should give the following details:
- user name
- location of current feed resource
- location of public key
- other optional fields
```json
{
    "name":"planeguy",
    "feed":"http://cf.delek.org/feeds/2",
    "public-key":"http://cf.delek.org/key",
    "image":"http://cf.delek.org/image.png",
    "location":"canada"
}
```
This object could be saved directly by the app and used for checking feeds/sending items.

#Private
Not everyone wants to send things out into the internet publicly or to all their friends. Users should be able to create private groups or feeds to post amongst only authorized friends.

An encrypted profile file can be the home base of private feeds:
```json
{
    "keys":"http://cf.delek.org/keys/7f043796980974bcb3cc",
    "profile":"ENCRYPTED PROFILE DATA"
}
```
The profile property contains what would be in the basic profile file, plus some group-specific optional properties, such as group name and a link to the user's public profile. The group profile is encrypted with a symmetric key distributed to group members in the keys file:
```json
{
    "http://cf.chancedixon.com/profile":"ENCRYPTED KEY OBJECT",
    "http://clusterfriend.com/pixelant3/profile":"ENCRYPTED KEY OBJECT"
}
    
```
The property name is the profile url of a member user. The encrypted key object includes a key property and a random salt to prevent a malicious group member from using a known contents to somehow figure out the keys of other users.

If someone would like to be fully private, he can not post a public profile and only distribute the encrypted one.   
 
#Small updates/low bandwith
Bandwidth use must be minimized to make it feasable. Feed items must be small, but still useful.
```json
{
    "url":"http://cf.delek.org/feeds/1#1",
    "date":"20150101",
    "text":"Hello guys!",
    "link":"http://www.clickhole.com"
}
```
```json
{
    "url":"http://cf.delek.org/feeds/1#2",
    "date":"20150101",
    "re":"http://cf.chancedixon.com/feeds/1#5",
    "feeling":"like"
}
```
```json
{
    "url":"http://cf.delek.org/feeds/1#3",
    "date":"20150101",
    "re":"http://clusterfriend.com/pixelant3/feeds/2#7",
    "text":"i can't even",
    "image":"http://www.clickhole.com/images/dog-hates-kenzian-econom.png"
}
```
Anything longer than this last one should be disallowed, but I don't know how to prevent it before it gets published. Longer posts can be split into an externally linked article.
```json
{
    "url":"http://cf.delek.org/feeds/1#4",
    "date":"20150101",
    "text":"Today's rant 2015-01-01",
    "link":"http://cf.delek.org/content/kale-the-new-flesh.html"
}
```
Feeds themselves must be paged or we risk downloading a users entire post history every time they update.
```json
{
    "items":[
        {
            "url":"http://cf.delek.org/feeds/2#17",
            "date":"20150101",
            "re":"http://cf.chancedixon.com/feeds/1#5",
            "feeling":"like"
        }
    ],
    "next": "http://cf.delek.org/feeds/3",
    "prev": "http://cf.delek.org/feeds/1"
}
```
#No special server
If we want to do this without a special server, everything must be able to function using basic http/ftp on basic web hosting. This is mostly possible thanks to RESTful services being written to resemble basic http. For posting, an app may require ftp access and credentials to write files. Any server software API must account for things that basic file http does not usually use, like query parameters.
```
http://cf.delek.org
    /profile
    /feeds
        /1
        /2
        /3
    /keys
        /friends
        /enemies
        /breakfast-club
        /7f043796980974bcb3cc 
    /content
        /kale-the-new-flesh.html
        /dogs-playing-tigris-and-euphrates.png
```
