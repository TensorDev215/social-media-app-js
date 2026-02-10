import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000/api'});

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization : `bearer ${token}` } : {};
}

export const register = (userData) => API.post('/user/register', userData);
export const login = (userData) => API.post('/user/login', userData);
export const fetchPosts = () => API.get('/post', { headers: getAuthHeader() });
export const createPost = (postData) => API.post('/post/create', postData, { headers: getAuthHeader() });

export const likePost = (postId) => API.post(`/post/${postId}/like`, {}, { headers: getAuthHeader() });
export const commentPost = (postId, commentData) => API.post(`/post/${postId}/comment`, commentData, { headers: getAuthHeader() });

export const followUser = (userId) => API.post(`/user/${userId}/follow`, {}, { headers: getAuthHeader() });
export const unfollowUser = (userId) => API.post(`/user/${userId}/unfollow`, {}, { headers: getAuthHeader() });
export const fetchExploreUsers = (userId) => API.get(`/user/explore/`, { headers: getAuthHeader() });
export const fetchUserById = (userId) => API.get(`/user/${userId}`, { headers: getAuthHeader() });