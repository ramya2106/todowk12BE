const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Todo = require("./models/Todo");

const app = express();

app.use(cors());
app.use(express.json());

console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
   console.log("MongoDB Connected");
})
.catch(err=>{
   console.log(err);
});

app.post("/todos", async(req,res)=>{

   const todo = await Todo.create({
      task:req.body.task
   });

   res.json(todo);
});

app.get("/todos", async(req,res)=>{

   const todos = await Todo.find();

   res.json(todos);
});

app.put("/todos/:id", async(req,res)=>{

   const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        task:req.body.task
      },
      {
        new:true
      }
   );

   res.json(updated);
});

app.delete("/todos/:id", async(req,res)=>{

   await Todo.findByIdAndDelete(
      req.params.id
   );

   res.json({
      message:"Deleted"
   });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
   console.log(`Server Running on ${PORT}`);
});