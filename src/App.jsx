import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './components/Home'
import Upload from './pages/Upload'
import AudioResults from './pages/AudioResults'
import FactCheckResults from './pages/FactCheckResults'
import PostureResults from './pages/PostureResults'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <>
      <Navbar />
      <Upload />
        <AudioResults />
        <FactCheckResults />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/upload" element={} />
        <Route path="/results/audio" element={} /> */}
        {/* <Route path="/results/factcheck" element={} />
        <Route path="/results/posture" element={<PostureResults />} /> */}
      </Routes>
    </>
  )
}

export default App