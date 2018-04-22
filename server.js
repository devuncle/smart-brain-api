const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

let datebase = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@163.com",
      password: 'cookies',
      entries: 5,
      joined: new Date()
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ],
  login:[
      {
        id: "123",
        hash: '',        
        email: "john@163.com"
      },
      {
        id: "124",
        hash: '',        
        email: ""
      },
  ]
};



app.get("/", (req, res) => {
//   res.send("this is working");
  res.send(datebase.users);
});



app.post("/signin", (req, res) => {
  if (req.body.email === "john@163.com" && req.body.password === "cookies") {
    res.json("success");
  } else {
    res.status(400).json("err password");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash);
});
  datebase.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  res.json(datebase.users[2]);
});

app.get('/profile/:id', (req,res)=>{
    const {id} = req.params;
    let isFound = false;
    datebase.users.forEach(user => {
        if (user.id === id) {
            isFound = true;
            return res.json(user);
        } 

    })
    if (!isFound) {
        res.status(404).json('no such user');
    }
})

app.put('/image', (req,res)=> {
    const {id} = req.body;
    let isFound = false;
    datebase.users.forEach(user => {
        if (user.id === id) {
            isFound = true;
            user.entries++;
            return res.json(user.entries);
        } 

    })
    if (!isFound) {
        res.status(404).json('no such user');
    }
})


 
// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
  console.log("app is running.");
});
