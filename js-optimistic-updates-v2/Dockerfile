# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to the root of the project
WORKDIR /

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application files to the container
COPY . .

# Expose the port that the application will be running on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
