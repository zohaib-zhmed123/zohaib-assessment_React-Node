# Step 1: Build the React application
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the app with nginx
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the Docker host, so we can access it
# from the outside.
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]