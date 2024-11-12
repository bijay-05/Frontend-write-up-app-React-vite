import { FormEvent, useState, useEffect } from 'react';
import { INewPost } from '../interfaces/post.interface';

interface PostUpdatePopupProps {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  updatePost: (updatedPost: INewPost) => void;
  PostToUpdate: INewPost | null;
}

const PostUpdatePopup: React.FC<PostUpdatePopupProps> = ({ showPopup, setShowPopup, updatePost, PostToUpdate }) => {
  const [editedTodo, setEditedTodo] = useState<INewPost>({
    title: '',
    content: ''
  });

  useEffect(() => {
    if (PostToUpdate) {
      setEditedTodo(PostToUpdate);
    }
  }, [PostToUpdate]);

  const handleUpdateTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePost(editedTodo);
    setShowPopup(false);
  };

  return (
    showPopup && (
      <div className='fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-yellow-500 p-8 rounded-md shadow-md'>
          <h2 className='text-2xl font-bold mb-4'>Edit Todo</h2>
          <form onSubmit={handleUpdateTodo}>
            <div className='mb-4'>
              <label htmlFor='title' className='block text-sm font-bold mb-2'>
                Title:
              </label>
              <input
                type='text'
                id='title'
                value={editedTodo.title}
                onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='content' className='block text-sm font-bold mb-2'>
                content:
              </label>
              <textarea
                rows={5}
                cols={50}
                id='content'
                value={editedTodo.content}
                onChange={(e) => setEditedTodo({ ...editedTodo, content: e.target.value })}
                className='w-full border border-gray-300 rounded-md px-3 py-2'
              />
            </div>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm'
            >
              Update Post
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

export default PostUpdatePopup;
