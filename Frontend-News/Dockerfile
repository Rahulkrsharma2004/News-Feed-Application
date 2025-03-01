# Use Node Alpine image
FROM node:18-alpine 

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build Vite app
RUN npm run build

# Serve frontend using a lightweight web server
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "5173"]

# Expose frontend port
EXPOSE 5173
