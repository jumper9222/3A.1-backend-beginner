import { useDispatch } from 'react-redux';
import { Button, Container } from "react-bootstrap";
import { fetchPost } from "../features/posts/postsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function BlogPostPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    useEffect(() => {
        if (authToken === "") {
            navigate("/")
        }
    }, [authToken, navigate])

    const post_id = useParams().post_id;
    const [post, setPost] = useState({})

    useEffect(() => {
        dispatch(fetchPost(post_id)).then((res) => {
            setPost(res.payload)
        })
    }, [dispatch, setPost])

    const handleBack = () => {
        window.history.back()
    }

    return (
        <Container className='py-5'>
            <Button variant='secondary' onClick={handleBack}><i className='bi bi-arrow-left'></i></Button>
            <h1 className='mt-3'>{post.title}</h1>
            <h4 className='mb-3'>{post.subtitle}</h4>
            <p>{post.content}</p>
        </Container>
    )
}