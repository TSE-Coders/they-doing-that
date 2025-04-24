# Java Verb Service

The Java verb service 

## Testing

Use the commands below to test adding a verb and retrieving a random verb:

### Add Verb

```bash
curl -X POST http://localhost:8081/verb \
     -H "Content-Type: application/json" \
     -d '{"word": "read"}'
```

#### Expected Response

```bash
{ "status": "success", "storedValue": "read" }
```

### Query Random Verb

```bash
curl -X GET http://localhost:8081/verb/random \
     -H "Accept: application/json"
```

#### Expected Response

```bash
{ "word": "run" }
```

### Query all words

Returns all words in db with an id

```bash
curl -X GET http://localhost:8081/verb/all -H "Accept: application/json"
[{"word":"code","id":1},{"word":"jump","id":2},{"word":"run","id":3},{"word":"swim","id":4},{"word":"think","id":5},{"word":"write","id":6}]
```

### Delete words
```bash 
curl -X DELETE http://localhost:8081/verb/delete   -H "Content-Type: application/json"  -d '{"word": "run"}'
{ "status": "deleted", "word": "run" }
```

### Making changes

If you want to try making changes to the Java service, make your changes then rebuild the `.jar` file using the following command:
(Run from `<REPO_BASE_DIRECTORY>/verb-service/java-sqlserver` directory)

```bash
./gradlew clean build --no-build-cache --rerun-tasks --no-configuration-cache
```
