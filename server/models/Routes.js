import { Todo } from "./Todo.js";

export async function getData () {
    let displayData= await Todo.find();
    return displayData;
}
export function newTodo(str){
     const newTodo= new Todo(str);
    //  console.log(newTodo);
     newTodo.save()
     .then(data=>{
         console.log('data saved');
     })
     .catch(err=>{
         console.log('Error');
     })
}

export async function todoDelete(id){
   let deleteData = await Todo.findByIdAndRemove(id)
   return deleteData;
}

export function updateStatus(id,change){
   let updated= Todo.findOneAndUpdate({"_id":id},change,{"new":true});
   return updated;
}