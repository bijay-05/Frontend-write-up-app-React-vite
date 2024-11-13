import { FormEvent, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { INewPost } from '../interfaces';

interface PostAddPopupProps {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  addPost: (post: INewPost) => void;
}

const PostAddPopup: React.FC<PostAddPopupProps> = ({ showPopup, setShowPopup, addPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

//   const navigate = useNavigate();

  const handleAddPost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBlog = {
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim())
    }
    addPost(newBlog);
    console.log("Blog to be added: ", newBlog);
    setShowPopup(false);
    setContent('');
    setTags('');
    setTitle('');
    //navigate("/posts")
  };

  return (
    <>
    {
       showPopup && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-4'>Write your thoughts..</h2>
            <form onSubmit={handleAddPost}>
              <div className='mb-4'>
                <label htmlFor='title' className='block text-sm font-bold mb-2'>
                  Title:
                </label>
                <input
                  type='text'
                  id='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='w-full border border-gray-300 rounded-md px-3 py-2'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='password' className='block text-sm font-bold mb-2'>
                  Content:
                </label>
                {/* <input
                  type='text'
                  id='content'
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className='w-full h-40 border border-gray-300 rounded-md px-3 py-2'
                /> */}
                <textarea
                 id="content"
                 name="content" 
                 rows={5} 
                 cols={5} 
                 value={content}
                 onChange={(e) => setContent(e.target.value)}
                 className='w-full h-40 border border-gray-300 rounded-md px-3 py-2'
                 >
                  It was a dark night
                </textarea>
              </div>
              <div className='mt-2 mb-2'>
                <label htmlFor='tags' className='block text-sm font-bold mb-2'>
                  Tags:
                </label>
                <input
                  type='text'
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className='w-full border border-gray-300 rounded-md px-3 py-2'
                />
              </div>
              <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm'
              >
                Add Post
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
    }
    </>
   )
};

export default PostAddPopup;
