import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAddPopup from "./components/signup";
import UserLoginPopup from "./components/login";
import { ISignUp, ILogin } from "./interfaces";
import { createUser } from "./axios/user.requests";
import { loginUser } from "./axios/auth.requests";
import homeImage from "./assets/home.jpg";

const Home: React.FC = () => {

    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      console.log("Login Status: ", loginStatus);
      if (loginStatus) {
        navigate("/posts", { viewTransition: true })
      } else {
        navigate("/")
      }
    }, [loginStatus]);

    const handleAddUser = async (newUser: ISignUp) => {
        try {
          const user = await createUser(newUser);
          console.log("This is added user: ", user.username)
          setShowAddPopup(false);
        } catch (error) {
          console.error('Error adding todo:', error);
        }
      };

    const handleLoginUser = async (newUser: ILogin): Promise<void> => {
      try {
        const data = await loginUser(newUser);
        setLoginStatus(data) 
      } catch (error) {
        console.log('Error log in user: ', error);
      }
    }

    return (
      <div className='w-full min-h-screen bg-gray-200 pt-16 px-8'>
        <div className='flex justify-between items-center mb-10'>
          <h1 className='text-4xl font-bold'>Write Up - A Blogging Platform</h1>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm'
            onClick={() => setShowAddPopup(true)}
          >Sign Up
          </button>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 shadow-sm'
            onClick={() => setShowLoginPopup(true)}
          >Login
          </button>
        </div>
        <div className='w-full border-hidden bg-left'>
            <img src={homeImage} alt="Home page image"/>
        </div>
        <UserLoginPopup
          showPopup={showLoginPopup}
          setShowPopup={setShowLoginPopup}
          loginUser={handleLoginUser}
        />
        <UserAddPopup showPopup={showAddPopup} setShowPopup={setShowAddPopup} addUser={handleAddUser} />
        {/* <PostList loginStatus={loginStatus}/> */}
      </div>
    );
}

export default Home;