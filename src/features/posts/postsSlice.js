import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const BASE_URL = "https://blog-server-2ojd4dvqo-jumper9222s-projects.vercel.app"

export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchPostsByUser",
    async (userId) => {
        const response = await fetch(`${BASE_URL}/posts/user/${userId}`);
        return response.json();
    }
);

export const savePost = createAsyncThunk(
    "posts/savePost",
    async (postContent) => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;

        const { title, subtitle, content } = postContent

        const response = await axios.post(`${BASE_URL}/posts`, { userId, title, subtitle, content });
        return response.data;
    }
)

export const editPost = createAsyncThunk(
    "posts/editPost",
    async (postContent) => {
        const userId = jwtDecode(localStorage.getItem("authToken")).id;
        const { title, subtitle, content, post_id } = postContent

        const response = await axios.put(`${BASE_URL}/posts/${post_id}`, { title, subtitle, content, userId })
        console.log(response.data)
        return response.data;
    }
)


export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (postId) => {
        const userId = jwtDecode(localStorage.getItem("authToken")).id;

        const response = await axios.delete(`${BASE_URL}/posts/${postId}`, { data: { userId } });
        return response.data;
    }
)

export const fetchPost = createAsyncThunk(
    "posts/fetchPost",
    async (postId) => {
        const response = await axios.get(`${BASE_URL}/posts/${postId}`);
        return response.data;
    }
)

const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            console.log(state.posts)
        });
        builder.addCase(savePost.fulfilled, (state, action) => {
            state.posts = [...state.posts, action.payload];
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.posts.filter((post) => post.post_id !== action.payload.post_id)
        });
        builder.addCase(editPost.fulfilled, (state, action) => {
            state.posts = state.posts.map((post) => {
                if (post.post_id === action.payload.post_id) {
                    return action.payload;
                }
                return post
            })
        })
    }
})

export default postsSlice.reducer;