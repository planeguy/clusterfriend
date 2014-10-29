#OBJECTS

##Person
- url: user's url, used as primary id
- user (name)
- image: link to user's profile image
- profile: url to json object that describes the person
- key: a person's public key

*suggested api endpoint*: http://host/friends/:username also http://host/ (my public profile to the world)

##Post
- for: recipients, poster & their session keys if applicable
- date
- poster
- url: the permalink for this used as id
- encrypted-url
- content
- relationships
 - in-reply-to
 - tags
 - shares
- encrypted-content
- encrypted-relationships

##Feed
- style: for possible second style. currently only "combined"
- prev
- next
- feed: array of posts
- encrypted-feed