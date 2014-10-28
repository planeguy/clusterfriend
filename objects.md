#OBJECTS

##Person
- user (name)
- url: user's url
- image: link to user's profile image
- profile: url to json object that describes the person
- key: a person's public key

*suggested api endpoint*: http://host/friends/:username also http://host/ (my public profile to the world)

##Post
- url
- date
- poster: probably a full person object
- content
- relationships
 - in-reply-to
 - tags
 - shares
