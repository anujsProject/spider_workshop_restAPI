/*-------------- 
Building a basic Rest API which includes all CRUD operations. 
It will be a code along with the audience.
---------------*/


const express = require("express");
//  Importing the express js module in our application


const bodyParser = require("body-parser");
//  This module helps us to parse the data which is sent the request body.


const fs = require("fs");
//  fs module provides us the methods from which we can access and modify system files.


const app = express();
/*  app is basically the main object which express provides, 
    and on this different kinds of methods are present which we can use to manage our application.
 */


app.use(bodyParser.json());
//  Allowing json type of data in the body of request object


const filePath = "./data/users.json";


//  Starting the Server on port 3000
//  Port is logical address of a service. It helps us to identify the service running on a machine.
app.listen(3000, () => {
  console.log("Server started at 3000");
});



//  Whenever the request will for this endpoint, i.e "/", then the callback method will be called.
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Rest API",
  });
});


//  Handling Get Request of all users
const getAllUsers = (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
    }

    res.status(200).send(JSON.parse(data));
  });
};

app.get("/users", getAllUsers);
/* ---------------------------------------------  */



//  Handling Post request
const createUser = (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
    }

    data = JSON.parse(data);
    const newUserId = Date.now().toString();

    data[newUserId] = req.body;
    console.log(data);

    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (!err) res.status(200).send("New user added");
    });
  });
};

/* 
Whenever the request will for the endpoint, "/users" with POST method
then createUser will be called and a new user will be created in the database.
*/
app.post("/users", createUser);
/* ---------------------------------------------  */



//  Handling Get request of Single user
const getUser = (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
    }

    data = JSON.parse(data);

    const userId = req.params.userId;
    res.status(200).send(data[userId]);
  });
};

app.get("/users/:userId", getUser);
/* ---------------------------------------------  */



//  Handling Patch request
const updateUser = (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
    }
    data = JSON.parse(data);

    const userId = req.params.userId;
    console.log(userId);

    data[userId] = req.body;
    console.log(data);

    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (!err) res.status(200).send("User Updated");
    });
  });
};

app.patch("/users/:userId", updateUser);
/* ---------------------------------------------  */



//  Handling Delete Request
const deleteUser = (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
    }
    data = JSON.parse(data);

    const userId = req.params.userId;

    delete data[userId];
    console.log(data);

    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if (!err) res.status(200).send("User Deleted");
    });
  });
};

app.delete("/users/:userId", deleteUser);
/* ---------------------------------------------  */



