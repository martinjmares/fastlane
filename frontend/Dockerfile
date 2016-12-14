FROM node:6.9.2

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Download libraries
COPY .* /usr/src/app/
COPY package.json /usr/src/app/
COPY bower.json /usr/src/app/
RUN npm install
RUN node_modules/.bin/bower install --allow-root

# Bundle app source
COPY . /usr/src/app

# Execute
EXPOSE 8080
ENV NODE_ENV production
CMD [ "npm", "start" ]
