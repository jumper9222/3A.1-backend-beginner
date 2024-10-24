import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

export default function HomeNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken")
        navigate('/')
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
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}