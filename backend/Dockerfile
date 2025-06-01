# Stage 1: Install production dependencies
FROM node:22-slim as deps

WORKDIR /app

COPY package*.json ./
RUN npm install --production && npm cache clean --force

# Stage 2: Minimal runtime image
FROM node:22-slim

WORKDIR /app

# Copy only production dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy app source and start script
COPY . .

# Make sure the script is executable
RUN chmod +x ./start.sh

EXPOSE 8080

CMD ["./start.sh"]
