#Relationships
Relationships define how people and posts are related. Every object should have a set of relationships included with it.

##Post-Post
###Reply
post-[reply]->post  
a post can be a reply to another post  
###Share
post-[share]->post  
a post can be a link to another post  

##Post-Person
###Poster
post-[poster]->person  
The person who posted the post  
###Tagged
post-[tagged]->person  
The person is mentioned in the post and should get a notification (barring privacy). Also, a link to the person should be available in the post. 

##Person-Person
###Friend
person-[friend key:<key>]->person  
a person is trying to be a friend of another person. the key is the public key between the two friends for private discussions.
person <-[friend]-> person  
a person is only a friend of a person if that person friends him back  
###Enemy
person-[enemy]->person  
a person is an enemy of a person and has blocked all interaction with them

##Privacy
Special relationships are used for privacy: For and NotFor. 
###For
post-[for]->person  
Like a person tag, but specifically for privacy.

Posts associated to this kind of relationships require the friend's public key to view.

###Not For
post-[notfor]->person
Tags a post and its descendants as ignored by the person. This post should not be shown to a user.

##Relationship List
1. friend
2. enemy
3. poster
4. tag
5. reply
6. share
7. for
8. notfor
###plurals (for api)
1. friends
2. enemies
3. poster
4. tags
5. replies
6. shares
7. for
8. notfor