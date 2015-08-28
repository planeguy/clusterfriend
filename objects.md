#OBJECTS

##Home
###required
- name
- home: href to this file
- feed: href to feed

###optional
- pk: user's public key. it's possible that this user only makes and accepts open, public posts
- img: href to profile image
- cover: href to cover image
- articles: href to articles folder
- friends: href to friend groups folder
- contact: a way to send a message to the user (email? IM?)
- realName: {first: "user's first name", last: "users's last name"}

##Feed
###required
- items: array of feed items

###optional
- old: boolean for if this is current (falsey including undefined) or old (truthy)

##Feed Item
###required
- id
- feed: href of the feed
- home: href of the poster
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
- home: href to home file
- endorsement: signature of home file at that href
- groups: map in format of {group name:symmetric key of the group encrypted with the friend's public key}