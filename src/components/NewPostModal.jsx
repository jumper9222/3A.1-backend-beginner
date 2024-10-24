import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import "../App.css";
import { useDispatch } from "react-redux";
import { savePost } from "../features/posts/postsSlice";

export default function NewPostModal({ show, handleClose }) {
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [content, setContent] = useState("")

    const dispatch = useDispatch();

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
        handleClose();
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                size="lg"
                centered
            >
                <Form onSubmit={handleSubmit}>
                    <Modal.Header className="d-flex flex-column">

                        <Form.Control
                            style={fControlStyle}
                            size="lg"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Enter post title..."
                        />


                        <Form.Control
                            style={fControlStyle}
                            text="text"
                            value={subtitle}
                            onChange={e => setSubtitle(e.target.value)}
                            placeholder="Enter post subtitle..."
                        />
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control
                            style={fControlStyle}
                            as="textarea"
                            rows={5}
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="Write your blogpost here..."
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Create Post</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}