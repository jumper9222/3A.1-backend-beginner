import { Button, Card, Modal, Placeholder } from "react-bootstrap";
import BlogPostModal from "./BlogPostModal";
import { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPostsByUser } from "../features/posts/postsSlice";
import { jwtDecode } from "jwt-decode";
import EditPostModal from "./EditPostModal";

export default function BlogPostCard({ post, editMode }) {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const cardStyle = {
        height: '300px',
        transition: 'transform 0.2s',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }

    const editCardStyle = {
        height: '300px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }

    const handleShowModal = () => {
        if (!editMode) { setShowModal(true) }
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const toggleDelete = (e) => {
        setShowDelete(!showDelete)
    }

    const handleDelete = () => {
        dispatch(deletePost(post.post_id));
        toggleDelete();
    }

    const handleEditClick = () => {
        setShowModal(true)
    }

    return (
        <>
            <Card
                onClick={handleShowModal}
                style={editMode ? editCardStyle : cardStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {editMode &&
                    <>
                        <Card.Header>
                            <Button variant="danger-outline" onClick={toggleDelete}><i className="bi bi-trash"></i></Button>
                            <Button variant="secondary-outline" onClick={handleEditClick}><i className="bi bi-pencil"></i></Button>
                        </Card.Header>
                    </>
                }
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    {post.subtitle && <Card.Subtitle className="mb-2 text-muted">{post.subtitle}</Card.Subtitle>}
                    <Card.Text>{post.content}</Card.Text>
                </Card.Body>
            </Card>
            {!editMode
                ? <BlogPostModal show={showModal} handleClose={handleCloseModal} post={post} />
                : <EditPostModal show={showModal} handleClose={handleCloseModal} post={post} />
            }

            <Modal show={showDelete} onHide={toggleDelete} centered>
                <Modal.Body>
                    <p>Are you sure you want to delete this post?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleDelete}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}