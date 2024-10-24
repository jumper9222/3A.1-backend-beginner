import { Button } from "react-bootstrap";
import SignInModal from "../components/SignInModal";
import SignUpModal from "../components/SignUpModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

export default function AuthPage() {
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")
    const [showModal, setShowModal] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (authToken !== "") {
            navigate("/dashboard")
        }
    }, [authToken, navigate])

    const closeModal = () => {
        setShowModal(null)
    }

    const getStarted = () => {
        setShowModal("signup")
    };

    const login = () => {
        setShowModal("signin")
    }

    return (
        <div>
            <div className="d-flex flex-row justify-content-between py-3 px-4" style={{ background: "grey" }}>
                <i className="bi bi-chat-left" style={{ fontSize: "24px" }}></i>
                <Button onClick={login} className="align-self-end" variant="light">Login</Button>
            </div>
            <div className="mt-5 d-flex flex-column align-items-center">
                <h1>Share your interests your way!</h1>
                <p>Craft your own personalised blog with ease.</p>
                <Button onClick={getStarted}>GET STARTED</Button>
            </div>
            {
                showModal === "signin"
                    ? <SignInModal show={showModal === "signin"} handleClose={closeModal} />
                    : <SignUpModal show={showModal === "signup"} handleClose={closeModal} />
            }
        </div>
    )
}