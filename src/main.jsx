import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Roots/Root';
import Home from './Components/Home/Home';
import AddTask from './AddTask';
import AllTask from './AllTask';
import Complate from './Complate';
import NotComplate from './NotComplate';
import AuthContext from './AuthContext';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Login from './Components/Log/Login';
import Register from './Components/Log/Register';
const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path:'/login',
    element:<Login></Login>
  },
  {
    path:'/register',
    element:<Register></Register>
  },
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/create_task",
        element: <AddTask></AddTask>
      },
      {
        path: "/alltask",
        element: <AllTask></AllTask>
      },
      {
        path: "/complatetask",
        element: <Complate></Complate>
      },
      {
        path: "/incompletetask",
        element: <NotComplate></NotComplate>
      }
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>
    </QueryClientProvider>
  </StrictMode>,
)
