package org.example;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.*;
import java.sql.*;
import java.util.*;

public class JavaSqlServer {

    // SQL Server connection details
    private static final String DB_URL = "jdbc:sqlserver://localhost:1433;trustServerCertificate=true";
    private static final String DB_USER = "sa";
    private static final String DB_PASSWORD = "Password1!";
    private static final String DB_NAME = "ExampleDB";

    // Shared database connection
    private static Connection sharedConnection;

    public static void main(String[] args) throws Exception {
        // Ensure the database and table exist
        initializeDatabase();

        // Start Jetty server on port 8081
        Server server = new Server(8081);
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);

        // Register endpoints
        context.addServlet(new ServletHolder(new ReceiveDataServlet()), "/verb");
        context.addServlet(new ServletHolder(new QueryDataServlet()), "/verb/random");
        context.addServlet(new ServletHolder(new GetAllVerbsServlet()), "/verb/all");
        context.addServlet(new ServletHolder(new DeleteVerbServlet()), "/verb/delete");


        server.start();
        server.join();
    }

    private static void initializeDatabase() {
        try {
            // Establish the shared database connection
            sharedConnection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
    
            // Create database if it doesn't exist
            try (Statement stmt = sharedConnection.createStatement()) {
                String createDbSql = "IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = '" + DB_NAME + "') " +
                                     "CREATE DATABASE " + DB_NAME;
                stmt.execute(createDbSql);
                System.out.println("Database initialized.");
            }
    
            // Reconnect to the newly created database
            sharedConnection = DriverManager.getConnection(DB_URL + ";databaseName=" + DB_NAME, DB_USER, DB_PASSWORD);
    
            // Create table if it doesn't exist
            try (Statement stmt = sharedConnection.createStatement()) {
                String createTableSql = "IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='verb' AND xtype='U') " +
                                         "CREATE TABLE verb (" +
                                         "word VARCHAR(255) NOT NULL UNIQUE)";
                stmt.execute(createTableSql);
                System.out.println("Table 'verb' ensured.");
            }
    
            // Insert seed data if table is empty
            insertSeedData();
    
        } catch (SQLException e) {
            throw new RuntimeException("Failed to initialize database or table: " + e.getMessage(), e);
        }
    }
    
    private static void insertSeedData() {
        String[] seedVerbs = {"run", "code", "jump", "swim", "think", "write"};
    
        try {
            System.out.println("Checking for missing seed data...");
    
            for (String verb : seedVerbs) {
                // Debug: Check the current word
                System.out.println("Checking if '" + verb + "' exists in the database...");
    
                // Check if the word already exists
                try (PreparedStatement checkStmt = sharedConnection.prepareStatement("SELECT COUNT(*) FROM verb WHERE word = ?")) {
                    checkStmt.setString(1, verb);
                    ResultSet rs = checkStmt.executeQuery();
                    if (rs.next()) {  // Ensure we have a result
                        int count = rs.getInt(1);
    
                        if (count == 0) {
                            System.out.println("'" + verb + "' not found. Inserting...");
    
                            try (PreparedStatement insertStmt = sharedConnection.prepareStatement("INSERT INTO verb (word) VALUES (?)")) {
                                insertStmt.setString(1, verb);
                                insertStmt.executeUpdate();
                                System.out.println("Inserted: " + verb);
                            }
                        } else {
                            System.out.println("Skipping: '" + verb + "' (already exists)");
                        }
                    }
                }
            }
            System.out.println("Seeding process completed.");
        } catch (SQLException e) {
            System.err.println("Failed to insert seed data: " + e.getMessage());
        }
    }
    
    
    // Servlet to receive data from the front-end API and store it in SQL Server
    public static class ReceiveDataServlet extends HttpServlet {
        @Override
        protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
            // Parse JSON input
            BufferedReader reader = new BufferedReader(new InputStreamReader(req.getInputStream(), "utf-8"));
            StringBuilder jsonInput = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                jsonInput.append(line);
            }

            String input = jsonInput.toString();
            String receivedValue;

            try {
                // Extract the "word" value from JSON input (assumes {"word": "Verb_VALUE_TO_ADD_TOVERB_TABLE"})
                if (input.contains("\"word\"")) {
                    receivedValue = input.split("\"word\"\\s*:\\s*\"")[1].split("\"")[0];
                } else {
                    throw new IllegalArgumentException("Missing 'word' field");
                }
            } catch (Exception e) {
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JSON input");
                return;
            }

            // Store the value in SQL Server
            try (PreparedStatement stmt = sharedConnection.prepareStatement("INSERT INTO verb (word) VALUES (?)")) {
                stmt.setString(1, receivedValue);
                stmt.executeUpdate();

                resp.setContentType("application/json");
                resp.getWriter().println("{ \"status\": \"success\", \"storedValue\": \"" + receivedValue + "\" }");
            } catch (SQLException e) {
                resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Database error: " + e.getMessage());
            }
        }
    }

    // Servlet to query data stored in SQL Server and return results as JSON
    public static class QueryDataServlet extends HttpServlet {
        @Override
        protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
            String jsonResponse;

            try (Statement stmt = sharedConnection.createStatement()) {
                // Query to fetch a random record
                String query = "SELECT word FROM verb ORDER BY NEWID() OFFSET 0 ROWS FETCH NEXT 1 ROW ONLY"; // SQL Server specific
                try (ResultSet rs = stmt.executeQuery(query)) {
                    if (rs.next()) {
                        String word = rs.getString("word");
                        jsonResponse = "{ \"word\": \"" + word + "\" }";
                    } else {
                        jsonResponse = "{ \"error\": \"No data found\" }";
                    }
                }
            } catch (SQLException e) {
                jsonResponse = "{ \"error\": \"Database error: " + e.getMessage() + "\" }";
            }

            /// Set response content type and send JSON response
            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");
            resp.getWriter().println(jsonResponse);
        }
    }


    public static class GetAllVerbsServlet extends HttpServlet {
        @Override
        protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
            StringBuilder jsonResponse = new StringBuilder();
            jsonResponse.append("[");
    
            try (Statement stmt = sharedConnection.createStatement()) {
                String query = "SELECT word FROM verb ORDER BY word ASC";
                try (ResultSet rs = stmt.executeQuery(query)) {
                    boolean first = true;
                    int id = 1;
                    while (rs.next()) {
                        if (!first) {
                            jsonResponse.append(",");
                        }
                        String word = rs.getString("word");
                        jsonResponse.append("{\"word\":\"").append(word).append("\",\"id\":").append(id).append("}");
                        first = false;
                        id++;
                    }
                }
            } catch (SQLException e) {
                jsonResponse = new StringBuilder("{\"error\":\"Database error: " + e.getMessage() + "\"}");
            }
    
            jsonResponse.append("]");
    
            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");
            resp.getWriter().println(jsonResponse.toString());
        }

    }

     // Servlet to delete a word from the database using DELETE request
    public static class DeleteVerbServlet extends HttpServlet {
        @Override
        protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
            // Read JSON input
            BufferedReader reader = new BufferedReader(new InputStreamReader(req.getInputStream(), "utf-8"));
            StringBuilder jsonInput = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                jsonInput.append(line);
            }
    
            String input = jsonInput.toString();
            String wordToDelete;
    
            try {
                // Extract the "word" value from JSON input
                if (input.contains("\"word\"")) {
                    wordToDelete = input.split("\"word\"\\s*:\\s*\"")[1].split("\"")[0];
                } else {
                    throw new IllegalArgumentException("Missing 'word' field");
                }
            } catch (Exception e) {
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JSON input");
                return;
            }
    
            // Delete the word from the database
            try (PreparedStatement stmt = sharedConnection.prepareStatement("DELETE FROM verb WHERE word = ?")) {
                stmt.setString(1, wordToDelete);
                int affectedRows = stmt.executeUpdate();
    
                resp.setContentType("application/json");
                if (affectedRows > 0) {
                    resp.getWriter().println("{ \"status\": \"deleted\", \"word\": \"" + wordToDelete + "\" }");
                } else {
                    resp.getWriter().println("{ \"status\": \"not_found\", \"word\": \"" + wordToDelete + "\" }");
                }
            } catch (SQLException e) {
                resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Database error: " + e.getMessage());
            }
        }
    }
  }
