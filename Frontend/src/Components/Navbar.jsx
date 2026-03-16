import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate();
  return (
    <div>
      <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-6 px-4 sm:px-20 xl:px-32">
        <span className='text-white font-bold text-[1.7rem]' onClick={()=>{navigate('/')}}>SMART COLLAB</span>

        <button className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary font-semibold text-black px-10 py-2.5" onClick={()=>{navigate('/joinRoom')}}>
            Create Room
        </button>
      </div>
    </div>
  )
}

export default Navbar
