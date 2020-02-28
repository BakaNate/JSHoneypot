FROM node:10

#RUN apt update && apt install -y nodejs npm
#RUN mongod &
#RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 4B7C549A058F8B6B
#RUN echo "deb http://repo.mongodb.org/apt/debian "$(lsb_release -sc)"/mongodb-org/4.2 main" | tee /etc/apt/sources.list.d/mongodb.list
#RUN apt update
#RUN apt install -y mongodb-org
#RUN service mongod start

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
#EXPOSE 27017
CMD [ "npm", "start" ]
