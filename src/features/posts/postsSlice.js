import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const BASE_URL = "https://blog-server-mocha-iota.vercel.app"

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
    initialState: { posts: [], loading: true, saveLoading: false, editLoading: false },
    reducers: {
        handleLogout: (state) => {
            localStorage.setItem("authToken", "")
            state.posts = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPostsByUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            console.log(state.posts)
        });
        builder.addCase(fetchPost.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(savePost.pending, (state, action) => {
            state.saveLoading = true;
        });
        builder.addCase(savePost.fulfilled, (state, action) => {
            state.posts = [...state.posts, action.payload];
            state.saveLoading = false;
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
            console.log(action.payload)
            state.posts = state.posts.filter((post) => post.post_id !== action.payload.post.post_id)
        });
        builder.addCase(editPost.pending, (state, action) => {
            state.editLoading = true;
        })
        builder.addCase(editPost.fulfilled, (state, action) => {
            state.posts = state.posts.map((post) => {
                if (post.post_id === action.payload.post.post_id) {
                    return action.payload;
                } else {
                    return post
                }
                state.editLoading = false;
            })
        })
    }
})

export const { handleLogout } = postsSlice.actions;
export default postsSlice.reducer;