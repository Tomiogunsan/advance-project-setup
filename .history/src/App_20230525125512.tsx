import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FetchTopQuotes from '@/components/FetchTopQuotes'

import './App.css'
import AnimalExample from './components/AnimalExample'
import UpdateQuotes from './components/UpdateQuotes'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App mx-auto max-w-6xl text-center my-8'>
        {/* <AnimalExample /> */}
        <UpdateQuotes />
        <FetchTopQuotes />
      </div>
   
  )
}

export default App
