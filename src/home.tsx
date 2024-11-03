import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserAddPopup from "./signup";
import { ISignUp } from "./interfaces/user.interface";
import { createUser } from "./axios/requests";

const Home: React.FC = () => {

    const [showAddPopup, setShowAddPopup] = useState(false);

    const handleAddUser = async (newUser: ISignUp) => {
        try {
          await createUser(newUser);
          setShowAddPopup(false);
        } catch (error) {
          console.error('Error adding todo:', error);
        }
      };

    return (
        <>
        <div>
            <h1>Write Up - anything</h1>
            <h2>
                <button onClick={() => setShowAddPopup(true)} type="submit">
                    Sign Up
                </button>
            </h2>
            <UserAddPopup showPopup={showAddPopup} setShowPopup={setShowAddPopup} addUser={handleAddUser} />
            <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
        </div>
        </>
    )
}

export default Home;