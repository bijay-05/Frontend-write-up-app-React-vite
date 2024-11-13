import axios from 'axios';
import { IComment, INewComment } from '../interfaces';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1/comment',
});

export const getBlogComment = async (blogId: string): Promise<IComment[]> => {
    const response = await api.get(`/${blogId}`, { withCredentials: true });
    return response.data.datal
}

export const createComment = async (newComment: INewComment): Promise<IComment> => {
  const response = await api.post(`/${newComment.blogId}`, newComment.comment, { withCredentials: true });
  // console.log("Response after login api: ",response.data);
  return response.data.data;
};

export const updateComment = async (updateComment: IComment): Promise<IComment> => {
    const response = await api.put(`/${updateComment.id}`, updateComment.comment, { withCredentials: true })
    return response.data.data;
}

export const deleteComment = async (commentId: string): Promise<number> => {
    const response = await api.delete(`${commentId}`, { withCredentials: true })
    return response.data.status;
}

