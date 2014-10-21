#Syndication
Clusterfriend objects should be stored as resources accessible through http (restful). in general:
- there should be a people resource and a posts resource
- permission to view a particular resource is by original poster (viewing own stuff), friends (must be full duplex friends), for-privacy (must have privacy key), or notfor-rejection (no notifications)

##http://<host>/people
###/:user-name
get the username
###/:user-name/posts
get a list of all this user's posts in reverse chronological order
###/:user-name/rss
the user's rss updates feed  
query parameters may be passed to this

##http://<host>/posts
###/:id
get the post
###/:id/:relationship
get the objects with that relationship. ex.: http://<host>/posts/1/replies

##Rules of updating the RSS
1. A new direct relationship to the user (including posts)
2. A new extended relationship to a post of the user