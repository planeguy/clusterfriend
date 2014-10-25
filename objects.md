#OBJECTS
##Person
- user (name)
- url: user's profile
- image: link to user's profile image
- personal: a json object to describe the person
- key: a person's public key
##Post
- url: url of a single version of the post. some posts will be only a summary that links back to this
- date
- poster
- post: 
 - content
 - relationships
  - relationship name
  - array of urls to things with this relationshio
- for: the most complex field. can be "public", "friends", or a **keys** object
##Keys
- <public key>: the field name is a friend's public key (indicating he has permission). the rest is data for getting the symmetric key for decrypting the main post
##Updates
- last updated: (is this required? part of http header)
- expires: (is this required? part of http header)
- updates
 - date
 - url