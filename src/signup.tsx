import { FormEvent, useState } from 'react';
import { ISignUp } from './interfaces/user.interface';

interface UserAddPopupProps {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  addUser: (user: ISignUp) => void;
}

const UserAddPopup: React.FC<UserAddPopupProps> = ({ showPopup, setShowPopup, addUser }) => {
  const [newUser, setNewUser] = useState<ISignUp>({
    useremail: '',
    password: ''
  });

  const handleAddUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser(newUser);
    setShowPopup(false);
    setNewUser({
      useremail: '',
      password: ''
    });
  };

  return (
    showPopup && (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white p-8 rounded-md shadow-md'>
          <h2 className='text-2xl font-bold mb-4'>Add Todo</h2>
          <form onSubmit={handleAddUser}>
            <div className='mb-4'>
              <label htmlFor='title' className='block text-sm font-bold mb-2'>
                Title:
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
              <label htmlFor='description' className='block text-sm font-bold mb-2'>
                description:
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
