import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signIn } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await signIn(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        }
        catch {
            setError('Failed to logged into account');
        }

        setLoading(false);
    }

    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign In</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Button className="w-100" disabled={loading} type="submit">
                                Sign In
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </Container>
    )
}
