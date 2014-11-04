#POST RELATIONSHIPS
##in general
###Reply
(post) -[replies-to]-> {post: (post), by:(person)}
###Tag
(post) -[tags]-> (person)
###Share
(post) -[shares]-> {post: (post), by:(person)}

##Relationships as...
###JSON
```JSON
{
	"replies-to":{
		"post":"http://google.com/drive/pixelante/cf/post0006.json",
		"by":"http://google.com/drive/pixelante/cf/me.json"
	},
    "tags":[
		"http://chancedixon.com/cf",
		"http://somethingawful.com/cf/lowtax"
	],
	"shares":{
		"post":"http://somethingawful.com/cf/lowtax/posts/54",
		"by":"http://somethingawful.com/cf/lowtax"
	}
}
```
###XML
```XML
<relationships>
	<replies-to>
		<post src="http://google.com/drive/pixelante/cf/post0006.json" by="http://google.com/drive/pixelante/cf/me.json" />
	</replies-to>
	<tags>
		<person src="http://chancedixon.com/cf" />
		<person src="http://somethingawful.com/cf/lowtax" />
	</tags>
	<shares>
		<post src="http://somethingawful.com/cf/lowtax/posts/54" by="http://somethingawful.com/cf/lowtax" />
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
pixelante: "still wanna see that movie with benedict cumberbatch. who's in? saturday?"
planeguy: "[chanceula] said she's working saturday for an accessioning party. how does sunday sound?"
tags: [chanceula]
```
A good client would be able to cache content that was used or seen recently and use it to add conext without making another network call.