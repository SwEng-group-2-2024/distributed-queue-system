FROM node:18

# Workdir
WORKDIR /code

# Copy dir
COPY . . 

# Install dependencies
WORKDIR /code
RUN npm ci --omit=dev

EXPOSE 3000
CMD [ "npm", "start" ]
