# They Doing That

## Overview

**They Doing That** is a sandbox application designed for Technical Support Engineers (TSEs) to:
- Understand the implementation of Datadog products across different technologies and libraries.
- Troubleshoot customer issues by replicating their environments.
- Validate solutions intended for customers.
- Generate data for TSE's dog food accounts.

The application consists of a **Next.js** frontend and three backend APIs. Together, they create and display a dynamic sentence composed of a subject, verb, and adjective, with each word changing every 3 seconds.

## Architecture

### Frontend
The frontend is built with **Next.js** and:
- Displays a sentence composed of a subject, verb, and adjective.
- Updates each word in the sentence every 3 seconds.
- Fetches new words from the backend APIs via GET requests.

### Backend APIs
1. **Subject-API**
   - Built with **Ruby on Rails**.
   - Interacts with a **Postgres** database (Docker container).
   - Receives a string (subject name) via POST and returns a random subject from a predefined list.

2. **Verb-API**
   - Built with **Java**.
   - Interacts with a **SQL Server** database (Docker container).
   - Receives a string (verb) via POST and returns a random verb from a predefined list.

3. **Adjective-API**
   - Built with **Golang**.
   - Interacts with a **MySQL** database (Docker container).
   - Receives a string (adjective) via POST and returns a random adjective from a predefined list.

## Prerequisites
Before starting, ensure you have the following installed:
- **Ruby** v3.3.6
- **Go** v1.23.2
- **Node.js** v22.10.0
- **Docker**

## Setup and Usage

### Starting the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/TSE-Coders/they-doing-that
   cd they-doing-that
   ```
2. Navigate to the root directory.

3. The files start-app.sh and stop-app.sh contain a script that will start and stop all the services.
   run the following command to grant execute permissions to both files: 
   ```bash
   chmod +x start_app.sh
   chmod +x stop_app.sh
   ```

4. Run the following command to start the application:
   ```bash
   ./start-app.sh
   ```
   This will:
   - Start the Next.js frontend.
   - Launch the three backend APIs and their respective Dockerized databases.

### Stopping the Application
To stop the application, run:

   ```bash
   ./stop-app.sh
   ```

## Repository
The source code for this project can be found in the GitHub repository:
[https://github.com/TSE-Coders/they-doing-that](https://github.com/TSE-Coders/they-doing-that)

## Technical Details

### API Details
#### Subject-API 
- **Language**: Ruby on Rails
- **Database**: Postgres (Dockerized)
- **Endpoints**: Port: 3000
  - `GET/name/random`: Returns a string (name).
  - `POST/name`: Send a string (name).

#### Verb-API
- **Language**: Java
- **Database**: SQL Server (Dockerized)
- **Endpoints**:
  - `GET/verb/random`: Returns a string (verb).
  - `POST/verb`: Send a string (verb).

#### Adjective-API 
- **Language**: Golang
- **Database**: MySQL (Dockerized)
- **Endpoints**: Port:8080
  - `GET/random`: Returns a string (name).
  - `POST/`: Send a string (name).

### Frontend Details
- **Framework**: Next.js
- **Functionality**:
  - Fetches words from the APIs using GET requests every 3 seconds.
  - Dynamically updates the sentence displayed to the user.

## Purpose
This application serves as a versatile sandbox for TSEs to:
- Experiment with Datadog integrations in Ruby, Java, Go, and JavaScript environments.
- Debug and reproduce customer issues.
- Validate and test suggested solutions in a controlled environment.
- Generate meaningful data for testing and demonstrations.

---

Feel free to contribute or open issues in the repository to improve this tool. Happy debugging!
