import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FetchTopQuotes from '@/components/FetchTopQuotes'

import './App.css'
import AnimalExample from './components/AnimalExample'
import UpdateQuotes from './components/UpdateQuotes'
import PaginatedQuotes from './components/PaginatedQuotes'
import InfiniteScrollQuotes from './components/InfiniteScrollQuotes'
import GlobalSpinnerExample from './components/GlobalSpinnerExample'
import GlobalSpinnerContextProvider from './context/GlobalSpinnerContext'
import TasksBoard from './components/TasksBoard'
import ShoppingList from './components/ShoppingList'
import UsersManager from './components/UsersManager/UsersManager'
import DisplayBlogPosts from './components/hoc/DisplayBlogPosts'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Dashboard from './views/dashboard/Dashboard'
import DashboardLayout from './layout/DashboardLayout'
import AuthLayout from './layout/AuthLayout'


const queryClient = new QueryClient()

function App() {
  
  return (
    <BrowserRouter>
      <GlobalSpinnerContextProvider>
        <QueryClientProvider client={queryClient}>
          <div className='App mx-auto max-w-6xl text-center my-8'>
            {/* <AnimalExample /> */}
            {/* <UpdateQuotes />
          <FetchTopQuotes />
          <PaginatedQuotes />
          <InfiniteScrollQuotes /> */}
            {/* <GlobalSpinnerExample /> */}
            {/* <TasksBoard />
          <ShoppingList /> */}
            {/* <UsersManager /> */}
            <DisplayBlogPosts />
          </div>
          <nav className='my-8 space-x-4'>
            {' '}
            <Link to='/'>Dashboard</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </nav>
          <div>
            <Routes>
              <Route element={<DashboardLayout />}>
                <Route path='/' element={<Dashboard />} />{' '}
              </Route>

              <Route element={<AuthLayout />}>
                <Route path='/login' element={<Login />} />{' '}
                <Route path='/register' element={<Register />} />
              </Route>
            </Routes>
          </div>
        </QueryClientProvider>
      </GlobalSpinnerContextProvider>
    </BrowserRouter>
  )
}

export default App
