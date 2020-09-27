FROM node:10

# Create app directory
WORKDIR /app
COPY . .

# global install & update
RUN npm install
RUN npm run build

EXPOSE 8080

# start command
CMD ["npm", "start"]