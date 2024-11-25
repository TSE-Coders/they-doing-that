package main

import (
	"database/sql"
	"encoding/json"
	"log"
	// "math/rand"
	"net/http"
	// "time"

	"github.com/gorilla/mux"
	_ "github.com/go-sql-driver/mysql"
)

// Word represents the data structure for input/output
type Word struct {
	Word string `json:"word"`
}

// Response represents the structure for API responses
type Response struct {
	Message string `json:"message"`
}

var db *sql.DB

// Initialize database connection
func initDB() {
	var err error
	dsn := "that-user:password@tcp(localhost:3306)/that-db" // Update with your MySQL credentials
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("Error connecting to the database: %v", err)
	}

	// Test the connection
	err = db.Ping()
	if err != nil {
		log.Fatalf("Error pinging the database: %v", err)
	}

	log.Println("Database connection established.")
}

// RandomWordHandler handles the /random route
func RandomWordHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Query a random word from the database
	query := `SELECT word FROM words ORDER BY RAND() LIMIT 1`
	var word string
	err := db.QueryRow(query).Scan(&word)
	if err != nil {
		http.Error(w, "Error fetching random word", http.StatusInternalServerError)
		log.Printf("Error executing query: %v", err)
		return
	}

	// Send the random word as a response
	json.NewEncoder(w).Encode(Word{Word: word})
}

func main() {
	// Initialize the database
	initDB()
	defer db.Close()

	r := mux.NewRouter()

	// Define routes
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Response{Message: "Welcome to my API!"})
	}).Methods("GET")

	r.HandleFunc("/words", func(w http.ResponseWriter, r *http.Request) {
		var word Word

		// Decode JSON payload
		err := json.NewDecoder(r.Body).Decode(&word)
		if err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// Insert word into the database
		query := "INSERT INTO words (word) VALUES (?)"
		_, err = db.Exec(query, word.Word)
		if err != nil {
			http.Error(w, "Error inserting into database", http.StatusInternalServerError)
			return
		}

		// Respond to the client
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Response{Message: "Word added successfully"})
	}).Methods("POST")

	// Add the new random endpoint
	r.HandleFunc("/random", RandomWordHandler).Methods("GET")

	// Start the server
	log.Println("Starting server on :8080...")
	log.Fatal(http.ListenAndServe(":8080", r))
}

