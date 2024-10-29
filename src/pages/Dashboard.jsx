import { Col, Container, Row } from "react-bootstrap";
import BlogPostCard from "../components/BlogPostCard";
import NewPostCard from "../components/NewPostCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByUser } from "../features/posts/postsSlice";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "use-local-storage";
import LoadingCard from "../components/LoadingCard";

export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.posts.loading);
    const saveLoading = useSelector((state) => state.posts.saveLoading);
    const posts = useSelector((state) => state.posts.posts)

    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode(!editMode)
    };

    useEffect(() => {

        if (authToken !== "") {
            try {
                const decodedToken = jwtDecode(authToken);
                const userId = decodedToken.id;
                dispatch(fetchPostsByUser(userId))
                console.log(posts)
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        } else if (authToken === "") {
            navigate("/");
        }
    }, [navigate, dispatch])

    return (
        <Container className="my-5">
            <h1 className="mb-5">
                Dashboard
                <i
                    className='bi bi-pencil-square ms-3'
                    style={{ color: "light-grey", fontSize: "24px", cursor: "pointer" }}
                    onClick={toggleEditMode}></i>
            </h1>
            <Row>
                <Col md={4} className="mb-3">
                    <NewPostCard />
                </Col>
                {saveLoading ? (
                    <>
                        <Col md={4}>
                            <LoadingCard />
                        </Col>
                    </>
                ) : null
                }
                {loading ? (
                    <>
                        <Col md={4}>
                            <LoadingCard />
                        </Col>
                        <Col md={4}>
                            <LoadingCard />
                        </Col>
                        <Col md={4}>
                            <LoadingCard />
                        </Col>
                        <Col md={4}>
                            <LoadingCard />
                        </Col>
                        <Col md={4}>
                            <LoadingCard />
                        </Col>
                    </>
                ) : null}
                {posts.length > 0 ? posts.slice().reverse().map((post) => (
                    <Col md={4} key={post.post_id} className="mb-3">
                        <BlogPostCard post={post} editMode={editMode} />
                    </Col>
                ))
                    : (
                        <p></p>
                    )}
            </Row>
        </Container>
    )
}