#Basic Concept
I love social networks, but I hate the people who run them beacause invariably they fuck them up trying to monetize them. I want to host my own network for just me & my friends, free of any corporate bullshit. More in the spirit of usenet, but with more not-text.

So in a rant on the Rudram Thread, I said: 


In that spirit I offer this alternative: the decentralized social network.

##Um something?
List of friends -> Query friend URL for updates -> Collate locally
Essentally, clusterfriend is a complex sysyem to filter posts in a feed by user

##Encryped for multiple recipients
The basic idea is that everything is encrypted. For space and sanity's sake let's limit friend lists? Something nerdy like 128 to 256?
posts can be marked as:
1. fully public
2. friends only
3. specific friends
posts in the feed will be marked and encrypted accordingly
###PUBLIC
no encryption (obviously)

###FRIENDS ONLY
Encrypted with a common symmetric key. Each friend has access to that key, encrypted with their own public key. So the process is:  
get encrypted friends-only key -> decypt with my own private key -> decrypt post with friend-only key

friends-only keys can be marked to expire.
###SPECIFIC FRIENDS
Encrypted with a unique symmetric key. The key is encryped with a target friend's public key and added to the post. then only the friends on the post can get the symmetric key for that post.
