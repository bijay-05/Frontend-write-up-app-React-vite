import api from './axios';
import { ILogin } from '../interfaces';


export const loginUser = async (newUser: ILogin): Promise<boolean> => {
  const response = await api.post('/auth/login', newUser, { withCredentials: true });

  //set refresh token in localstorage
  localStorage.setItem("refreshToken", response.data.data)

  return response.data.status;
};


export const logoutUser = async (): Promise<void> => {
    const response = await api.delete('/auth/logout', { withCredentials: true })
    return response.data;
}