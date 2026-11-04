# Stage 1: Build & Dependencies
FROM node:22-alpine AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files first to leverage Docker's cache layers
COPY package*.json ./

# Install all dependencies (including devDependencies if needed for building)
RUN npm ci

# Copy the rest of your application code
COPY . .

# Optional: If you use TypeScript or a bundler, run your build script here
# RUN npm run build

# Clean up devDependencies to keep the production layer slim
RUN npm prune --production


# Stage 2: Production Runtime
FROM node:22-alpine AS production

# Apply a secure environment configuration
ENV NODE_ENV=production

WORKDIR /usr/src/app

# Copy only the production node_modules and built code from the build stage
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/ .

# Use the pre-existing, unprivileged 'node' user for security
USER node

# Expose the port your Node app listens on (e.g., 3000)
EXPOSE 3000

# Start the application using the optimal array syntax
CMD ["node", "app.js"]
