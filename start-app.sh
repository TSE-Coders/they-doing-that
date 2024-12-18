#!/bin/bash
# Enable error handling: exit immediately if a command fails
set -e


# Start PostgreSQL container and wait for it to be ready

echo "Creating Subject-service Database"
echo "Creating Postgres container"
(cd subject-service/postgres && docker compose up -d)
echo "---- Subject-service Database ready -----"
sleep 5

# Start MySQL container and wait for it to be ready

echo "Creating Adjective-service Database"
echo "Creating MySQL container"
(cd adjective && docker compose up -d)
echo "---- Adjective-service Database ready -----"
sleep 5



# Start Rails service sequentially

echo "Initializing Subject-service API"

if (cd subject-service/rubyonrails-api && rails db:migrate); then
    echo "Database migration completed successfully."
else
    echo "Error: Database migration failed. Exiting..."
    exit 1
fi

(cd subject-service/rubyonrails-api && rails db:seed) 
echo "Seed data loaded successfully"

nohup bash -c "(cd subject-service/rubyonrails-api && rails s)" > rails.log 2>&1 &
sleep 3  # Give Rails a moment to start

# Check if the Rails server started successfully
if grep -q "http://127.0.0.1:3000" rails.log; then
    echo "Rails server started successfully"
    echo "---- Subject-service API ready in http://localhost:3000 -----"
else
    echo "Error: Rails server initialization failed. Check rails.log for details."
    exit 1
fi

sleep 5

# Start Go 

nohup bash -c "(cd adjective && go run .)" > go.log 2>&1 &
sleep 3  # Give Go a moment to start

# Check if the Go server started successfully
if grep -q "Starting server on :8080..." go.log; then
    echo "Go server started successfully"
    echo "---- Subject-service API ready in http://localhost:8080 -----"
else
    echo "Error: Go server initialization failed. Check rails.log for details."
    exit 1
fi




# Start Next.js application
echo "Initializing TDT Frontend service"
echo "Installing npm instances"

if (cd frontend && npm install); then
    echo "Dependencies installed successfully"
else
    echo "Error: Dependencies installation failed. Exiting..."
    exit 1
fi

echo "Starting Next.js server" 

if (cd frontend && npm run dev > frontend.log 2>&1 &); then
    echo "Dependencies installed successfully"
    echo "TDT Frontend service ready"
    echo "----- Application available in http://localhost:3001 -----"
else
    echo "Error: Dependencies installation failed. Exiting..."
    exit 1
fi

disown
