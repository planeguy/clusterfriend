#OBJECTS

##Profile
###required
- name

###semi-optional
- feed: link to the most current feed file (if any posts are made)

###optional
- public-key: link to user's public key file. note: a user with a public key file cannot be added to a private group.
- img: href to profile image
- cover: href to cover image
- contact: a way to send a message to the user (email? IM?)
- realName: {first: "user's first name", last: "users's last name"}

##Encrypted Profile
###required
- keys: link to keys file
- profile: encrypted profile object
- hash: this is a hash of the profile and the keys objects. the reason for this is that we do not bother downloading the keys unless the profile has updated.

##Keys
a map of a private profile's symmetric encryption key encrypted for each of the group's users.
   > dave: ENCRYPTED KEY, mark: ENCRYPTED KEY, jane: ENCRYPTED KEY

##Feed
###required
- items: array of feed items

###optional
- prev: href to previous feed file
- next: href to next feed file

##Feed Item
###required
- url
- date

###optional
- text
- image: href to an image
- link: href link
- re: href to a feed item that this is a reply to
- feeling: type of feel (like, dislike, etc.)