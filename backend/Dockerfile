# setting the base image
FROM node:18-alpine

# installs nodemon globally to be able to reload the server on changes in development
RUN npm install -g nodemon

# sets the docker working directory
WORKDIR /app

# copies the package.json and package-lock.json files to the container
COPY package*.json ./

# installs dependencies
RUN npm install

# copies the rest of the files to the container
COPY . .

# exposes the port
EXPOSE 5000

# starts dev server
CMD ["npm", "start"]