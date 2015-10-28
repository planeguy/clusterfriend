#Client Patterns

##Local Caching
###Items
####Poster
The poster of an item is not included in the item as - in theory - we know who posted it from where we got it when storing an item. We should include the poster in the local copy.
```json
{
  "id":"http://cf.delek.org/feeds/1#1",
  "date":"2015-10-28T16:22:00.0Z",
  "text":"hello",
  "cachedData": {
    "poster":"http://cf.delek.org"
  }
}
```
