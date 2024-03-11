#runing command: docker run -p 8080:8080 git-app-image5

# Use the official Node.js image as parent image
FROM node:16

# Set the working directory. If it doesn't exists, it'll be created
WORKDIR /app

# Define the env variable `PORT`
ENV PORT 8080

# Expose the port 3000
EXPOSE ${PORT}

# Set the MONGO_URI environment variable
ENV MONGODB_URI='mongodb://host.docker.internal:27017/usersDB'

# Copy the file `package.json` from current folder
# inside our image in the folder `/app`
COPY package*.json /app

# Install the dependencies
RUN npm install

# Copy all files from current folder
# inside our image in the folder `/app`
COPY . . /app

# Start the app
CMD ["node", "app.js"]



# Command to build img
# docker build --tag git-app-image .

#Command to run the img on port 8080
# docker run -p 8080:8080 git-app-image

# to stop running
# open a new terminal and run these 2 programs
# docker stop
# docker stop <id>


