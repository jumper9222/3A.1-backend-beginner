import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function BlogPostModal({ show, handleClose, post }) {
    const navigate = useNavigate()

    const handleFullscreen = () => {
        navigate(`/posts/${post.post_id}`)
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                centered
            >
                <Modal.Header className="d-flex flex-column">
                    <Modal.Title>{post.title}</Modal.Title>
                    {post.subtitle && <p className="mb-2 text-muted">{post.subtitle}</p>}
                </Modal.Header>
                <Modal.Body
                    className="d-flex flex-column"
                >
                    <p>{post.content}</p>
                    <Button className="align-self-end" variant="secondary" onClick={handleFullscreen}><i className="bi bi-fullscreen me-1"></i> Fullscreen</Button>
                </Modal.Body>
            </Modal>
        </>
    )
}