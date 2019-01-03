FROM node:10

# Create app directory
ADD . /src
WORKDIR /src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --only=production

EXPOSE 3000
CMD [ "npm", "start" ]