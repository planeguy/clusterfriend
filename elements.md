# Feed
## Required
### name
### description
### url
### published
### items-management

```
"items-management": {
    "ephemeral": {
        "ttl":"2 weeks"
    }
}
```
Items can be managed in different ways depending on the items-management setting. See more below.

## Optional
### image
### keys

```
"keys":"http://cf.delek.org/keys"
```

link to a keys file full of keys for private encrypted items

```
{
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

# Item
## Required
### url

```
"url":"http://myfeed.net/feeds/1#1"
```

## Optional
### text

text content you want to post

### enclosure
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

### about

link to a cf item that is what this item is about

### re

link to a cf item that this is a reply to. by convention, if *about* is omitted, *about*=*re*.

### feels

a token that describes the poster's feeling about the referenced item

### encrypted

an item encrypted using a channel group's symmetric key.
```
{
    "url":"http://myfeed.net/feeds/1/6",
    "encrypted":{
        "group":"123456789abcdef",
        "content":"encryptedgobbledygook"
    }
}
```

 - **group**: the group id the item is targeting. friends who have been given a symmetric key for this group will be able to decrypt it.
 - **content**: the encrypted item. the decrypted content of this what this item would look like were it not encrypted.

### ephemeral-expiry

```
"ephemeral-expiry":"2016-08-19 00:00:00"
```
Ephemeral items should removed from a feed file on the next modification if the modification datetime > ephemeral-expiry 

#Item management
## Ephemeral
```
"items-management": {
    "ephemeral": {
        "ttl":"2 weeks"
    }
}
```
Ephemeral feeds are single feeds that delete expired items when updated.
When an item is created, its ephemeral-expiry will be set to published + ephemeral.ttl. 
Any item whose expiry has passed should be removed next time the feed is modified.

It is not guaranteed that an algorithm will load older feeds of a paged format to do the delete, so paged feeds are considered *permanent*. 
It is also not guaranteed that any algorithm will do the delete if no new items are added, since that's the only time a client-only algorithm can make updates to the feed.

This is the recommended default item management scheme.

- **ttl**: Duration an item should be valid before it is available for deletion.
  
## Paged
```
"items-management": {
    "paged": {
        "home":"http://cf.delek.org/feeds/home",
        "prev":"http://cf.delek.org/feeds/2"
        "page-size":100
    }
}
```
Paged feeds persist all items in multiple feed files. 
The paging allows users to download less data because they are only loading a subset of items.
Paged feeds allow permanent server-side archiving of items, but make ephemeral management difficult (see above).

- **prev**: previous feed file in this feed chain if paged.
- **home**: points to the home channel that is the start of this feed chain. 
it may point to this feed (itself) or be null to signify that *this* is the home channel. A good convention is to have no items in the home channel. 
- **page-size**: maximum number of items in a feed before starting on a new feed file.

## Rolling
```
"items-management": {
    "rolling": {
        "page-size":100
    }
}
```
Rolling feeds are like paged feeds, but only one page can exist at a time.
Once the page hits its page-size, the oldest item is discarded.
- **page-size**: maximum number of items in the feed file before discarding old ones.