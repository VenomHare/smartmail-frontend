import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './app/home'
import EmailUUID from './app/mail/uuid'
import LoginPage from './app/auth/login'
import SignupPage from './app/auth/signup'
import CallbackPage from './app/auth/callback'
import ResetPage from './app/auth/reset'
import GmailLink from './app/gmail'
import AccountPage from './app/user/account'
import TermsPage from './app/legal/terms'
import PrivacyPage from './app/legal/privacy'
import PricingPage from './app/pricing'
import Onboarding from './app/auth/onboarding'

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

          <Route path="/mail/:uuid" element={<EmailUUID />} />

          <Route path="/link/gmail" element={<GmailLink />} />
      
          <Route path="/account" element={<AccountPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/onboarding" element={<Onboarding />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
