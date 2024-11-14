import api from './axios';
import { IComment, INewComment } from '../interfaces';

export const getBlogComment = async (blogId: string): Promise<IComment[]> => {
    const response = await api.get(`/comment/${blogId}`, { withCredentials: true });
    return response.data.datal
}

export const createComment = async (newComment: INewComment): Promise<IComment> => {
  const response = await api.post(`/comment/${newComment.blogId}`, newComment.comment, { withCredentials: true });
  // console.log("Response after login api: ",response.data);
  return response.data.data;
};

export const updateComment = async (updateComment: IComment): Promise<IComment> => {
    const response = await api.put(`/comment/${updateComment.id}`, updateComment.comment, { withCredentials: true })
    return response.data.data;
}

export const deleteComment = async (commentId: string): Promise<number> => {
    const response = await api.delete(`comment/${commentId}`, { withCredentials: true })
    return response.data.status;
}

