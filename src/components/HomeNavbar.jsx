import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { handleLogout } from "../features/posts/postsSlice";
import useLocalStorage from "use-local-storage";
import { useEffect } from "react";

export default function HomeNavbar() {
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (authToken === "") {
            navigate('/')
        }
    }, [navigate, authToken])

    const handleLogoutClick = async (e) => {
        e.preventDefault();
        dispatch(handleLogout());
        navigate('/');
    }

    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand><i className="bi bi-chat-left" style={{ fontSize: "24px" }}></i></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link href="/dashboard">Home</Nav.Link>
                            <Nav.Link href="/create">Create Post</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Button
                        variant="outline-danger"
                        onClick={handleLogoutClick}
                    >
                        Logout
                    </Button>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}