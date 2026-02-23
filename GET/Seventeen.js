const express = require("express");

const app = express();

app.use(express.json());

const users = [
  { attendance : 80, uid: 108243 , total_Sub : 14, bonus: 20, name: "Dax"},
  { attendance : 75, uid: 108535 , total_Sub : 14, bonus: 10, name: "Manan"},
  { attendance : 94, uid: 108513 , total_Sub : 14, bonus: 16, name: "Pal"},
  { attendance : 92, uid: 108240 , total_Sub : 14, bonus: 19.5, name: "Mann"}

];




app.get("/users", (req, res) => {
  res.status(200);
  res.json(users);
});





app.get("/users/:uid", (req, res) => {
    console.log(req.params)
  const userId = Number(req.params.uid);
  console.log(userId)
  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});






app.post("/users", (req, res) => {
    console.log(req.params)
  const newUser = {
    uid: req.body.uid,
    name: req.body.name,
    attendance: req.body.attendance,
    total_Sub: req.body.total_Sub,
    bonus: req.body.bonus

  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser
  });
});




app.put("/user/:uid", (req, res) => {
  console.log("uid: ",req.params);
  const userId = Number(req.params.uid);
  console.log(userId);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    uid: userId,
    name: req.body.name,
    attendance: req.body.attendance,
    total_Sub: req.body.total_Sub,
    bonus: req.body.bonus
  };

  res.status(200).json({
    message: "User replaced",
  });
});





app.delete("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).end();
});




app.patch("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.name) user.name = req.body.name;

  res.status(200).json({
    message: "User updated",
    user
  });
});



app.listen(3000, () => {
  console.log("Server started on port 3000");
});