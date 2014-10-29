#POST RELATIONSHIPS
##in general
###Reply
(post) -[in-reply-to]-> (post)
###Tag
(post) -[tags]-> (person)
###Share
(post) -[shares]-> (post)

##Relationships as...
###JSON
```JSON
{
	"in-reply-to":"http://google.com/drive/pixelante/cf/post0006.json",
    "tags":[
		"http://chancedixon.com/cf",
		"http://somethingawful.com/cf/lowtax"
	],
	"shares":"http://somethingawful.com/cf/lowtax/posts/54"
}
```
###XML
```XML
<relationships>
	<in-reply-to>
		<post src="http://google.com/drive/pixelante/cf/post0006.json" />
	</in-reply-to>
	<tags>
		<person src="http://chancedixon.com/cf" />
		<person src="http://somethingawful.com/cf/lowtax" />
	</tags>
	<shares>
		<post src="http://somethingawful.com/cf/lowtax/posts/54" />
	</shares>
</relationships>
```