#!/bin/bash

# Function to kill a process running on a specific port
kill_process_on_port() {
    local port=$1
    local pid
    pid=$(lsof -ti tcp:$port)

    if [ -n "$pid" ]; then
        echo "Stopping process on port $port (PID: $pid)"
        kill -9 $pid
    else
        echo "No process found on port $port"
    fi
}

(cd subject-service/postgres && docker compose down)&
echo 'Removing Subject-service Database container '
(cd adjective && docker compose down)
echo 'Removing Adjective-service Database container '

# Stop Next.js app (port 3001)

kill_process_on_port 3001

# Stop Rails API (port 8080)
kill_process_on_port 8080

# Stop Rails API (port 3000)
kill_process_on_port 3000