package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"io"

	"github.com/gorilla/mux"
	sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
	httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
	"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

	_ "github.com/go-sql-driver/mysql" // Import the MySQL driver
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

func initDB() {
	var err error

	// Use sqltrace.Open to instrument the MySQL connection
	dsn := "that-user:password@tcp(localhost:3306)/that-db"
	db, err = sqltrace.Open("mysql", dsn, sqltrace.WithServiceName("mysql-db"))
	if err != nil {
		log.Fatalf("Error connecting to the database: %v", err)
	}

	// Test the connection
	err = db.Ping()
	if err != nil {
		log.Fatalf("Error pinging the database: %v", err)
	}

	log.Println("Database connection established.")
	seedDatabase()
}

func seedDatabase() {
	// Predetermined list of strings
	words := []string{"happy", "all the time", "often", "no more", "every day"}

	log.Println("Seeding database with predetermined words...")

	// Insert each word if it doesn't already exist
	for _, word := range words {
		_, err := db.Exec("INSERT IGNORE INTO words (word) VALUES (?)", word)
		if err != nil {
			log.Printf("Error inserting word '%s': %v", word, err)
		}
	}

	log.Println("Database seeding completed.")
}

func RandomWordHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	span, ctx := tracer.StartSpanFromContext(r.Context(), "handler.random_word")
	defer span.Finish()

	query := `SELECT word FROM words ORDER BY RAND() LIMIT 1`
	var word string
	err := db.QueryRowContext(ctx, query).Scan(&word)
	if err != nil {
		http.Error(w, "Error fetching random word", http.StatusInternalServerError)
		log.Printf("Error executing query: %v", err)
		span.SetTag("error", err.Error())
		return
	}

	json.NewEncoder(w).Encode(Word{Word: word})
}

// DeleteWordHandler deletes a word by its ID
func DeleteWordHandler(w http.ResponseWriter, r *http.Request) {
	// Get the ID from the URL
	vars := mux.Vars(r)
	id := vars["id"]

	// Delete the word from the database
	query := "DELETE FROM words WHERE word = ?"
	result, err := db.Exec(query, id)
	if err != nil {
		http.Error(w, "Error deleting word", http.StatusInternalServerError)
		log.Printf("Error deleting word '%s': %v", id, err)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Word not found", http.StatusNotFound)
		return
	}

	// Return a success response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Response{Message: "Word deleted successfully"})
}

// GetAllWordsHandler returns all words in the database
func GetAllWordsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Query all words from the database
	query := "SELECT word FROM words"
	rows, err := db.Query(query)
	if err != nil {
		http.Error(w, "Error fetching words", http.StatusInternalServerError)
		log.Printf("Error executing query: %v", err)
		return
	}
	defer rows.Close()

	var words []Word
	for rows.Next() {
		var word string
		if err := rows.Scan(&word); err != nil {
			http.Error(w, "Error reading words", http.StatusInternalServerError)
			log.Printf("Error scanning row: %v", err)
			return
		}
		words = append(words, Word{Word: word})
	}

	// Encode and return the list of words
	json.NewEncoder(w).Encode(words)
}

func setupLogging() {
	file, err := os.OpenFile("app.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("Failed to open log file: %v", err)
	}
	mw := io.MultiWriter(os.Stdout, file)

	// Set the global logger's output to the multi-writer
	log.SetOutput(mw)

	// Log that logging has started
	log.Println("Logging started...")
}

// Uncomment the following function to initialize Datadog tracer
// and send traces to Datadog.
	// --------------------------------------->
// func initDDTracer() {
// 	tracer.Start(
// 		tracer.WithEnv("tdt"),
// 		tracer.WithService("adjective-api"),
// 		tracer.WithServiceVersion("v1"),
// 		tracer.WithAgentAddr("localhost:8136"),
// 		tracer.WithLogStartup(false),
// 	)
// 	log.Println("Datadog tracer started")
// }
	// <---------------------------------------
func main() {
	setupLogging()
	log.Println("Application is starting...")

	initDB()
	defer db.Close()

	// Uncomment the following line to initialize Datadog tracer
	// and send traces to Datadog.
	// --------------------------------------->
	// initDDTracer()
	// defer tracer.Stop()
	// <---------------------------------------
	r := mux.NewRouter()

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Response{Message: "Welcome to my API!"})
	}).Methods("GET")

	// Updated endpoint to /noun
	r.HandleFunc("/noun", func(w http.ResponseWriter, r *http.Request) {
		var word Word

		err := json.NewDecoder(r.Body).Decode(&word)
		if err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		query := "INSERT INTO words (word) VALUES (?)"
		_, err = db.Exec(query, word.Word)
		if err != nil {
			http.Error(w, "Error inserting into database", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Response{Message: "Word added successfully"})
	}).Methods("POST")

	// Updated endpoint to /noun/random
	r.HandleFunc("/noun/random", RandomWordHandler).Methods("GET")

	// Updated endpoint to /noun/{id} for DELETE
	r.HandleFunc("/noun/{id}", DeleteWordHandler).Methods("DELETE")

	// Updated endpoint to /noun/all for GET all words
	r.HandleFunc("/noun/all", GetAllWordsHandler).Methods("GET")

	wrappedRouter := httptrace.WrapHandler(r, "that-api", "http.router")
	log.Println("Go application started successfully")

	log.Println("Starting server on :8080...")
	log.Fatal(http.ListenAndServe(":8080", wrappedRouter))
}
