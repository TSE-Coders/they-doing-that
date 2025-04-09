

-- Create the Datadog user and grant permissions
create user datadog with password 'password';
grant pg_monitor to datadog;
grant SELECT ON pg_stat_database to datadog;

\c postgres

GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO datadog;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO datadog;

GRANT pg_monitor TO datadog;
