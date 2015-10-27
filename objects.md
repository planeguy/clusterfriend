#OBJECTS

##Home
###required
- name
- home: href to this file
- feed: href to most current feed

###optional
- pk: user's public key. it's possible that this user only makes and accepts open, public posts
- img: href to profile image
- cover: href to cover image
- friends: href to friend groups folder
- contact: a way to send a message to the user (email? IM?)
- realName: {first: "user's first name", last: "users's last name"}

##Feed
###required
- items: array of feed items

###optional
- prev: href to previous feed file
- next href to next feed file

##Feed Item
###required
- id
- home: href of the poster
- date

###optional
- text
- image: href to an image
- link: href link
- reply: href to a feed item that this is a reply to
- feeling: {href: href to a feed item the feeling is about, feel: type of feel}
- corrects: id of an item you wish to correct
- sgroup: if this item a secret item envelope, this is the group the item is meant for
- sdata: data that comprises a secret item for a group
- retracts: id of an item you wish to retract

##Friend
###required
- home: href to home file
- endorsement: signature of home file at that href
- groups: map in format of {group name:symmetric key of the group encrypted with the friend's public key}
