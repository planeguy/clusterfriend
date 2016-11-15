# Feed
## title
## description
## image
## home
*optional*

points to the home channel that is the start of this feed chain. it may point to this feed (itself) or be null to signify that *this* is the home channel. It is expected that the home feed does not have items.

## keys
*optional*

array of keys for encrypted items

```
"keys": {
    "fingerprint":{
        "group":"key",
        "group":"key",
        "group":"key"
    },
    "fingerprint":{
        "group":"key",
        "group":"key",
        "group":"key"
    }
}
```

- **fingerprint**: fingerprint of a friend's public key
- **group**: group id for private groups
- **key**: encrypted version of a synchronous key for *group*

## prev

points to the previous archived channel for paging. if null or missing, this is the last feed in the feed chain

# Item level elements

## guid

unique id for this item, usually the url to it. ex: *http://myfeed.net/feeds/1/6*

## text

text content you want to post

## enclosure
a thing on the internet in the same vein as rss enclosure
```
{
    "enclosure":{
        "url":"thing url",
        "type":"image/jpeg",
        "length":12
    }
}
```
- **url**: url of the enclosure
- **type**: MIME type of the thing
- **length**: size of the thing. if missing or 0, we can still download, but a client can decide (don't download in case of limited data, for example) 

## about

link to a cf post that is what this post is about

## re

link to a cf post that this is a reply to. by convention, if *about* is omitted, *about*=*re*.

## feels

a token that describes the poster's feeling about the referenced post

## encrypted

an item encrypted using a channel group's symmetric key.
```
{
    "guid":"http://myfeed.net/feeds/1/6",
    "encrypted":{
        "group":"123456789abcdef",
        "content":"encryptedgobbledygook"
    }
}
```

 - **group**: the group id the item is targeting. friends who have been given a symmetric key for this group will be able to decrypt it.
 - **content**: the encrypted item
