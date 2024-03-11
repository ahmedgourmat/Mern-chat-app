import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Chat from './pages/Chat/Chat'
import { UserContext } from './context/UserContext'


function App() {
  

  return (
    <div className='app'>
      <UserContext>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </UserContext>
    </div>
  )
}

export default App
