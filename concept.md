#Basic Concept
I love social networks, but I hate the people who run them beacause invariably they fuck them up trying to monetize them. I want to host my own network for just me & my friends, free of any corporate bullshit. More in the spirit of usenet, but with more not-text.

##Technical Contraints
###CORS
The main technical constraint right now is how cross-site scripting protection affects remote friends. I would suppose in the "usenet" model, it would be server's responsibility to get and pass on data from the remote site, but that's quite an extra strain on the server. Remote friends aren't a priority right now so bleagh.

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

Remote people have only one field: remoteurl. This points to the exposed profile of the person on another clusterfriend server.

####Posts
Posts are the things people post. The content can be text, pictures, links, or all of the above. Required fields:  
- date
- md: the original post in markdown
- html: the markdown post translated to html for quick retrieval and rendering

###Relationships
Relationships define how people and posts are related. All relationships my contain a field "private", but it not used for every kind of relationship.

####To Posts
#####Going
person-[going]->post  
A person who is invited to something in a post can go (an rsvp)  
#####Not Going
person-[notgoing]->post  
A person who is invited to something in a post can not go (an rsvp)  
#####Reply
post-[reply private:true|false]->post  
a post can be a reply to another post 
if private is true, only the two posters can see the post  
#####Link
post-[link]->post  
a post can be a link to another post (sharing).  

####To People
#####Poster
post-[poster]->person  
The person who posted the post  
#####Mentioned
post-[mentioned private:true|false]->person  
The person is mentioned in the post and should get a notification. Also, a link to the person should be available in the post. 
If private is true, the only the poster & the person mentioned can see the post.  
#####Friend
person-[friend]->person  
a person is trying to be a friend of another person.  
person <-[friend]-> person  
a person is only a friend of a person if that person friends him back  