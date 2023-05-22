
import express from 'express';
import { getData,newTodo, todoDelete, updateStatus } from './models/Routes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/todos',async (req,res)=>{
    const displayData=await getData();
    res.send(displayData);
})
app.post('/todo/new', (req,res)=>{
    let sub = req.body.text;
    let data={
        text:sub,
        complete:false
    }
    const display=newTodo(data);
    res.send(display);
})
app.delete('/todo/delete/:id', (req,res)=>{
    let id=req.params.id;
    const del = todoDelete(id);
    res.send(del);
})

app.put('/todo/complete/:id',async (req,res)=>{
    const id=req.params.id;
    const status=req.body.complete;
    console.log('complete');
    const change={complete:status};
    const updatedOne=await updateStatus(id,change);
    console.log(updatedOne);
    res.send(updatedOne);
})

app.listen(3002,()=> console.log('server running on 3002'));
// Connect to MongoDB database using mongoose 

// import the schema from './models/Todo.js'

/*
the below API endpoint should return all the todos in the todos.json file
Sample response:
[
    {
        "id": 1,
        "text": "Learn React",
        "complete": false
    },
    {
        "id": 2,
        "text": "Learn Node",
        "complete": false
    },   
    ]
*/


// the below API endpoint should add a new todo to the todos.json file
/*
Request:
POST /todo/new
Sample request body:
{
    "text": "Learn Express"
}
Sample response:
{
    "id": 3,
    "text": "Learn Express",
    "complete": false
}
*/


// the below API endpoint should delete a todo from the todos.json file
/*
Sample request:
DELETE /todo/delete/1
Sample response:
{
    "id": 1,
    "text": "Learn React",
    "complete": false
}
*/


// the below API endpoint should toggle the complete status of a todo in the todos.json file
/*
Sample request:
PUT /todo/complete/1
Sample response:
{
    "id": 1,
    "text": "Learn React",
    "complete": true
}
*/

