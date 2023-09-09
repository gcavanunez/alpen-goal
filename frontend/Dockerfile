# setting the base image
FROM node:18-alpine

# sets the docker working directory to
WORKDIR /app

# copies the package.json and package-lock.json files to the container
COPY package*.json ./

# installs dependencies
RUN npm install

# copies the rest of the files to the container
COPY . .

# exposes the port
EXPOSE 8000

# starts dev server
CMD ["npm", "run", "dev"]
