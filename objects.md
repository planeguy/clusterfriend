#OBJECTS

##Person
- id: user's url, used as primary id
- name: username
- image: link to user's profile image
- profile: url to json object that describes the person
- key: a person's public key
- feed: url to the main feed for this user

##Post
- id: url to post permalink (id)
- date
- poster: the user url of the person who posted the post
- for: an object with either an url to session keys group OR  a full session keys group
- public: content intended for anyone who can decrypt the encapsulating feed
- private: an encrypted content record for selected users

###For
- url: url to a group
- group: an actual group

##Group
- id: url of session key group
- key: encrypted session key and expiry for each member of the group
- profile: private encrypted profile of the group (for members only)

##Feed
- period: average posting period (as in 1/frequency) with a minimum period of 10-15 minutes
- meta: metadata for the feed, including possible compression algorithms
- feed: array of feed-entries
###Feed entry
- date
- url: permalink of post

##Content
- relates: array of relationships to other objects in the network
- content: actual content
- more-at-url: true|false. more content at permalink. use for long posts.

###Relationships
**Reply-To**  
- replies-to: post/poster url pair this post replies to
**Share**  
- shares: post/poster url pair this post shares
**Tag**  
- tags: url of a tagged user  
**Like**  
- likes: post/poster url pair liked by the user  
**Dislike**  
- dislikes: post/poster url pair disliked by the user
**post/poster url pair**
- post: url of post
- poster: url of poster