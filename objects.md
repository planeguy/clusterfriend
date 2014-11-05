#OBJECTS

##[person]Person
- user: user's url, used as primary id
- name: username
- feed: url to the primary [feed][feed] object
- image: link to user's profile image
- profile: url to json object that describes the person
- key: a person's public key

##[post]Post
- rcpt: recipients list of [people][person] for private encrypted content
- date
- poster:[person][person] who posted the post
- public: [content][content] intended for anyone who can decrypt the encapsulated post
- encrypted: an encrypted [content][content] record
- decrypted: [content][content] that has been decrypted from or intended for encryption to the encrypted content field

##[feed]Feed
- feed: array of [posts][post]

##Sub-Objects
These objects are part of other objects (post), but are not first-citizens. They are not accessable individually though the api like the rest.

###[content]Content
- url: url to post permalink
- relates: [relationships][relates] to other objects in the network
- summary: short description of content. limited amount of characters. optionally reject feeds with long summaries
- content: actual content
- more: true|false if there is no more content available at the url (either this record IS the url or the content fits in the summary)

#3#[relates]Relates
- replies-to: a post that this is a reply to
- tags: a list of people who are tagged
- shares: a post that this post shares