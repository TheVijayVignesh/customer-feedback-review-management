# This Dockerfile simply extends the official Postgres image
# You can add initialization scripts or custom configuration here if needed.

FROM postgres:15-alpine

# Example environment variables (these can also be passed via docker-compose)
# ENV POSTGRES_USER=postgres
# ENV POSTGRES_PASSWORD=postgres
# ENV POSTGRES_DB=feedbackdb

# you may copy SQL or shell scripts into /docker-entrypoint-initdb.d/
# COPY ./init-db.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
