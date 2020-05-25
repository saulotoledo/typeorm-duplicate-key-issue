#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE database_test;
    GRANT ALL PRIVILEGES ON DATABASE database_test TO postgres;
EOSQL
