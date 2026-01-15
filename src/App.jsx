import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PlayerProfile from './pages/PlayerProfile'
import Leaderboard from './pages/Leaderboard'
import Compare from './pages/Compare'
import AuthSuccess from './pages/AuthSuccess'
import MyProfile from './pages/MyProfile'
import Watchlist from './pages/Watchlist'

function App() {
  return (
    <AuthProvider>
      <div className="flex">
        <Navbar />
        <div className="flex-1 ml-0 lg:ml-64">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/player/:id" element={<PlayerProfile />} />
            <Route path="/leaderboard/:region" element={<Leaderboard />} />
            <Route path="/compare/:id1/:id2" element={<Compare />} />
            <Route path="/auth/success" element={<AuthSuccess />} />
            <Route path="/my-profile" element={<MyProfile />} />
           <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  )
}

export default App
