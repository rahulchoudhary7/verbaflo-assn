# Use the official Node.js image from the Docker Hub
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY client/package.json client/package-lock.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY client/ .

# Expose port 5173 for Vite
EXPOSE 5173

# Command to run the Vite development server
CMD ["npm", "run", "dev"]
