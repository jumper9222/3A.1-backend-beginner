import { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

export default function SignUpModal({ show, handleClose }) {
    const url = "https://blog-auth-app.vercel.app"

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(null);
    const [invalidPassword, setInvalidPassword] = useState(null);

    useEffect(() => {
        if (password && confirmPassword && password !== confirmPassword) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
        }
    }, [password, confirmPassword])

    useEffect(() => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        if (password && !passwordRegex.test(password)) {
            setInvalidPassword(true);
        } else {
            setInvalidPassword(false);
        }
    })

    const handleSignup = async (e) => {
        e.preventDefault();
        if (passwordsMatch) {
            try {
                const res = await axios.post(`${url}/signup`, { username: email, password });
                console.log(res.data);
                handleClose();
            } catch (error) {
                console.error(error.response.data.message);
            }
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header>
                    <Modal.Title>Your Blogdot. Journey Starts Here</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSignup}>
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
                                className="mb-2"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                            <Form.Text className="danger">
                                {invalidPassword === true && <p>Password must contain the following: <br />- One upper case character<br />- One lower case character<br />- One digit<br />- One special character<br />- At least 8 characters</p>}
                            </Form.Text>
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                            />
                            <Form.Text>
                                {passwordsMatch === false && <p>Passwords do not match</p>}
                            </Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="d-flex flex-row justify-content-between">
                        <Button variant="light"><i className="bi bi-google me-2"></i>Register with Google</Button>
                        <Button type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}