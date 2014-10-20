#API
clusterfriend is a RESTful service with urls that do things.  
unless otherwise noted, GET results and POST/PUT authorization are based on if the posters are friends (p <-[friend]-> p )  
**<host>/people/:user**  
returns the requested user  
**<host>/people/:user/posts**  
**<host>/people/:user/posts?nextafter=:postid**  
posts feed of that user. nextafter is the is of the last post on the previous page  
if the user is also the user who is accessing the posts, POST, PUT & DELETE is also supported  
**<host>/people/:user/posts/:postid**  
a specific post  
**<host>/people/:user/posts/:postid/:relation**  
will get all things that are :related to this one (i.e. where thing -[:relation]->:post)
POSTing to this url will add a new post to your feed with that relation. equivalent of POST <host>/people/<current-logged-in-user>/posts where the post has a relation to :post indicated  
**<host>/me**  
user's profile  
**<host>/me/friends**  
user's friends. includes value to mark if the user has been added back  
**<host>/me/friends/:friendid (POST and DELETE ONLY)**  
adds/removes friends from the user's list. a friend "confirms" by adding the user to his list.  
**<host>/me/feed**  
**<host>/me/feed?nextafter:posthref**  
collected feed of user's friend's posts in reverse chronological order. fuck curation.  
**<host>/me/requests**  
GETS list of people who have added the user to their list but haven't been added to the user's list  
**<host>/me/requests/:user (DELETE ONLY)**  
Rejects a friend request and removes the current user form :user's friend list
**<host>/me/enemies**  
user's enemies (user block) 
**<host>/me/enemies/:friendid (POST and DELETE ONLY)**  
adds/removes enemies from the user's list. enemies do not have to be confirmed.