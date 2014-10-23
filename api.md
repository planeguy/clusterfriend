#API
A RESTful api for accessing clusterfriend data. This is technically a reference API, since any good RESTful service will reveal its api through HATEOAS.

##Authentication
Users must be authenticated to use the service. Otherwise, there is no way to guarantee the request is coming from a specific user (for access to friend-friend or private posts).  

##Paths

###http://<host>/:user-name
*GET PUT POST DELETE*  
get the user profile, update it, or register a new one in that name

###http://<host>/:user-name/friends
*GET POST DELETE*  
list of full-duplex friend relationships (i.e. other user had friended back)

###http://<host>/:user-name/enemies
*GET POST DELETE*  
list of enemy relationships. user is only authorized to see his own enemies.

###http://<host>/:user-name/archive?page=:page
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

###http://<host>/:user-name/posts/:id/replies
*GET POST*  
get or add reply relationships where this post is the "end"

###http://<host>/:user-name/posts/:id/shares
get or add shared relationships where this post is the "end"

###http://<host>/:user-name/posts/:id/tags
get or add tagged relationships where this post is the "end"

###http://<host>/relationships/
*POST*  
add relationship

###http://<host>/relationships/:id
*GET UPDATE DELETE*  
basic RUD on a particular relationship