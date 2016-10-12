#Channel level elements
##ishome
indicates that this channel is the home channel for the user. the items listed point to other channels that are archived cf feeds

##keys
list of key elements for private items

##key
a single key for private items

**fingerprint** (attribute of *key*): fingerprint of a friend's public key

**group** (attribute of *key*): group id for private groups
##home
in an archived channel, the home element points to the home channel for reference to new content

#Item level elements
##about
link to a cf post that is what this post is about

feel (attribute of *about*): a token that describes the poster's feeling about the referenced post
##re
link to a cf post that this is a reply to. by convention, if *about* is omitted, *about*=*re*.

**feel** (attribute of *re*): a token that describes the poster's feeling about the referenced post

##encrypted-item
an rss item encrypted using a channel group's symmetric key. An item that is encrypted requires a *description*, but it is recommended that is remains generic and does not indicate the actual contents of the item. "Encrypted Item" is a good choice.

**group** (attibute of *encrypted-item*): the group id the item is targeting. friends who have been given a symmetric key for this group will be able to decrypt it.
