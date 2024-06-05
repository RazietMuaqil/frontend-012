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

# Stage 2: Serve the React application using Node.js
FROM node:18 AS serve

# Set the working directory
WORKDIR /app

# Copy the built React application from the previous stage
COPY --from=build /app/build ./build

# Expose the port that Node.js will run on
EXPOSE 3000

# Command to run the React application
CMD ["npm", "start"]
