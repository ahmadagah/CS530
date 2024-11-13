# Use the latest version of Python slim image
FROM python:slim-bullseye

# Specify the maintainer
LABEL maintainer="agah@pdx.edu"

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install required packages and create a virtual environment
RUN apt-get update -y && \
    apt-get install -y python3-venv && \
    python3 -m venv /app/venv && \
    . /app/venv/bin/activate && \
    pip install --upgrade pip && \
    pip install -r requirements.txt

# Expose the application port (Cloud Run expects port 8080)
EXPOSE 8080

# Run the app using Gunicorn with the virtual environment activated
CMD ["/bin/sh", "-c", ". /app/venv/bin/activate && exec gunicorn --bind 0.0.0.0:8080 --workers 1 --threads 8 app:app"]
