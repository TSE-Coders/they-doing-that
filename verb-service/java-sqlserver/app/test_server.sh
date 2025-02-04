#!/bin/bash

# Server URL
SERVER_URL="http://localhost:8080"

# Endpoint URLs
STORE_ENDPOINT="$SERVER_URL/api/store-data"
QUERY_ENDPOINT="$SERVER_URL/api/query-data"

echo "Testing server at $SERVER_URL..."
echo "Running 100 iterations..."

# Loop 100 times
for i in {1..100}; do
    # Generate a random value between 1 and 1000
    RANDOM_VALUE=$((RANDOM % 1000 + 1))

    echo "Iteration $i: Sending POST request with random value: $RANDOM_VALUE"

    # 1. Send POST request to store a random value
    POST_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"value\": $RANDOM_VALUE}" $STORE_ENDPOINT)

    # Check POST response
    if [[ $POST_RESPONSE == *"success"* ]]; then
        echo "POST Success: $POST_RESPONSE"
    else
        echo "POST Failed: $POST_RESPONSE"
        exit 1
    fi

    # 2. Optionally, retrieve all stored values every 10 iterations
    if (( i % 10 == 0 )); then
        echo "Iteration $i: Sending GET request to retrieve all stored values..."
        GET_RESPONSE=$(curl -s -X GET $QUERY_ENDPOINT)

        # Check GET response
        if [[ $GET_RESPONSE == *"storedValues"* ]]; then
            echo "GET Success: $GET_RESPONSE"
        else
            echo "GET Failed: $GET_RESPONSE"
            exit 1
        fi
    fi
done

echo "Server test completed successfully after 100 iterations!"
