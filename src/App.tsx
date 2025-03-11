import './App.css'
import { BrowserRouter, Route, Routes,  } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Verify from './pages/Verify'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Deploy from './pages/Deploy'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/project/new" element={<Project/>} />
        <Route path="/deploy/:projectName" element={<Deploy/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
