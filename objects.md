#OBJECTS

##Person
- id: user's url, used as primary id
- name: username
- image: link to user's profile image
- profile: url to json object that describes the person
- key: a person's public key
- session: url to session keys resource
- feed: url to the main feed for this user

##Post
- id: url to post permalink (id)
- date
- poster: the user url of the person who posted the post
- public: content intended for anyone who can decrypt the encapsulating feed
- private: an encrypted content record for selected users

##Feed
- period: average posting period (as in 1/frequency) with a minimum period of 10-15 minutes
- feed: array of feed-entries
###Feed entry
- date
- url: permalink of post

##Content
- relates: array of relationships to other objects in the network
- content: actual content
- more: true|false. more content at permalink. use for long posts.

###Relationships
**Reply-To**  
- replies-to: url of post this is a reply to  
**Share**  
- shares: url of post this shares  
**Tag**  
- tags: url of a tagged user  
**Like**  
- likes: url of a post liked by the user  
**Dislike**  
- dislikes: url of a post disliked by the user  