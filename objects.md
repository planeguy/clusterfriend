#OBJECTS

##Home
###required
- name
- feed: href to most current feed

###optional
- key: user's public key. it's possible that this user only makes and accepts open, public posts
- folders: map of local folders of clusterfriend resources that are not at default locations ex.: {"friends":"bffs"}
- img: href to profile image
- cover: href to cover image
- contact: a way to send a message to the user (email? IM?)
- realName: {first: "user's first name", last: "users's last name"}

##Feed
###required
- items: array of feed items

###optional
- prev: href to previous feed file
- next: href to next feed file

##Feed Item
###required
- id
- poster: href to poster's clusterfriend
- date

###optional
- text
- image: href to an image
- link: href link
- re: href to a feed item that this is a reply to
- feeling: type of feel (like, dislike, etc.)
- sgroup: if this item a secret item envelope, this is the group the item is meant for
- sdata: data that comprises a secret item for a group

##Friend
###required
- home: href to home file
- groups: map in format of {group name:symmetric key of the group encrypted with the friend's public key}
###optional
- endorsement: signature of home file at that href
