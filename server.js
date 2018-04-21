const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

let datebase = {
  users: [
    {
      id: "123",
      name: "John",
      email: "John@163.com",
      password: "cookies",
      entries: 5,
      joined: new Date()
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
//   res.send("this is working");
  res.send(datebase.users);
});

app.post("/signin", (req, res) => {
  if (req.body.email === "john@163.com" && req.body.password === "cookies") {
    res.json("OK! susscess");
  } else {
    res.status("400").json("err password");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
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

app.listen(3000, () => {
  console.log("app is running.");
});
