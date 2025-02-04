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
                                         "word VARCHAR(255) NOT NULL)";
                stmt.execute(createTableSql);
                System.out.println("Table 'verb' ensured.");
            }

        } catch (SQLException e) {
            throw new RuntimeException("Failed to initialize database or table: " + e.getMessage(), e);
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
}
