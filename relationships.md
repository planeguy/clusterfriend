#POST RELATIONSHIPS
##in general
###Reply
(post) -[replies-to]-> (post)
###Tag
(post) -[tags]-> (person)
###Share
(post) -[shares]-> (post)

##Relationships as...
###JSON
```JSON
{
	"replies-to":"http://google.com/drive/pixelante/cf/post0006.json",
    "tags":[
		"http://chancedixon.com/cf",
		"http://somethingawful.com/cf/lowtax"
	],
	"shares":"http://somethingawful.com/cf/lowtax/posts/54",
}
```
###XML
```XML
<relationships>
	<replies-to>
		<post src="http://google.com/drive/pixelante/cf/post0006.json"/>
	</replies-to>
	<tags>
		<person src="http://chancedixon.com/cf" />
		<person src="http://somethingawful.com/cf/lowtax" />
	</tags>
	<shares>
		<post src="http://somethingawful.com/cf/lowtax/posts/54"/>
	</shares>
</relationships>
```
##Suggested Uses
The relationships allow the disconnected posts to act more like a social network. You can display the relationships before loading the main content.

```
[planeguy] replied to [pixelante]'s post
... loading ...
tags: [chanceula]

[planeguy] replied to [pixelante]'s post
"[chanceula] said she's working saturday for an accessioning party. how does sunday sound?"
tags: [chanceula]
```
You could also not load any linked content and only show relationships:
```
[planeguy] replied to [pixelante]'s post
Click here to see reply
tags: [chanceula]
```
Relationships also allow client programs to create context...
```
[planeguy] replied to [pixelante]'s post
pixelante (original post): "still wanna see that movie with benedict cumberbatch. who's in? saturday?"
planeguy: "[chanceula] said she's working saturday for an accessioning party. how does sunday sound?"
tags: [chanceula]
```
A good client would be able to cache content that was used or seen recently and use it to add conext without making another network call. This also applies to users/friends/profiles, so an app can retrieve the proper user name without loading from the network.