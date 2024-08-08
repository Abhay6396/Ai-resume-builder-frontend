import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import Home from './Home/index.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './Dashboard/resume/[resumeid]/edit/index.jsx'
import ViewResume from './my-resume/[resumeid]/view/index.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  }, 
  {
    element: <App/>,
    children : [
    {
      path : '/dashboard',
      element : <Dashboard/>
    },
    {
      path : '/dashboard/resume/:resumeid/edit',
      element : <EditResume/>
    } 
    ]
  },
  {
    path : '/',
    element : <Home/>
  },
  {
    path: '/auth/sign-in',
    element : <SignInPage/>
  },
  {
    path:'/my-resume/:resumeid/view',
    element: <ViewResume/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router}/>
    </ClerkProvider>
  </React.StrictMode>,
)
