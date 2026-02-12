# Use official Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build (if Next.js)
RUN npm run build

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]