#Clusterfriend
I love social networks, but I hate the people who run them beacause invariably they fuck them up trying to monetize them. I want to host my own network for just me & my friends, free of any corporate bullshit. More in the spirit of usenet, but with more not-text.

So in a rant on the [Rudram Thread](https://www.facebook.com/chris.rudram/posts/10153870108165247), I said:

>"fuck bookface. we should all go back to blogging with rss feeds in a distributed fashion. I mean seriously, we developed a decentralized, robust network of connected servers AND a really simple syndication format for dissemination of information, only to end up putting all our shit on some corporations server cluster with the faint hope they won't curate my photos of dinner out of your feed."

Easier said than done, but in that spirit (the spirit of put my money where my mouth is) I started this project: a decentralized social network. I'm sure someone has thought of this before, <del>I've yet to find it</del> such as the [W3C](http://www.w3.org/Social/WG). There is still a focus on servers and API, which means my webmaster must grant me the privilege of sharing my feed.

#Goals
1. Distributed
2. Small updates/low bandwidth
3. Encrypted
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
    "key":"http://cf.delek.org/key",
    "image":"http://cf.delek.org/image.png",
    "location":"canada"
}
```
This object could be saved directly by the app and used for checking feeds/sending items

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
Anything longer than the third one should be disallowed, but I don't know how to prevent it before it gets published. Longer posts can be split into an externally linked article.
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
#Encrypted
Feeds should be encrypted to provide privacy. Users should be able to share only to a particular group or user(s).

To do this, use a simple form of broadcast encryption, encrypting using a symmetric key, and encrypting that using each user's asymmetric key.
```json
{
    "url":"http://cf.delek.org/feeds/1#5",
    "date":"20150101",
    "encrypted":{"group":"http://cf.delek.org/groups/friends","data":"ENCRYPTED DATA"}
}
```
where the group is an id for a group the data is targeted for. For each user in a group, the poster maintains a file for that user that contains the symmetric key(s) for groups. 
```json
{
    "http://cf.delek.org/groups/friends":"SYMMETRIC KEY",
    "salt-RANDOM STRING-salt": "DIFFERNT RANDOM STRING"
}
```
...this file is encrypted using a user's public key so it is accessable only to him. all the files for each friend must be refreshed when a person is added or removed for a group.

A "keys" property in the profile points users where to find a list of key files:
```json
{
    "keys":{
        "http://cf.chancedixon.com/profile":"http://cf.delek.org/keys/chance",
        "http://clusterfriend.com/pixelant3/profile":"http://cf.delek.org/keys/audrey"
    }
} 

#No special server
If we want to do this without a special server, everything must be able to function using basic http/ftp on basic web hosting. This is mostly possible thanks to RESTful services being written to resemble basic http. Any server software API must account for things that basic file http does not usually use, like query parameters. Luckily a good RESTful service should operate using resources just fine.
```
http://cf.delek.org
    /profile
    /feeds
        /1
        /2
        /3
    /groups
        /friends
        /enemies
        /breakfast-club
        /7f043796980974bcb3cc 
    /content
        /kale-the-new-flesh.html
        /dogs-playing-tigris-and-euphrates.png
```
