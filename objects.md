###Objects
####People
- User Name: a user name unique to this domain
- Url: the full url to this user (self or @id)
- Profile Image Url
- Personal Info: could vary; possible just a field of markdown, but could also be some sort of JSON object

####Posts
- Url: the full url to this post (self or @id)
- Date
- Poster: url of user who posted the post
- Markdown: the original post in markdown
- HTML: the markdown post translated to html for quick retrieval and rendering
Note: there is no special thing for images. It is assumed whatever user front-end (web or app) the post is made with will upload items for url inclusion in the markdown.
- For: privacy property; only users in the for list can see the post
