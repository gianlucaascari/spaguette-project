# --- STAGE 1: The "Builder" ---
# Use an official Node.js image. '18-alpine' is a good balance of features and size.
# This 'builder' stage will install all dependencies (dev included) and run your build script.
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json from your 'backend' folder
# This is relative to the build context (your monorepo root)
COPY back-end/package.json back-end/package-lock.json ./

# Install all dependencies using 'npm ci' (Clean Install)
# This is faster and more reliable for CI than 'npm install'
RUN npm ci

# Copy the rest of your backend source code
COPY back-end/ ./

# Run your build script (e.g., 'npm run build' for TypeScript)
RUN npm run build

# --- STAGE 2: The "Production" Image ---
# Start from a slim, secure image for the final container
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy the package files from your 'backend' folder again
COPY back-end/package.json back-end/package-lock.json ./

# Install *only* the production dependencies
RUN npm install --production --frozen-lockfile

# --- [!! ACTION REQUIRED !!] ---
# Copy the compiled code from the 'builder' stage.
# You MUST check your 'package.json' build script to see what folder
# your code is built into. It's usually 'build' or 'dist'.
#
# IF YOUR BUILD FOLDER IS 'dist', CHANGE THE LINE BELOW TO:
# COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist ./dist

# Create a dedicated, non-root user for security
RUN addgroup --system nodejs && adduser --system --ingroup nodejs nodejs
USER nodejs

# --- [!! ACTION REQUIRED !!] ---
# Expose the port your application runs on.
# Replace '4000' with your application's port (e.g., 3000, 8080)
EXPOSE 4000

# The command to start your app.
# This will run the 'start' script from your 'backend/package.json'
CMD [ "npm", "run", "start" ]