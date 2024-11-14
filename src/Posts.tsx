import React, { useEffect, useState } from 'react';
import PostAddPopup from './components/addPost.component';
import { INewPost, IPost } from './interfaces';
import { addPost, getAllPosts } from './axios/post.requests';
import { logoutUser } from './axios/auth.requests';
import PostViewPopup from './components/viewPost.component';
import { useNavigate } from 'react-router-dom';
import { Cast, PlusIcon } from 'lucide-react';
import NothingToShow from './components/nothing.component';

// interface Post {
//   id: number;
//   title: string;
//   body: string;
// }
// interface UserPostsProps {
//   loginStatus: boolean;
// }

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPostAddPopup, setShowPostAddPopup] = useState(false);
  const [showPostViewPopup, setShowPostViewPopup] = useState(false);
  const [viewingPost, setViewPost] = useState<IPost | null>(null);
  const navigate = useNavigate();
  // const status = loginStat
 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllPosts();

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

  const handleLogOut = async (): Promise<void> => {
    try {
      await logoutUser()
      navigate('/')
    } catch(err) {
      console.log("Error while logging out: ", err)
    }
  }
  return (
    <>
      <div className=' min-h-screen bg-yellow-200 pt-16 px-8'>
        <div className='flex justify-between items-center mb-10'>
          <h1 className='text-4xl font-bold'>Write Up - A Blogging Platform</h1>
          <button
            className='bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-600 shadow-sm'
            onClick={() => setShowPostAddPopup(true)}
          ><div className='flex justify-between'>
            <PlusIcon size={30}/>
            <h1>Create</h1>
          </div>
          </button>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm'
            onClick={() => navigate('/user')}
          >Your Posts
          </button>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm'
            onClick={() => handleLogOut()}
          >Logout
          </button>
        </div>
        <div className='bg-purple-300 p-4 rounded-lg shadow-md min-w-full max-w-lg mb-4 justify-start flex'>
          <Cast size={"45"}/>
          <h1 className='text-3xl font-bold text-left'>Home ({posts.length})</h1>
        </div> 
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {posts.map(post => (
          <div key={post.id} className={'bg-white p-4 rounded-md shadow-md flex flex-col'}>
            <div>
              <h2 className='text-xl font-bold'>{post.title}</h2>
              <p className='text-gray-600 w-full truncate'>{post.content.split(' ').slice(0,10).join(' ')}</p>
            </div>
            <div className='flex-grow' />
            <div className='flex justify-between'>
              <button
                className='bg-green-500 text-white w-4px h-2px px-1 py-1 rounded-md hover:bg-green-600'
                onClick={() => handleViewPost(post)}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
        <NothingToShow display={posts.length === 0}/>
        </div>
        <PostAddPopup
          showPopup={showPostAddPopup}
          setShowPopup={setShowPostAddPopup}
          addPost={handleAddPost}
        />
        <PostViewPopup showPopup={showPostViewPopup} setShowPopup={setShowPostViewPopup} viewPost={viewingPost}/>
      </div>
    </>
  );
};

export default PostList;
