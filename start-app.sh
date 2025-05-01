#!/bin/bash
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Enable error handling: exit immediately if a command fails
set -e

# Function to check if a container exists
start_container_if_missing() {
  local container_name=$1
  local service_path=$2

  if docker ps -a --format '{{.Names}}' | grep -qw "$container_name"; then
    echo "Container '$container_name' already exists. Skipping creation."
  else
    echo "Creating $container_name container"
    (cd "$service_path" && docker compose up -d)
  fi
}

# Function to check if a process is listening on a port
is_port_in_use() {
  local port=$1
  if lsof -i ":$port" >/dev/null 2>&1; then
    return 0
  else
    return 1
  fi
}

# Start PostgreSQL container
echo "Creating Subject-service Database"
start_container_if_missing "postgres" "subject-service/postgres"
echo "---- Subject-service Database ready -----"
sleep 5

# Start Rails service
echo "Initializing Subject-service API"

rm -f subject-service/rubyonrails-api/tmp/pids/server.pid

if (cd subject-service/rubyonrails-api && rails db:migrate); then
    echo "Database migration completed successfully."
else
    echo "Error: Database migration failed. Exiting..."
    exit 1
fi

(cd subject-service/rubyonrails-api && rails db:seed)
echo "Seed data loaded successfully"

RAILS_PID_FILE="subject-service/rubyonrails-api/tmp/pids/server.pid"

if is_port_in_use 3000 || [ -f "$RAILS_PID_FILE" ]; then
    echo "Rails server already appears to be running. Skipping start."
else
    nohup bash -c "(cd subject-service/rubyonrails-api && rails s)" > rails.log 2>&1 &
    sleep 3
fi

sleep 5

# Start MySQL container
echo "Creating Adjective-service Database"
start_container_if_missing "mysql" "adjective"
echo "---- Adjective-service Database ready -----"
sleep 5

if is_port_in_use 8080; then
    echo "Go server already running on port 8080. Skipping start."
else
    nohup bash -c "(cd adjective && go run .)" > go.log 2>&1 &
    sleep 6
fi

if grep -q "Starting server on :8080..." go.log; then
    echo "Go server started successfully"
    echo "---- Adjective-service API ready in http://localhost:8080 -----"
else
    echo "Error: Go server initialization failed. Check go.log for details."
    exit 1
fi

# Start SQLServer container
echo "Creating Verb-service Database"
start_container_if_missing "sqlserver" "verb-service/java-sqlserver"
echo "---- Verb-service Database ready -----"
sleep 5

echo "Initializing Verb-service API"

# Java 17 check
if ! java -version 2>&1 | grep -q '17'; then
    echo "Java 17 not found. Installing OpenJDK 17..."
    brew update
    brew install openjdk@17
    echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zprofile
    source ~/.zprofile
    echo "Java 17 installed successfully"
else
    echo "Java 17 is already installed"
fi

# Gradle check
if ! command -v gradle &> /dev/null; then
    echo "Gradle not found. Installing Gradle..."
    brew install gradle
    echo "Gradle installed successfully"
else
    echo "Gradle is already installed"
fi

JAR_PATH="verb-service/java-sqlserver/app/build/libs"
cd verb-service/java-sqlserver/app || { echo "App directory not found"; exit 1; }

if [ ! -f "$JAR_PATH/app.jar" ]; then
    echo "JAR file not found. Building the app..."
    gradle build || { echo "Gradle build failed"; exit 1; }
    echo "Build complete"
else
    echo "JAR file already exists"
fi

cd ../../../
cd verb-service || { echo "Verb-service directory not found"; exit 1; }

if is_port_in_use 8081; then
    echo "Java server already running on port 8081. Skipping start."
else
    echo "Starting Java Verb-service..."
    nohup java -javaagent:./java-sqlserver/dd-java-agent.jar \
      -Ddd.service=verb-api \
      -Ddd.env=tdt \
      -Ddd.version=1.0.0 \
      -Ddd.logs.injection=true \
      -Ddd.trace.sample.rate=1 \
      -Ddd.trace.debug=true \
      -Ddd.diagnostics.debug=true \
      -Ddd.trace.agent.port=8136 \
      -jar ./java-sqlserver/app/build/libs/app.jar >> ../verb-service.log 2>&1 &
    JAVA_PID=$!
    sleep 5

    if ps -p $JAVA_PID > /dev/null; then
        echo "Java process with PID $JAVA_PID is running"
        echo "----- Last 20 lines of verb-service.log -----"
        tail -n 20 ../verb-service.log

        if grep -Ei "Started|Listening|8081" ../verb-service.log; then
            echo "---- Verb-service API appears to be up at http://localhost:8081 ----"
        else
            echo "Java may be running, but no confirmation of startup or bound port."
            echo "Check full logs: tail -f verb-service.log"
        fi
    else
        echo "Java process failed to start. See log output below:"
        tail -n 20 ../verb-service.log
        exit 1
    fi
fi



# Start Next.js app
echo "Initializing TDT Frontend service"
echo "Installing npm instances"

if (cd $ROOT_DIR/frontend && npm install); then
    echo "Dependencies installed successfully"
else
    echo "Error: Dependencies installation failed. Exiting..."
    exit 1
fi

echo "Starting Next.js server"
if is_port_in_use 3001; then
    echo "Next.js server already running on port 3001. Skipping start."
else
    (cd $ROOT_DIR/frontend && npm run dev > frontend.log 2>&1 &)
    echo "TDT Frontend service ready"
    echo "----- Application available in http://localhost:3001 -----"
fi

echo "Enjoy the app!!!"
echo "If you want to restart the app, just run ./start.sh" 
echo "To stop the app a remove all the containers run ./stop-app.sh"
