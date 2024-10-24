import { Card } from "react-bootstrap";
import { useState } from "react";
import NewPostModal from "./NewPostModal";

export default function NewPostCard() {
    const [showModal, setShowModal] = useState(false)
    const [isHovered, setIsHovered] = useState(false);


    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const cardStyle = {
        height: '300px',
        transition: 'transform 0.2s',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    }

    return (
        <>
            <Card
                onClick={handleShowModal}
                style={cardStyle}
                className="d-flex justify-content-center align-items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <p style={{ fontSize: '24px', color: "grey" }}>
                    <i className="bi bi-plus-square"></i>
                </p>
            </Card >
            <NewPostModal show={showModal} handleClose={handleCloseModal} />
        </>
    )
}