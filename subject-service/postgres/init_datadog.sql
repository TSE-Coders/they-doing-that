-- init_datadog.sql

-- Create the Datadog user and grant permissions
CREATE USER datadog WITH PASSWORD 'password';
GRANT pg_monitor TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;

-- Create the pg_stat_activity function
CREATE FUNCTION pg_stat_activity() 
RETURNS SETOF pg_catalog.pg_stat_activity AS
$$ 
    SELECT * FROM pg_catalog.pg_stat_activity; 
$$
LANGUAGE sql VOLATILE SECURITY DEFINER;

-- Create a view for Datadog to access pg_stat_activity
CREATE VIEW pg_stat_activity_dd AS 
SELECT * FROM pg_stat_activity();

-- Grant Datadog user access to the new view
GRANT SELECT ON pg_stat_activity_dd TO datadog;
