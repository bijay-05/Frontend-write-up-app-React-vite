import axios from 'axios';
import { INewPost, IPost } from '../interfaces';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1/post',
});

//@Get all posts
export const getAllPosts = async (): Promise<IPost[]> => {
    const response = await api.get('/', { withCredentials: true });
    return response.data.data;
}

//@Get post details
export const getUserPosts = async (): Promise<IPost[]> => {
  const response = await api.get('/user', { withCredentials: true });
  return response.data.data;
}

//@Create new Post
export const addPost = async (newPost: INewPost): Promise<IPost> => {
  const response = await api.post('/', newPost, { withCredentials: true });
  // console.log("Response after login api: ",response.data);
  return response.data.data;
};

//@Update post
export const updatePost = async (id: string, updatedPost: INewPost): Promise<IPost> => {
    const response = await api.put(`/${id}`, updatedPost, { withCredentials: true });
    return response.data.data;
}

//@Delete post
export const deletePost = async (id: string | undefined): Promise<boolean> => {
    const response = await api.delete(`/${id}`, { withCredentials: true })
    return response.data.success;
}