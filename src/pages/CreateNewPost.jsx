import { useEffect, useState } from 'react';
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { savePost } from '../features/posts/postsSlice';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

export default function CreateNewPost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    useEffect(() => {
        if (authToken === "") {
            navigate("/")
        }
    }, [authToken, navigate])

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [content, setContent] = useState("");

    const fControlStyle = {
        border: 0,
        boxShadow: "none"
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { title, subtitle, content }
        dispatch(savePost(data))
        setTitle("")
        setSubtitle("")
        setContent("")
        navigate("/dashboard")
    }

    return (
        <Container className='my-3'>
            <h1 className='mb-3'>Create a new post</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        style={fControlStyle}
                        type="text"
                        size='lg'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title..."
                    />
                    <Form.Control
                        style={fControlStyle}
                        type="text"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        placeholder="Subtitle..."
                    />
                    <hr />
                    <Form.Control
                        style={fControlStyle}
                        as="textarea"
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your blogpost here..."
                    />
                </Form.Group>
                <Button className='my-3' type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}