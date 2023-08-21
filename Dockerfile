# This line specifies the base image for your Docker image.
FROM node:alpine
# This sets the working directory inside the container to /app.
# All subsequent commands will be executed relative to this directory.
WORKDIR /app
# This copies the package.json file from the current directory (your project directory) into the /app directory in the container.
COPY package.json ./
# same as line above
COPY package-lock.json ./
# This line copies all the files and directories from the current directory (your project directory) into the /app directory in the container.
COPY . .
# This command runs the npm command inside the container to install the project dependencies based on the package.json file.
RUN npm i --legacy-peer-deps
# This instruction informs Docker that the container will listen on port 3000
EXPOSE 3000
# This sets the default command to be executed when the container starts.
CMD ["npm", "run", "start"]


# PRODUCTION

# FROM node:15-alpine AS builder
# WORKDIR /app
# COPY package.json package.json
# RUN npm install
# COPY . .
# RUN npm run build
# FROM nginx:alpine
# WORKDIR /usr/share/nginx/html
# RUN rm -rf *
# COPY --from=builder /app/dist .
# ENTRYPOINT ["nginx", "-g", "daemon off;"]