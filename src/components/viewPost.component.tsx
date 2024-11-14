// import { Link, useNavigate } from 'react-router-dom';
import { IPost } from '../interfaces';

interface PostViewPopupProps {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  viewPost: IPost | null;
}

const PostViewPopup: React.FC<PostViewPopupProps> = ({ showPopup, setShowPopup, viewPost }) => {
  return (
    <>
    {
       showPopup && (
        <div className='fixed inset-0 flex flex-column items-center justify-center bg-black bg-opacity-50 box-border'>
          <div className='relative bg-orange-300 h-[40vw] w-[50vw] p-8 rounded-md shadow-md items-center'>
            <h2 className='text-4xl font-bold mb-4'>{viewPost?.title}</h2>
            <div className='p-1 flex h-[15vw] w-30 overflow-auto bg-white mb-2 justify-center'>
              <p className='text-xl w-1/2 text-green-800 font-italic mb-4 bg-green'>{viewPost?.content}</p>
            </div>
            <div className='bg-gray-100 w-fit p-2 rounded-md'>
                <p className='bg-white text-sm'>Written On:</p>
                <p className='text-sm text-black-600 font-semibold'>{viewPost?.createdOn?.split("T")[0]}</p>
            </div>
            <button
                onClick={() => setShowPopup(false)}
                className='absolute bottom-0 ml-4 mb-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400'
              >
                Cancel
              </button>
          </div>
        </div>
      )
    }
    </>
   )
};

export default PostViewPopup;
