import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext.jsx';

const JoinRoom = () => {
  const {username,setaUsername}=useAppContext();
  const [roomid,setRoomId]=useState('');
  // const [userName,setaUserName]=useState('');
  const navigate=useNavigate();

  // handle enter event
  const handleEnter=(e)=>{
      if(e.code==='Enter'){
        joinRoom();
      }
  }

  // to autogenerate unique room id
  const createNewRoom=(e)=>{
      e.preventDefault();
      const id=uuidv4();
      setRoomId(id);
      toast.success('New Room Created');
  }

  // nagivating to editor page
  const joinRoom=()=>{
    if(!roomid ||!username){
      toast.error('Room ID & Username required');
      return;
    }
    //also passing username with router nagivate so we can make use of it editor page
    navigate(`/editor/${roomid}`);

  }
  
  return (
    <div className='bg-black w-screen h-screen flex justify-center items-center'>
      <div className='flex flex-col px-10 w-[26.1rem] py-12 rounded-xl border-2 border-gray-50'>
            <span className='text-primary font-bold text-[1.7rem]'>SMART COLLAB</span>
            <h4 className='text-white mt-5 mb-4 text-xs'>Paste Invitation ROOM ID</h4>

            <div className='flex flex-col gap-6'>
              <input value={roomid} onKeyUp={handleEnter} onChange={(e)=>setRoomId(e.target.value)} type="text" placeholder='Room ID' className='bg-white pl-3 py-1.5 border-2 rounded-lg' />
              <input value={username} onKeyUp={handleEnter} onChange={(e)=>setaUsername(e.target.value)} type="text" placeholder='Username' className='bg-white pl-3 py-1.5 border-2 rounded-lg' />
            </div>

            <button className='mt-5 py-1.5 bg-primary w-23 rounded-lg font-bold text-black' onClick={joinRoom}>Join</button>
            <span className='mt-5 text-white text-xs text-center'>If You Don't Have An Invite Create <a onClick={createNewRoom}className='underline text-primary' href="">New Room</a></span>

      </div>

    </div>
  )
}

export default JoinRoom
