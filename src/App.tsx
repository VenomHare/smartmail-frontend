import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Generate from './app/generate'
import Home from './app/home'
import EmailUUID from './app/mail/uuid'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/mail/:uuid" element={<EmailUUID />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
