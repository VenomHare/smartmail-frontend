import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Generate from './app/generate'
import Home from './app/home'
import EmailUUID from './app/mail/uuid'
import LoginPage from './app/auth/login'
import SignupPage from './app/auth/signup'
import CallbackPage from './app/auth/callback'
import ResetPage from './app/auth/reset'
import GmailLink from './app/gmail'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<SignupPage/>} />
          <Route path="/password/reset" element={<ResetPage/>} />
          <Route path='/auth/callback' element={<CallbackPage/>} />

          <Route path="/generate" element={<Generate />} />
          <Route path="/mail/:uuid" element={<EmailUUID />} />

          <Route path="/link/gmail" element={<GmailLink />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
