#OBJECTS

##Person
- url: user's url, used as primary id
- user (name)
- image: link to user's profile image
- profile: url to json object that describes the person
- key: a person's public key

*suggested api endpoint*: http://host/friends/:username also http://host/ (my public profile to the world)

##Post
- for: recipients, poster & their session keys
- date
- poster
- url: the permalink for this used as id
- content
- relationships
 - in-reply-to
 - tags
 - shares
- encrypted-content
- encrypted-relationships

I think it would good to have disconnected posts, or posts that are not automatically included in the feed. Then you could make a post sharing or including a direct link to the disconnected post. This lets you post about a gallery of multiple photos for example and it will not end up splatting xMB of photos to all your friends.
