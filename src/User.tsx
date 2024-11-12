import React, { useEffect, useState } from 'react';
import PostAddPopup from './components/addPost.component';
import { INewPost, IPost } from './interfaces';
import { addPost, getUserPosts, updatePost, deletePost } from './axios/post.requests';
import PostViewPopup from './components/viewPost.component';
import PostUpdatePopup from './components/editPost.component';
import DeleteConfirmationPopup from './components/deleteConfirmation.component';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './axios/auth.requests';
import { PlusIcon } from 'lucide-react';

const UserPosts: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPostAddPopup, setShowPostAddPopup] = useState(false);
  const [showPostViewPopup, setShowPostViewPopup] = useState(false);
  const [showPostEditPopup, setShowPostEditPopup] = useState(false);
  const [viewingPost, setViewPost] = useState<IPost | null>(null);
  const [postToUpdate, setPostToUpdate] = useState<IPost | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [postToDelete, setPostToDelete] = useState<IPost | null>(null);

  const navigate = useNavigate()
 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getUserPosts();
        setPosts(posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  // console.log("login status: ", loginStatus)

  const handleAddPost = async (newPost: INewPost): Promise<void> => {
    try {
      const addedPost = await addPost(newPost);
      setPosts([ ...posts, addedPost])
    } catch (err) {
      console.log("Error in post add: ", err);
    }
  }

  const handleViewPost = (post: IPost): void => {
    try {
      setViewPost(post);
      setShowPostViewPopup(true);
    } catch(err) {
      console.log("Error while viewing post: ", err)
    }
  }

  const handleEditPost = (post: IPost) => {
    setPostToUpdate(post);
    setShowPostEditPopup(true);
  };

  const handleUpdatePost = async (updatedPost: INewPost) => {
    if (!postToUpdate) return;
  
    try {
      await updatePost(postToUpdate.id, updatedPost);
      const updatedPosts = posts.map(post => (post.id === postToUpdate.id ? { ...updatedPost, id: post.id, createdOn: post.createdOn, updatedOn: '', userId: '' } : post));
      setPosts(updatedPosts);
      setShowPostEditPopup(false);
      setPostToUpdate(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeletePost = async (id: string | undefined) => {
    try {
      await deletePost(id);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const confirmDelete = (post: IPost) => {
    setPostToDelete(post);
    setShowDeleteConfirmation(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setPostToDelete(null);
  };

  const handleLogOut = async (): Promise<void> => {
    try {
      await logoutUser()
      // document.cookie = '<cookieName>=; Max-Age=0; secure'
      navigate('/')
    } catch(err) {
      console.log("Error while logging out: ", err)
    }
  }

  return (
    <>
      <div className='w-full min-h-screen bg-gray-200 pt-16 px-8'>
        <div className='flex justify-between items-center mb-10 '>
          <h1 className='text-4xl font-bold'>Posts by You !!!</h1>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm'
            onClick={() => setShowPostAddPopup(true)}
          ><div className='flex justify-between'>
          <PlusIcon size={30}/>
          <h1>Create</h1>
        </div>
          </button>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm'
            onClick={() => navigate('/posts')}
          >Home
          </button>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm'
            onClick={() => handleLogOut()}
          >Logout
          </button>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md min-w-full max-w-lg mb-4 flex'>
          <Home size={"45"}/>
        <h1 className='text-3xl font-bold'>Your Posts ({posts.length})</h1>
        </div> 
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {posts.map(post => (
          <div key={post.id} className={'bg-white p-4 rounded-md shadow-md flex flex-col'}>
            <div>
              <h2 className='text-xl font-bold'>{post.title}</h2>
              <p className='text-gray-600'>{post.content}</p>
            </div>
            <div className='flex-grow' />
            <p className={`${post.title ? 'text-green-500' : 'text-red-500'} font-bold mb-4`}>
              {post.title ? 'Completed' : 'Not Completed'}
            </p>
            <div className='flex justify-between'>
              <button
                className='bg-blue-500 text-white  px-0.5 py-1 rounded-md hover:bg-blue-600'
                onClick={() => handleViewPost(post)}
              >
                Read More
              </button>
              <button
                className='bg-green-500 text-white px-0.5 py-1 rounded-md hover:bg-green-600'
                onClick={() => handleEditPost(post)}
              >
                Edit
              </button>
              <button
                className='bg-red-500 text-white px-0.5 py-1 rounded-md hover:bg-red-600'
                onClick={() => confirmDelete(post)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        </div>
        <PostAddPopup
          showPopup={showPostAddPopup}
          setShowPopup={setShowPostAddPopup}
          addPost={handleAddPost}
        />
        <PostViewPopup showPopup={showPostViewPopup} setShowPopup={setShowPostViewPopup} viewPost={viewingPost}/>
        <PostUpdatePopup showPopup={showPostEditPopup} setShowPopup={setShowPostEditPopup} updatePost={handleUpdatePost} PostToUpdate={postToUpdate}/>
        {showDeleteConfirmation && <DeleteConfirmationPopup onDeleteConfirmed={() => handleDeletePost(postToDelete?.id)} onCancel={cancelDelete}/>}
      </div>
    </>
  );
};

export default UserPosts;
