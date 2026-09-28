const express = require('express');
const router = express.Router();
let students = require('../data/students');

// GET /students - Get all students
router.get('/', (req, res) => {
  try {
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Server Error", message: error.message });
  }
});

// GET /students/:id - Get student by ID
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Server Error", message: error.message });
  }
});

// POST /students - Create new student
router.post('/', (req, res) => {
  try {
    const { name, age, grade } = req.body;

    if (!name || !age || !grade) {
      return res.status(400).json({ error: "Bad Request: name, age, and grade are required" });
    }

    const newStudent = {
      id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
      name,
      age,
      grade
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: "Server Error", message: error.message });
  }
});

// PUT /students/:id - Update student by ID
router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Student not found" });
    }

    const { name, age, grade } = req.body;
    
    if (!name && !age && !grade) {
      return res.status(400).json({ error: "Bad Request: At least one field is required to update" });
    }

    students[index] = {
      ...students[index],
      ...(name && { name }),
      ...(age && { age }),
      ...(grade && { grade })
    };

    res.status(200).json(students[index]);
  } catch (error) {
    res.status(500).json({ error: "Server Error", message: error.message });
  }
});

// DELETE /students/:id - Delete student by ID
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Student not found" });
    }

    students.splice(index, 1);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error", message: error.message });
  }
});

module.exports = router;
