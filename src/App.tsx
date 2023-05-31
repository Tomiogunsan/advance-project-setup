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
import { store } from './store'
import { Provider } from 'react-redux'

const queryClient = new QueryClient()

function App() {
  return (
    <Provider store={store}>
      <GlobalSpinnerContextProvider>
        <QueryClientProvider client={queryClient}>
          <div className='App mx-auto max-w-6xl text-center my-8'>
            {/* <AnimalExample /> */}
            {/* <UpdateQuotes />
          <FetchTopQuotes />
          <PaginatedQuotes />
          <InfiniteScrollQuotes /> */}
            {/* <GlobalSpinnerExample /> */}
            <TasksBoard />
            <ShoppingList />
          </div>
        </QueryClientProvider>
      </GlobalSpinnerContextProvider>
    </Provider>
  )
}

export default App
