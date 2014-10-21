#Basic Concept
I love social networks, but I hate the people who run them beacause invariably they fuck them up trying to monetize them. I want to host my own network for just me & my friends, free of any corporate bullshit. More in the spirit of usenet, but with more not-text.

So in a rant on the Rudram Thread, I said: 


In that spirit I offer this alternative: the decentralized social network.

##Um something?
List of friends -> Query friend URL for updates -> Collate locally

##Schema
###Objects
####People
- User Name: a user name unique to this domain
- Url: the full url to this user (@self)
- RSS: the url to this user's clusterfriend rss feed
- Profile Image Url
- Personal Info: could vary; possiple just a field of markdown, but could also be some sort of JSON object

####Posts
- CF Url: the full cf url to this post
- Date
- Markdown: the original post in markdown
- HTML: the markdown post translated to html for quick retrieval and rendering
Note: there is no special thing for images. It is assumed whatever user front-end (web or app) the post is made with will upload items for url inclusion in the markdown.

###Relationships
Relationships define how people and posts are related. Every object should have a set of relationships included with it.

####To Posts
#####Reply
post-[reply]->post  
a post can be a reply to another post  
#####Link
post-[link]->post  
a post can be a link to another post (sharing)  
#####Going
person-[rsvpgoing]->post  
A person who is invited to something in a post can go (assuming the post is an invitation of some sort)  
#####Not Going
person-[rsvpnotgoing]->post  
A person who is invited to something in a post can not go (assuming the post is an invitation of some sort)  

####To People
#####Poster
post-[poster]->person  
The person who posted the post  
#####Tagged
post-[tagged]->person  
The person is mentioned in the post and should get a notification (barring privacy). Also, a link to the person should be available in the post. 
#####Friend
person-[friend]->person  
a person is trying to be a friend of another person.  
person <-[friend]-> person  
a person is only a friend of a person if that person friends him back  
#####Enemy
person-[enemy]->person  
a person is an enemy of a person and has blocked all interaction with them

####Privacy
A special relationship is used for privacy: For. Posts associated to these kind of relationships require the unique friend key to view.
Privacy cascades down to children, so a public relationship to an object with a private relationship to something is private.

ex:
	post2 -[reply]-> post1 -[for private:true]-> A  
	      -[poster]-> A    -[poster]-> B
post2 is private to personA, even though it is not specifically private

To figure this out, walk up the graph until you find [for private:true]->people. The people with the shortest path (and the poster of the object you are looking at) are the only ones with permission to the post.

#####For
post-[for private:true|false]->person  
Like a person tag, but specifically for privacy. It is possible to have a public for; it will act the same as a tag.

##Syndication and Dissemination
