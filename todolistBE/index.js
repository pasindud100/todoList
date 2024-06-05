const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require('./Models/TodolistModel.js');

const app = express();
app.use(cors());
app.use(express.json());

const mongoDBURL = "mongodb+srv://pasindu:1999@cluster0.keoqtcr.mongodb.net/todolistDB?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoDBURL).then(() => {
    console.log("DB connected successfully");
});

// Define the get route to get all inserted todos
app.get('/get', (req, res) => {
    TodoModel.find().then(result => res.json(result))
    .catch(err => res.json(err));
});

// Define the POST route to create a todo
app.post('/add', (req, res) => {
    const task = req.body.task;

    TodoModel.create({ task: task }).then((result) => {
        res.json(result);
    }).catch(err => res.json(err));
});

// Define the PUT route to update a todo by ID
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, { done: true })
    .then(result => {
        res.json(result); })
.catch(err => res.status(500).json(err));
});

app.delete('/delete/:id',(req,res)=>{
    const { id } = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => {
            res.json(result); })
    .catch(err => res.status(500).json(err));
})


const PORT = process.env.PORT || 8060;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
