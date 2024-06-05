# Stage 1: Build the React application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the React application using serve
FROM node:18-alpine

# Install serve globally
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the built React application from the previous stage
COPY --from=build /app/build ./build

# Expose the port that serve will run on
EXPOSE 8080

# Command to run the React application
CMD ["serve", "-s", "build", "-l", "8080"]
