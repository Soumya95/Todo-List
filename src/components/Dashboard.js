import React, { useState, useEffect } from 'react';
import { Card, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useAuth } from '../Context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Todo from './todoList/Todo';
import "./Dashboard.css";
import axios from 'axios';

export default function Dashboard() {

    const [error, setError] = useState('');
    const { logOut, currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    function FormTodo({ addTodo }) {
        const [value, setValue] = React.useState("");

        const handleSubmit = e => {
            e.preventDefault();
            if (!value) return;
            addTodo(value);
            setValue("");
        };

        return (
            <Form className="mb-4" onSubmit={handleSubmit}>
                <InputGroup >
                    <FormControl type='text' className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </InputGroup>
            </Form>
        );
    }

    async function handleLogOut(e) {
        e.preventDefault();

        try {
            setError('');
            await logOut();
            navigate("/signin");
        }
        catch (e) {
            console.log(e);
            setError('Failed to logOut');
        }
    }

    const [todos, setTodos] = React.useState([]);

    const updateData = () => {
        axios.get(`https://asia-southeast2-react-todo-4f728.cloudfunctions.net/api/gettodo?userHandle=${currentUser.uid}`)
        .then(result => setTodos(result.data));   
    }

    useEffect(() => {
        updateData();        
    }, []);

    useEffect(() => {
        let temp = location && location.state && location.state.bNewUser;
        navigate('/',{replace: true, state: {undefined}})
        if (temp) {
            ["1st Todo","2nd Todo","3rd Todo"].forEach(elm => {
                axios.post(`https://asia-southeast2-react-todo-4f728.cloudfunctions.net/api/todo?body=${elm}&userHandle=${currentUser.uid}`)
                .then(() => console.log("New user with default Todos"))
                .catch((e) => console.error(e))
                .finally(() => {updateData();});
            })
        }
    }, [true])


    const addTodo = body => {
        axios.post(`https://asia-southeast2-react-todo-4f728.cloudfunctions.net/api/todo?body=${body}&userHandle=${currentUser.uid}`)
        .then(() => updateData())
        .catch((e) => console.error(e));
    };

    const markTodo = todo => {
        axios.post(`https://asia-southeast2-react-todo-4f728.cloudfunctions.net/api/markTodo?todoId=${todo.todoId}`)
        .then(() => updateData())
        .catch((e) => console.error(e));
    };

    const editTodo = (body, todo) => {
        axios.post(`https://asia-southeast2-react-todo-4f728.cloudfunctions.net/api/update?todoId=${todo.todoId}&body=${body}`)
        .then(() => updateData())
        .catch((e) => console.error(e));
    }

    const removeTodo = todo => {
        axios.delete("https://asia-southeast2-react-todo-4f728.cloudfunctions.net/api/todo",{
            data: {
                todoId: todo.todoId 
            }
        }).then(() => updateData())
        .catch((e) => console.error(e));
    };

    return (
        <>
            <div className="w-100 text-end mt-2">
                <Button variant="link" onClick={handleLogOut}>Log Out</Button>
            </div>
            <div className="app">
                <div className="container">
                    <h1 className="text-center mb-4">Todo List for {currentUser.email}</h1>
                    <FormTodo addTodo={addTodo} />
                    <div>
                        {todos.map((todo, index) => (
                            <Card key={index}>
                                <Card.Body>
                                    <Todo
                                        key={index}
                                        index={index}
                                        todo={todo}
                                        markTodo={markTodo}
                                        removeTodo={removeTodo}
                                        editTodo={editTodo}
                                    />
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
