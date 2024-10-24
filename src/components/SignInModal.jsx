import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import useLocalStorage from 'use-local-storage';

export default function SignInModal({ show, handleClose }) {
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    const url = "http://localhost:3001"

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(null);

    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/login`, { username: email, password });
            if (res.data && res.data.auth === true && res.data.token) {
                console.log("login successful")
                console.log(res.data)
                setAuthToken(res.data.token)

            }
        } catch (error) {
            console.error("Error logging in:", error);
            setLoginFailed(true);
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header>
                    <Modal.Title>
                        Resume your Blogdot. Journey
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={loginHandler}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                className="mb-3"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                            {loginFailed && <Form.Text>Username or password is incorrect.</Form.Text>}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="d-flex flex-row justify-content-between">
                        <Button variant="light"><i className="bi bi-google me-2"></i>Sign in with Google</Button>
                        <Button type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}