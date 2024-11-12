import axios from 'axios';
import { ILogin } from '../interfaces';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1/auth',
});

export const loginUser = async (newUser: ILogin): Promise<boolean> => {
  const response = await api.post('/login', newUser, { withCredentials: true });
  // console.log("Response after login api: ",response.data);
  return response.data.status;
};


export const logoutUser = async (): Promise<void> => {
    const response = await api.delete('/logout', { withCredentials: true })
    return response.data;
}