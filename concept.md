#Basic Concept
I love social networks, but I hate the people who run them beacause invariably theu fuck them up. I want to host my own network for just me & my friends, free of any corporate bullshit.

##Schema
There are only two types of objects: people & posts
###Objects
####People
There are two kinds of people nodes: local and remote

Local people hold all profile info for a person:
- Name
- User login
- Bio
- etc.  
Also, a local person is identified by a local key or username:
- localkey: delek.turner

Remote people have only one field: remoteurl. This points to the exposed profile of the person on another clusterfriend server
####Posts
Posts are the things people post. The content can be text, pictures, links, or all of the above. The fields are rudimentary:
- Date
- LinkedOnlyPrivacy: only people linked to this post can see it  

###Relationships
Relationships define how people and posts are related.  
####Poster
post-[poster]->person  
The person who posted the post  
####Mentioned
post-[mentioned private:true|false]->person  
The person is mentioned in the post and should get a notification. Also, a link to the person should be available in the post. 
If private is true, the only the poster & the person mentioned can see the post.  
####Invited
post-[invited]->person  
If the post is an event of some sort, a person can be invited to attend. They will get a notification.  
####RSVP
person-[rsvp going:true|false]->post  
A person who is invited to a post can rsvp  
####Reply
post-[reply private:true|false]->post  
a post can be a reply to another post 
if private is true, only the two posters can see the post  
####Link
post-[link]->post  
a post can be a link to another post (sharing).  
####Friend
person-[friend]->person  
a person is trying to be a friend of another person.  
person <-[friend]-> person  
a person is only a friend of a person if that person friends him back  

##API
clusterfriend is a RESTful service with urls that do things.  
unless otherwise noted, GET results and POST/PUT authorization are based on if the posters are friends (p <-[friend]-> p )  
**<host>/people**  
returns a list of people on the server that is a friend of this user
**<host>/people/:user**  
returns the requested user  
**<host>/people/:user/posts**  
**<host>/people/:user/posts?nextafter:postid**  
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
**<host>/me/feed?nextafter:postid**  
collected feed of user's friend's posts in reverse chronological order. fuck curation.  
**<host>/me/requests**  
GETS list of people who have added the user to their list but haven't been added to the user's list  