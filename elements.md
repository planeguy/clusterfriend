# Feed
## home
*optional*
points to the home channel that is the start of this feed chain. it may point to this feed (itself) or be null to signify that *this* is the home channel.

## keys
*optional*
array of key items

- **fingerprint**: fingerprint of a friend's public key
- **group**: group id for private groups
- **key**: encrypted version of a synchronous key for *group*

## next

points to the next archived channel for paging. if null or missing, this is the last feed in the feed chain

# Item level elements

## about

link to a cf post that is what this post is about

## re

link to a cf post that this is a reply to. by convention, if *about* is omitted, *about*=*re*.

## feels

a token that describes the poster's feeling about the referenced post

## encrypted

an item encrypted using a channel group's symmetric key. An item that is encrypted requires a *description*, but it is recommended that is remains generic and does not indicate the actual contents of the item. "Encrypted Item" is a good choice.

 - **group**: the group id the item is targeting. friends who have been given a symmetric key for this group will be able to decrypt it.
 - **content**: the encrypted item
