import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Placeholder } from "react-bootstrap";
import { fetchPost } from "../features/posts/postsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import useLocalStorage from 'use-local-storage';

export default function BlogPostPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((state) => state.posts.loading);
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
            {loading ? (
                <>
                    <Placeholder className="mt-3" as='h1' animation='wave'>
                        <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder className="mb-3" as='h4' animation='wave'>
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as='p' animation='wave'>
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                </>
            ) : null}
            <h1 className='mt-3'>{post.title}</h1>
            <h4 className='mb-3'>{post.subtitle}</h4>
            <p>{post.content}</p>
        </Container>
    )
}