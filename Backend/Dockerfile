# Use an official Python runtime as a parent image
FROM python:3.11

# Set env vars
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container to /app
WORKDIR /Backend

# Add the current directory contents into the container at /app
ADD . /Backend

# Install any needed packages specified in requirements.txt
COPY requirements.txt /Backend/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY . /Backend/

# Make port 4000 available to the world outside this container
EXPOSE 4000