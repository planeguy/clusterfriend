#OBJECTS

##Profile
###required
- name
- feed: href to main feed object

###optional
- key: user's public key. it's possible that this user only makes and accepts open, public posts
- image: href to profile image
- cover: href to cover image
- contact: a way to send a message to the user (email? IM?)
- realName: {first: "user's first name", last: "users's last name"}

##Feed
###required
- items: array of feed items

##optional
- next: href to next (newer) feed page
- prev: href to previous (older) feed page

##Feed Item
###required
- id

###optional
- date
- text
- image: href to an images
- link: link
- article: href to article
- source: href to the original source for this post
- reply: href to a feed item that this is a reply to
- like: href to a feed item liked
- dislike: href to a feed item disliked
- secret: secret item

###Secret Item
In theory, if a post has a secret item it should not have other items. Any other data should be ignored.
####required
- group: href to group this post is for
- data: encrypted feed item. This is a full feed item, including the id, which should be the same as its parent feed item

####optional
- compression: if the data is compressed, name the compression

##Group
###required
- &lt;public key fingerprint&gt;: the encrypted asymmetric key for the user with this fingerprint
- NO OTHER FIELDS ALLOWED
