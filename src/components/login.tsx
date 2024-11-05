import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ILogin } from '../interfaces';

interface UserLoginPopupProps {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  loginUser: (user: ILogin) => void;//{ accesstoken: string, refreshtoken: string };
}

const UserLoginPopup: React.FC<UserLoginPopupProps> = ({ showPopup, setShowPopup, loginUser }) => {
  const [newUser, setNewUser] = useState<ILogin>({
    useremail: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleLoginUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(newUser);
    setShowPopup(false);
    setNewUser({
      useremail: '',
      password: ''
    });
    //navigate("/posts")
  };

  return (
    showPopup && (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white p-8 rounded-md shadow-md'>
          <h2 className='text-2xl font-bold mb-4'>Log In with Email and Password</h2>
          <form onSubmit={handleLoginUser}>
            <div className='mb-4'>
              <label htmlFor='title' className='block text-sm font-bold mb-2'>
                UserEmail:
              </label>
              <input
                type='text'
                id='email'
                value={newUser.useremail}
                onChange={(e) => setNewUser({ ...newUser, useremail: e.target.value })}
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-sm font-bold mb-2'>
                Password:
              </label>
              <input
                type='password'
                id='password'
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              />
            </div>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm'
            >
              Login
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className='ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400'
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default UserLoginPopup;
