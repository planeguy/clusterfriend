#OBJECTS

##Profile
###required
- name

###semi-optional
- feed: link to the most current feed file (if any posts are made)

###optional
- public-key: user's public key. it's possible that this user only makes and accepts open, public posts and does not want to be added to someone's posting group. useful for public entities like companies or celebrities.
- img: href to profile image
- cover: href to cover image
- contact: a way to send a message to the user (email? IM?)
- realName: {first: "user's first name", last: "users's last name"}

##Encrypted Profile
###required
- keys
- profile

##Feed
###required
- items: array of feed items

###optional
- prev: href to previous feed file
- next: href to next feed file

##Feed Item
###required
- url
- poster: href to poster's clusterfriend
- date

###optional
- text
- image: href to an image
- link: href link
- re: href to a feed item that this is a reply to
- feeling: type of feel (like, dislike, etc.)