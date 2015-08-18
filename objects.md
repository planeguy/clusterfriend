#OBJECTS

##Home
###required
- name
- feed: href to current feed object

###optional
- pk: user's public key. it's possible that this user only makes and accepts open, public posts
- img: href to profile image
- cover: href to cover image
- articles: href to articles
- sigs: href to list of signed homes (id verification)
- contact: a way to send a message to the user (email? IM?)
- realName: {first: "user's first name", last: "users's last name"}

##Feed
###required
- items: array of feed items

##optional
- older: href to previous (older) feed page

##Feed Item
###required
- id
- home
- date

###optional
- text
- image: href to an image
- link: href link
- article: id to article for this item
- reply: href to a feed item that this is a reply to
- like: href to a feed item liked
- dislike: href to a feed item disliked
- corrects: id of an item you wish to correct
- sgroup: if this item a secret item envelope, this is the group the item is meant for
- sdata: data that comprises a secret item for a group
- retracts: id of an item you wish to retract

##Friend
###required
- home
- groups: map informat of group name:symmetric key of the group encrypted with the friend's public key
- signed: if we are holding a signed copy of this friend's home file, this is the href to that
