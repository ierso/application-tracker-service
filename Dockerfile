# Use the official PostgreSQL image from the Docker Hub
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_DB mydatabase
ENV POSTGRES_USER myuser
ENV POSTGRES_PASSWORD mypassword

# Expose the default PostgreSQL port
EXPOSE 5432

# The default command to run when the container starts
CMD ["postgres"]
