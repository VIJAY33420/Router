const express = require("express");

const app = express();

const users = [
  { id: 1, name: "Arjun", role: "student" },
  { id: 2, name: "Priyesha", role: "mentor" },
  { id: 3, name: "tulya", role: "student" },
  { id: 4, name: "sai", role: "mentor" }

];

app.get("/", (req, res) => {
  res.send("fggtghh");
});

app.get("/users", (req, res) => {
  res.status(200);
  res.json(users);
});

app.get("/users/:id", (req, res) => {
    console.log(req.params)
  const userId = Number(req.params.id);
  console.log(userId)
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

app.use(express.json());

app.post("/users", (req, res) => {
    console.log(req.params)
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    role: req.body.role
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});