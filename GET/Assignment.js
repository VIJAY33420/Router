const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors())

    const students = [
  {
    id: 1,
    name: "Aarav Sharma",
    branch: "CSE",
    semester: 8,
    cgpa: 9.3
  },
  {
    id: 2,
    name: "Ishita Verma",
    branch: "IT",
    semester: 7,
    cgpa: 8.9
  },
  {
    id: 3,
    name: "Rohan Kulkarni",
    branch: "ECE",
    semester: 6,
    cgpa: 8.4
  },
  {
    id: 4,
    name: "Meera Iyer",
    branch: "CSE",
    semester: 8,
    cgpa: 9.1
  },
  {
    id: 5,
    name: "Kunal Deshmukh",
    branch: "IT",
    semester: 5,
    cgpa: 7.8
  },
  {
    id: 6,
    name: "Ananya Reddy",
    branch: "CSE",
    semester: 6,
    cgpa: 8.7
  },
  {
    id: 7,
    name: "Vikram Patil",
    branch: "ECE",
    semester: 7,
    cgpa: 8.2
  },
  {
    id: 8,
    name: "Priyanka Nair",
    branch: "AI",
    semester: 4,
    cgpa: 8.8
  },
  {
    id: 9,
    name: "Harsh Mehta",
    branch: "Data Science",
    semester: 5,
    cgpa: 8.0
  },
  {
    id: 10,
    name: "Neha Gupta",
    branch: "CSE",
    semester: 6,
    cgpa: 7.9
  }
];


app.get("/students", (req, res) => {
  res.status(200);
  res.json(students);
});





app.get('/students/topper', (req, res) => {
    if (!students || students.length === 0) {
        return res.status(404).json({ message: "No students found" });
    }

    const topper = students.reduce((highest, student) => {
        return student.cgpa > highest.cgpa ? student : highest;
    });

    return res.status(200).json(topper);
});





app.get('/students/average', (req, res) => {
    if (!students || students.length === 0) {
        return res.status(404).json({ message: "No students found" });
    }

    const total = students.reduce((sum, student) => {
        return sum + student.cgpa ;
        
    },0);
    const average = total / students.length;

    return res.status(200).json({average : average});
});





app.get('/students/count', (req, res) => {
    if (!students || students.length === 0) {
        return res.status(404).json({ message: "No students found" });
    }

    const total = students.reduce((sum, student) => {
        return sum + student.cgpa;
        
    },0);
    const count = students.length;

    return res.status(200).json({
        count,
        totalGrades: total,
        average: total / count
    });
});





app.get("/students/:id", (req, res) => {
    console.log(req.params)
  const userId = Number(req.params.id);
  console.log(userId)
  const user = students.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});




app.get("/students/branch/:branchName", (req, res) => {
  const branchName = req.params.branchName;

  const filteredStudents = students.filter(
    student => student.branch.toLowerCase() === branchName.toLowerCase()
  );

  if (filteredStudents.length === 0) {
    return res.status(404).json({ message: "No students found for this branch" });
  }

  res.status(200).json(filteredStudents);
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});
