FROM node:6.9.2

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Download libraries
COPY package.json /usr/src/app/
COPY bower.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
ENV NODE_ENV production
CMD [ "npm", "start" ]
