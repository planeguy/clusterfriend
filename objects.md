#OBJECTS

##Person
- user: user's url, used as primary id
- name: username
- feed: url to the main feed for this user
- public-feed: url to the unencrypted feed for this user
- image: link to user's profile image
- profile: url to json object that describes the person
- key: a person's public key

##Post
- url: url to post permalink (id)
- date
- poster: the user url of the person who posted the post
- public: content intended for anyone who can decrypt the encapsulating feed
- private: an encrypted content record for selected users

##Feed
- feed: array of posts

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