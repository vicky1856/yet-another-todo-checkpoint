import { useState, useEffect } from 'react';
// import { Todo } from '../../server/models/Todo';

const API_BASE = 'http://localhost:3002';

function App() {
    const [todos, setTodos] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        GetTodos();
    }, [todos]);

    const GetTodos = () => {
        fetch(API_BASE + "/todos")
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.log("Error: ", err));
    }

    const completeTodo = async id => {
        // console.log('client1');
        const data = await fetch(API_BASE + "/todo/complete/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                complete: !todos.complete
            })
        })
            .then(res => res.json())

        setTodos(todos => todos.map(todo => {
            if (todo._id === data._id) {
                todo.complete = data.complete;
            }
            // console.log('client2');
            return todo;
        }));
        // setrender(!render);
    }

    const deleteTodo = async id => {
        const data = await fetch(API_BASE + "/todo/delete/" + id, {
            method: "DELETE"
        }).then(res => res.json());

        setTodos(todos => todos.filter(todo => todo._id !== data._id));
    }

    const addTodo = async () => {
        const data = await fetch(API_BASE + "/todo/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: newTodo
            })
        })
        setTodos(todos => [...todos, data]);
        console.log('pop down');
        setPopupActive(false);
        setNewTodo("");
    }




    return (
        <div className="App">
            <h1>Howdy!</h1>
            <h4>Your tasks for the day:</h4>

            <div className="todos">
                {todos.map(todo => (

                    <div className={
                        "todo " + (todo.complete ? "is-complete" : "")}
                        key={todo._id} onClick={() => completeTodo(todo._id)}>

                        <div className="checkbox"></div>

                        <div className="text">{todo.text}</div>

                        <div className="delete-todo" onClick={() => deleteTodo
                            (todo._id)}>x</div>
                    </div>
                ))}
            </div>


            <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

            {popupActive ? (
                <div className="popup">
                    <div className="closePopup" onClick={() => setPopupActive
                        (false)}>x</div>
                    <div className="content">
                        <h3>Add Task</h3>
                        <input type="text"
                            className='add-todo-input'
                            onChange={e => setNewTodo(e.target.value)}
                            value={newTodo} />
                        <div className="button" onClick={addTodo}>Create Task</div>

                    </div>
                </div>
            ) : ''}
        </div>
    );
}

export default App;
