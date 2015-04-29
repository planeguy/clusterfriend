#Basic Concept
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
- location of feed resource
- public key
- other optional fields
```json
{
    "name":"planeguy",
    "feed":"http://cf.delek.org/feed",
    "key":"-----BEGIN PGP PUBLIC KEY BLOCK-----
    Version: BCPG C# v1.6.1.0
    mQENBFTBPuoBCACWdy5tVvxM+inOiW5xfebIklAR/Ow281317pu98iKRcanw9kNu
    xtpUp9q/U3uYt9y2aO1mgfn38Vk3knzheE9h3u38Az6DsAMfSOb+SOk7truC/vMG
    +R6P4gMLGIwT3DyzHUP4W3xtPhWBa2Ec//f/OrpnpySQ7N9LWhwFeTkglRNq45CB
    0AehKsVuBG2fgLQlckELl733LoUwreVNlW2TeaPVuVYOXw9W/+gKaFSS7D+Zucuq
    7m+CyxGJgv4Z94Mv7Yh6huGNt3jcaKfzkbdp3yudmvuJWs6dhXkSCOwuMc2z691l
    ZbyczaecVi3zDcK/fJ7hWrJUYwHw89WNQkJlABEBAAG0AIkBHAQQAQIABgUCVME+
    6gAKCRDpUW+N+1xMw9CfB/96F0JyEROO419ITiCx2EAO0clQ0Rxwz/lfnWxj+Sxi
    lQYETq8b3EsSRY2SxSe9x8scIamT6qh3C2bNKWlp/2LFyFW3pbn9RsoyAlipjnCR
    0WtNomd6yOTbz+Mi97n7lOJQf6Ur8jviAB/tP/gpPwf3k2/mhbDvrkTEmVTipCBC
    /0LWyw2wQVCjlKmQrhx430BBJ6W8E+I0TkN7dHjmohEAv80+9D6UB/Oi7Q60mzr7
    9aO9lVcEZRsalEQIEu8m5dJhSVertvajHzC/uYW7iEnDnmX3Gs3rhBkuGyR5Yp1d
    h+vQHCxq5K4dg9DBbx+GSKbOAX18ngQZPrhbAhfSX05J
    =d8PR
    -----END PGP PUBLIC KEY BLOCK-----",
    "image":"http://cf.delek.org/image.png",
    "location":"canada"
}
```
This object could be saved directly by the app and used for checking feeds/sending items

#Small updates/low bandwith
Bandwidth use must be minimized to make it feasable. Feed items must be small, but still useful.
```json
{
    "id":"http://cf.delek.org/feed#1",
    "date":"20150101",
    "text":"Hello guys!",
    "link":"http://www.clickhole.com"
}
```
```json
{
    "id":"http://cf.delek.org/feed#2",
    "date":"20150101",
    "like":"http://cf.chancedixon.com/feed#5"
}
```
```json
{
    "id":"http://cf.delek.org/feed#3",
    "date":"20150101",
    "reply":"http://clusterfriend.com/pixelant3/feed#7",
    "text":"i can't even",
    "image":"http://www.clickhole.com/images/dog-hates-kenzian-econom.png"
}
```
Anything longer than the third one should be disallowed, but I don't know how to prevent it before it gets published. Longer posts can be split into an article, linked externally.
```json
{
    "id":"http://cf.delek.org/feed#4",
    "date":"20150101",
    "text":"Today's rant 2015-01-01",
    "article":"http://cf.delek.org/articles/1"
}
```
Feeds themselves must be paged or we risk downloading a users entire post history every time they update.
```json
{
    "previous":"http://cf.delek.org/archived/9",
    "items":[
        {
            "id":"http://cf.delek.org/feed#2",
            "date":"20150101",
            "like":"http://cf.chancedixon.com/feed#5"
        }
    ]
}
```
#Encrypted
Feeds should be encrypted to provide privacy. Users should be able to share only to a particular group or user(s).

To do this, encrypt using a symmetric key, and encrypt that using each user's asymmetric key.
```json
{
    "id":"http://cf.delek.org/feed#5",
    "secret":{
        "group":"http://cf.delek.org/groups/friends",
        "data":""
    }
}
```
where the group is the id of a set of users who can decrypt the common symmetric key. A user would get their general and group keys from a file named for their public key fingerprint
```
Contents of http://cf.delek.org/friends/bd72de858fd6eeae2b022fdacd68a73a67902918
{
    "http://cf.delek.org/groups/friends":"-----BEGIN PGP PUBLIC KEY BLOCK-----
    Version: BCPG C# v1.6.1.0
    mQENBFTBPuoBCACWdy5tVvxM+inOiW5xfebIklAR/Ow281317pu98iKRcanw9kNu
    xtpUp9q/U3uYt9y2aO1mgfn38Vk3knzheE9h3u38Az6DsAMfSOb+SOk7truC/vMG
    +R6P4gMLGIwT3DyzHUP4W3xtPhWBa2Ec//f/OrpnpySQ7N9LWhwFeTkglRNq45CB
    0AehKsVuBG2fgLQlckELl733LoUwreVNlW2TeaPVuVYOXw9W/+gKaFSS7D+Zucuq
    7m+CyxGJgv4Z94Mv7Yh6huGNt3jcaKfzkbdp3yudmvuJWs6dhXkSCOwuMc2z691l
    ZbyczaecVi3zDcK/fJ7hWrJUYwHw89WNQkJlABEBAAG0AIkBHAQQAQIABgUCVME+
    6gAKCRDpUW+N+1xMw9CfB/96F0JyEROO419ITiCx2EAO0clQ0Rxwz/lfnWxj+Sxi
    lQYETq8b3EsSRY2SxSe9x8scIamT6qh3C2bNKWlp/2LFyFW3pbn9RsoyAlipjnCR
    0WtNomd6yOTbz+Mi97n7lOJQf6Ur8jviAB/tP/gpPwf3k2/mhbDvrkTEmVTipCBC
    /0LWyw2wQVCjlKmQrhx430BBJ6W8E+I0TkN7dHjmohEAv80+9D6UB/Oi7Q60mzr7
    9aO9lVcEZRsalEQIEu8m5dJhSVertvajHzC/uYW7iEnDnmX3Gs3rhBkuGyR5Yp1d
    h+vQHCxq5K4dg9DBbx+GSKbOAX18ngQZPrhbAhfSX05J
    =d8PR
    -----END PGP PUBLIC KEY BLOCK-----",
    "http://cf.delek.org/groups/emu-club":"-----BEGIN PGP PUBLIC KEY BLOCK-----
    Version: BCPG C# v1.6.1.0
    mQENBFTBPuoBCACWdy5tVvxM+inOiW5xfebIklAR/Ow281317pu98iKRcanw9kNu
    xtpUp9q/U3uYt9y2aO1mgfn38Vk3knzheE9h3u38Az6DsAMfSOb+SOk7truC/vMG
    +R6P4gMLGIwT3DyzHUP4W3xtPhWBa2Ec//f/OrpnpySQ7N9LWhwFeTkglRNq45CB
    0AehKsVuBG2fgLQlckELl733LoUwreVNlW2TeaPVuVYOXw9W/+gKaFSS7D+Zucuq
    7m+CyxGJgv4Z94Mv7Yh6huGNt3jcaKfzkbdp3yudmvuJWs6dhXkSCOwuMc2z691l
    ZbyczaecVi3zDcK/fJ7hWrJUYwHw89WNQkJlABEBAAG0AIkBHAQQAQIABgUCVME+
    6gAKCRDpUW+N+1xMw9CfB/96F0JyEROO419ITiCx2EAO0clQ0Rxwz/lfnWxj+Sxi
    lQYETq8b3EsSRY2SxSe9x8scIamT6qh3C2bNKWlp/2LFyFW3pbn9RsoyAlipjnCR
    0WtNomd6yOTbz+Mi97n7lOJQf6Ur8jviAB/tP/gpPwf3k2/mhbDvrkTEmVTipCBC
    /0LWyw2wQVCjlKmQrhx430BBJ6W8E+I0TkN7dHjmohEAv80+9D6UB/Oi7Q60mzr7
    9aO9lVcEZRsalEQIEu8m5dJhSVertvajHzC/uYW7iEnDnmX3Gs3rhBkuGyR5Yp1d
    h+vQHCxq5K4dg9DBbx+GSKbOAX18ngQZPrhbAhfSX05J
    =d8PR
    -----END PGP PUBLIC KEY BLOCK-----"
}
```
Items could be targeted to a user directly by directly encrypting the item with their PK, but at that point, you're talking about a chat service.

#No special server
If we want to do this without a special server, everything must be able to function using basic http/ftp on basic web hosting. This is mostly possible thanks to RESTful services being written to resemble basic http. Our API must take into account what we don't get with the most basic http, including query parameters. Luckily a good RESTful service should operate using resources just fine.
```
http://cf.delek.org
    /profile (profile file)
    /feed (main feed file)
    /friends
        /bd72de858fd6eeae2b022fdacd68a73a67902918 (user keys file)
        /bd72de858fd6eeae2b022fdacd68a73a67902919 (user keys file)
    /archives
        /1 (feed file)
        /2 (feed file)
    /articles
        /1 (article file)
    /images
        /dogs-playing-colt-express.png
```
