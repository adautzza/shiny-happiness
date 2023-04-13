# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set the environment variable for the application
ENV NODE_ENV production

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
