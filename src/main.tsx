import './index.css'
import App from './App.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// const router = createBrowserRouter([
//   {
//     path: "/*",
//     element: <App/>
//   }
// ])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <RouterProvider router={router}/> */}
    <App />
  </React.StrictMode>)