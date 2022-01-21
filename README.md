# form-validation-fullstack
 A fullstack form validation made with react, NodeJS, express, mongoDB, and JWT
 
 # instructions

- Inside the folder "API" rename the file "example.env" to ".env"
- Create an account or login in MongoDB Atlas https://www.mongodb.com/atlas/database
- Create a Cluster
- Connect to your cluster using the "Connect your application" option
- Go to "Database Access" and create a user and password for your cluster
- Go to "Network Access" and allow your current ip address
- In the ".env" file, paste: mongodb+srv://{username}:{password}@users.o9xmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
- Change {username} and {password} to the user and password that you have created \
Example: mongodb+srv://myclusterusername:myclusterpassword@users.o9xmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
- Inside the API folder, run the command "node index.js", to start the server
- Open another terminal and get into client folder
- Run "yarn start" (or npm) and wait until the webpage tab is completely loaded
