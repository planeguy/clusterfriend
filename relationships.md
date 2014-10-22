#Relationships
Relationships define how people and posts are related. Every object should have a set of relationships included with it.

##Post-Post
###Reply
post-[reply]->post  
a post can be a reply to another post  
###Share
post-[shared]->post  
a post can be a link to another post  

##Person-Person
###Friend
person-[friend key:<key>]->person  
a person is trying to be a friend of another person. the key is the public key between the two friends for private discussions.
person <-[friend]-> person  
a person is only a friend of a person if that person friends him back  
###Enemy
person-[enemy]->person  
a person is an enemy of a person and has blocked all interaction with them


##Post-Person
###Tagged
post-[tagged]->person  
The person is mentioned in the post and should get a notification (barring privacy). Also, a link to the person should be available in the post. 
###Ignored
post-[ignored]->person
Tags a post and its descendants as ignored by the person. This post should not be shown to a user.

##Relationship List
1. friend
2. enemy
3. reply
4. shared
5. tagged
6. ignored
###plurals (for api)
1. friends
2. enemies
3. replies
4. shares
5. tags
6. ignores