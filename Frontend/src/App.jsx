import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/HomePage.jsx'
import JoinRoom from './Pages/JoinRoom.jsx'
import Editor from './Pages/EditorPage.jsx'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Toaster position='top-right' toastOptions={{success:{theme:{primary:'#4aed88'}}}}></Toaster>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/joinRoom" element={<JoinRoom/>}></Route>
        <Route path="/editor/:roomId" element={<Editor/>}></Route>
      </Routes>
    </div>
  )
}

export default App
