#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	create user admin createdb encrypted password '${ADMIN_PASSWORD}';
    create database indexer with owner = admin;
    create database indexer_shadow with owner = admin;
EOSQL
