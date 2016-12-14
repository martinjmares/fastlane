FROM redis:3.2.1

# Create app directory
RUN mkdir -p /usr/src/db
WORKDIR /usr/src/db

# Bundle app source
COPY . /usr/src/db

# Execute
EXPOSE 8080
CMD [ "./redis-main.sh" ]
