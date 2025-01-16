# Step 1: Build the React app
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . ./

# Build the React app
RUN npm run build

# Step 2: Serve the app with nginx
FROM nginx:alpine

# Copy the build folder from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port nginx is running on
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
