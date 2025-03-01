# Use Node.js base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port (make sure it matches your backend server's port)
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
