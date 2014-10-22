#API
A RESTful api for accessing clusterfriend data.

##Authentication
Users must be authenticated to use the service. Otherwise, there is no way to guarantee the request is coming from a specific user (for access to friend-friend or private posts).  
The password passed is different depending on the feed. It is given to the friended user when added as a friend.

##Paths

###http://<host>/:user-name
*GET PUT POST DELETE*  
get the user profile, update it, or register a new one in that name

###http://<host>/:user-name/archive
*GET*  
list of all this user's posts in reverse chronological order

###http://<host>/:user-name/feed
*GET*  
the user's updates feed  

###http://<host>/:user-name/posts
*GET POST*  
get list of all this user's posts in reverse chronological order OR post a new post

###http://<host>/:user-name/posts/:id
*GET PUT DELETE*  
get, update, or delete the post

###http://<host>/:user-name/posts/:id/:relationshipplural
*GET POST*  
get or add objects with that relationship. ex.: http://<host>/posts/1/replies. Posting is the equivalent of adding <submitted post> -[:relationship]-> <post :id>