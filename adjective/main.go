package main

import (
	"database/sql"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
	httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
	"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
	datadog "gopkg.in/DataDog/dd-trace-go.v1/contrib/sirupsen/logrus"
	"github.com/sirupsen/logrus"

	_ "github.com/go-sql-driver/mysql" // Import the MySQL driver
)

// Word represents the data structure for input/output
// Added the ID field to the struct
type Word struct {
	ID   int    `json:"id"`   // ID is now included in the response
	Word string `json:"word"` // Word remains the same
}

// Initialize Logrus with the Datadog hook
var logger = logrus.New()

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

	// Use logger with context to ensure trace and span IDs are included
	entry := logger.WithContext(ctx).WithFields(logrus.Fields{
		"handler": "random_word",
	})
	entry.Info("Processing request to fetch a random word")

	query := `SELECT word FROM words ORDER BY RAND() LIMIT 1`
	var word string
	err := db.QueryRowContext(ctx, query).Scan(&word)
	if err != nil {
		http.Error(w, "Error fetching random word", http.StatusInternalServerError)
		entry.WithError(err).Error("Error executing database query")
		log.Printf("Error executing query: %v", err)
		span.SetTag("error", err.Error())
		return
	}

	response := Word{Word: word}
	if err := json.NewEncoder(w).Encode(response); err != nil {
		entry.WithError(err).Error("Error encoding JSON response")
		http.Error(w, "Error encoding JSON response", http.StatusInternalServerError)
		span.SetTag("error", err.Error())
		return
	}

	entry.WithFields(logrus.Fields{
		"random_word": response.Word,
	}).Info("Random word fetched successfully")
}

// DeleteWordHandler deletes a word by its ID
func DeleteWordHandler(w http.ResponseWriter, r *http.Request) {
	// Get the ID from the URL
	vars := mux.Vars(r)
	id := vars["id"]

	// Delete the word from the database
	query := "DELETE FROM words WHERE id = ?"
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

// GetAllWordsHandler returns all words in the database, including the ID
func GetAllWordsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Query all words from the database, including the ID
	query := "SELECT id, word FROM words"
	rows, err := db.Query(query)
	if err != nil {
		http.Error(w, "Error fetching words", http.StatusInternalServerError)
		log.Printf("Error executing query: %v", err)
		return
	}
	defer rows.Close()

	var words []Word
	for rows.Next() {
		var word Word
		if err := rows.Scan(&word.ID, &word.Word); err != nil {
			http.Error(w, "Error reading words", http.StatusInternalServerError)
			log.Printf("Error scanning row: %v", err)
			return
		}
		words = append(words, word)
	}

	// Encode and return the list of words with their IDs
	json.NewEncoder(w).Encode(words)
}

func setupLogging() {
	// Add the Datadog hook
	logger.AddHook(&datadog.DDContextLogHook{})

	// Configure Logrus to log to a file
	logFile, err := os.OpenFile("app.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		log.Printf("Error opening log file: %v", err)
		// Optionally, you can still log to stdout if file logging fails
		logger.SetOutput(os.Stdout)
	} else {
		// Log to both file and stdout (you can choose just the file if you prefer)
		logger.SetOutput(io.MultiWriter(os.Stdout, logFile))
	}

	// Set the log format (you can choose JSON or text)
	logger.SetFormatter(&logrus.JSONFormatter{}) // Recommended for Datadog

	log.Println("Datadog Logrus hook added. Logging configured.")
}

// Uncomment the following function to initialize Datadog tracer
// and send traces to Datadog.
// --------------------------------------->
func initDDTracer() {
	tracer.Start(
		tracer.WithEnv("tdt"),
		tracer.WithService("adjective-api"),
		tracer.WithServiceVersion("v1"),
		tracer.WithAgentAddr("localhost:8136"),
		tracer.WithLogStartup(false),
	)
	log.Println("Datadog tracer started")
}

// <---------------------------------------
func main() {
	setupLogging()
	log.Println("Application is starting...")

	initDB()
	defer db.Close()

	// Uncomment the following line to initialize Datadog tracer
	// and send traces to Datadog.
	// --------------------------------------->
	initDDTracer()
	defer tracer.Stop()
	// <---------------------------------------
	r := mux.NewRouter()

	// CORS configuration
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3001/"}, // Your frontend URL
		AllowedMethods:   []string{"GET", "POST", "DELETE"},  // Allowed HTTP methods
		AllowedHeaders:   []string{"Content-Type", "Authorization"}, // Allowed headers
		AllowCredentials: true,
	})

	// Datadog HTTP trace wrapper
	tracedRouter := httptrace.WrapHandler(r, "that-api", "http.router")

	// Now wrap the router with both CORS and Datadog tracing
	corsAndTraceHandler := corsHandler.Handler(tracedRouter)

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

	// Updated endpoint to /noun/all for GET all words (with ID included)
	r.HandleFunc("/noun/all", GetAllWordsHandler).Methods("GET")

	log.Println("Go application started successfully")

	log.Println("Starting server on :8080...")
	log.Fatal(http.ListenAndServe(":8080", corsAndTraceHandler))
}
