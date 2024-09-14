# Use the official Python image from the Docker Hub
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt ./

# Install dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY / .

# Expose the port on which the app will run
EXPOSE 5000

# Command to run the application
CMD ["gunicorn", "app:app", "-b", "0.0.0.0:5000"]
