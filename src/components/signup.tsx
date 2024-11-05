import { FormEvent, useState } from 'react';
import { ISignUp } from '../interfaces';

interface UserAddPopupProps {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  addUser: (user: ISignUp) => void;
}

const UserAddPopup: React.FC<UserAddPopupProps> = ({ showPopup, setShowPopup, addUser }) => {
  const [newUser, setNewUser] = useState<ISignUp>({
    username: '',
    useremail: '',
    password: '',
    bio: ''
  });

  const handleAddUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser(newUser);
    setShowPopup(false);
    setNewUser({
      username: '',
      useremail: '',
      password: '',
      bio: ''
    });
  };

  return (
    showPopup && (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white p-8 rounded-md shadow-md'>
          <h2 className='text-2xl font-bold mb-4'>Sign Up with email and password</h2>
          <form onSubmit={handleAddUser}>
            <div className='mb-4'>
              <label htmlFor='useremail' className='block text-sm font-bold mb-2'>
                email:
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
              <label htmlFor='username' className='block text-sm font-bold mb-2'>
                username:
              </label>
              <input
                type='text'
                id='username'
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-sm font-bold mb-2'>
                password:
              </label>
              <input
                type='password'
                id='password'
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='bio' className='block text-sm font-bold mb-2'>
                bio:
              </label>
              <input
                type='text'
                id='bio'
                value={newUser.bio}
                onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              />
            </div>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm'
            >
              SignUp
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

export default UserAddPopup;
