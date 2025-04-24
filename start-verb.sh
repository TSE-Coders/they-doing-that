#!/bin/bash

echo "Creating Verb-service Database"
echo "Creating SQLServer container"
(cd verb-service/java-sqlserver && docker compose up -d)
echo "---- Verb-service Database ready -----"
sleep 5

# echo "Initializing Verb-service API"

echo "Initializing Verb-service API"
if ! java -version 2>&1 | grep -q '17'; then
    echo "Java 17 not found. Installing OpenJDK 17..."
    brew update
    brew install openjdk@17
    echo "Java 17 installed successfully"
else
    echo "Java 17 is already installed"
fi


if ( cd verb-service/ && java -javaagent:./java-sqlserver/dd-java-agent.jar \
  -Ddd.service=verb-API \
  -Ddd.env=prod \
  -Ddd.version=1.0.0 \
  -Ddd.logs.injection=true \
  -Ddd.trace.sample.rate=1 \
  -Ddd.trace.debug=true \
  -Ddd.diagnostics.debug=true \
  -Ddd.trace.agent.port=8136 \
  -jar ./java-sqlserver/app/build/libs/app.jar > ../verb-service.log); then
  echo "Java verb-service started"
  echo "Java server started successfully"
  echo "---- Verb-service API ready in http://localhost:8081 -----"
else 
    echo "Java failed"
    exit 1
fi
