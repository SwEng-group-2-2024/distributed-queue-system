FROM node:18

WORKDIR /code/backend

# Copy cwd to docker
COPY . . 

RUN npm ci --omit=dev

# api uses 4000
EXPOSE 4000

# Run command when docker run
CMD ["node", "index.js"]
