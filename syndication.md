#Syndication
Clusterfriend objects should be stored as resources accessible through http (restful). in general:
- there should be a people resource and a posts resource
- permission to view a particular resource is by original poster (viewing own stuff), friends (must be full duplex friends), for-privacy (must have privacy key), or notfor-rejection (no notifications)
see api for more details

The RSS feed should return urls to those resources

##Rules of updating the RSS
1. A new direct relationship to the user (including posts)
2. A new extended relationship to a post of the user