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

### Making changes

If you want to try making changes to the Java service, make your changes then rebuild the `.jar` file using the following command:
(Run from `<REPO_BASE_DIRECTORY>/verb-service/java-sqlserver` directory)

```bash
./gradlew clean build --no-build-cache --rerun-tasks --no-configuration-cache
```




