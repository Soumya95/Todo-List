import React, { useState, useRef } from 'react';
import { Button, Form, Modal} from 'react-bootstrap';

export default function Todo({ todo, index, markTodo, removeTodo, editTodo }) {
    const [show, setShow] = useState(false);
    const updatedText = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div
            className="todo"

        >
            <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.body}</span>
            <div>
                { !todo.isDone && <Button variant="outline-success" onClick={() => markTodo(todo)}>✓</Button>}{' '}
                <Button variant="outline-danger" onClick={() => removeTodo(todo)}>✕</Button>{' '}
                <Button variant="outline-primary" onClick={() => handleShow()}>✎</Button>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Current Todo Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Control as="textarea" rows={3} defaultValue={todo.body} ref={updatedText} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {editTodo(updatedText.current.value, todo); handleClose()}}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}
