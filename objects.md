#OBJECTS

##Person
- user: user's url, used as primary id
- name: username
- feed: url to the feed object
- image: link to user's profile image
- profile: url to json object that describes the person
- key: a person's public key

##Post
- for: recipients list
- date
- poster
- post
 - url: the permalink
 - summary: quick description; any summary over 140 characters is rejected (yes 140)
 - relates
  - replies-to
  - tags
  - shares
 - content

##Feed
- feed: array of posts