import api from "./axios"
import { INewPost, IPost } from '../interfaces';

//@Get all posts
export const getAllPosts = async (): Promise<IPost[]> => {
    const response = await api.get('/blog', { withCredentials: true });
    return response.data.data;
}

//@Get post details
export const getUserPosts = async (): Promise<IPost[]> => {
  const response = await api.get('/blog/user', { withCredentials: true });
  return response.data.data;
}

//@Create new Post
export const addPost = async (newPost: INewPost): Promise<IPost> => {
  const response = await api.post('/blog', newPost, { withCredentials: true });
  // console.log("Response after login api: ",response.data);
  return response.data.data;
};

//@Update blog
export const updatePost = async (id: string, updatedPost: INewPost): Promise<IPost> => {
    const response = await api.put(`/blog/${id}`, updatedPost, { withCredentials: true });
    return response.data.data;
}

//@Delete blog
export const deletePost = async (id: string | undefined): Promise<boolean> => {
    const response = await api.delete(`/blog/${id}`, { withCredentials: true })
    return response.data.success;
}