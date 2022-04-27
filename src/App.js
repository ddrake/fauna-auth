import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Logout from './pages/logout'

import Layout from './components/layout'
import { SessionProvider, sessionReducer } from './context/session'
import Reset from './pages/reset'

const App = () => {
  const [state, dispatch] = React.useReducer(sessionReducer, { user: null })

  // Return the header and either show an error or render the loaded profiles.
  return (
    <BrowserRouter>
      <SessionProvider value={{ state, dispatch }}>
        <Layout>
          <Routes>
            <Route path="/accounts/login" element={<Login />} />
            <Route path="/accounts/register" element={<Register />} />
            <Route path="/accounts/reset" element={<Reset />} />
            <Route path="/accounts/logout" element={<Logout />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </SessionProvider>
    </BrowserRouter>
  )
}

export default App
