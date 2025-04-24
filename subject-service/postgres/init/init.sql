DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT
      FROM   pg_catalog.pg_user
      WHERE  usename = 'subject') THEN

      CREATE ROLE subject WITH LOGIN PASSWORD 'password';
      ALTER ROLE subject CREATEDB;
   END IF;
END
$$;

DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT
      FROM   pg_database
      WHERE  datname = 'subject-db') THEN

      CREATE DATABASE "subject-db" OWNER subject;
   END IF;
END
$$;
