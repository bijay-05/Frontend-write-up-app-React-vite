import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import PostList from './Posts'
import Home from './home'
import User  from './User'

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts' element={<PostList />} />
        <Route path='/user' element={<User />}/>
      </Routes>
    </Router>
  )
}

export default App


