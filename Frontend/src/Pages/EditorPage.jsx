import React, { useRef,useEffect, useState} from 'react'
import Avatar from 'react-avatar';
import Editor from '../Components/Editor.jsx'
import { initSocket } from '../socket.js';
import ACTIONS from '../Actions.js';
import toast from 'react-hot-toast';
import {useParams,useNavigate} from 'react-router-dom';
import { useAppContext } from '../Context/AppContext.jsx';

const EditorPage = () => {
  const {setloadCode,clientsList,setclientsList,username}=useAppContext();
  const navigate=useNavigate();
  const { roomId } = useParams();
  const socketRef=useRef(null);

  useEffect(() => {
    const init =async()=>{
        // connection
        socketRef.current=await initSocket();
         
        //error handling during connection
        socketRef.current.on('connect_error',(err)=>handleErrors(err));
        function handleErrors(e) {
        console. log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/joinRoom');
        }


        socketRef.current.on('connect',()=>{
        console.log("connected")});
        socketRef.current.emit(ACTIONS.JOIN,{roomId,userName:username});

        //joining room
        socketRef.current.on(ACTIONS.JOINED,({clients,userName,socketId,code})=>{
            if(userName!==username){
                toast.success(`${userName} Joined Room`);
                console.log(`${userName} joined`);
            }
            setclientsList(clients);
            if(code){
            setloadCode(code);
            }
        });
        
        // disconneting
        socketRef.current.on(ACTIONS.DISCONNECTED,({socketId,userName,clients})=>{
              toast.success(`${userName} Left`);
              setclientsList(clients);
        })

    } 
    init();
  
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED,ACTIONS.DISCONNECTED);
    }
  }, []);

  // copy room 
   async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID Copied');
        } catch (err) {
            toast.error(`Can't copy the Room ID`);
            console.error(err);
        }
    }

    // leave room
    function leaveRoom() {
        navigate('/joinRoom');
    }
  
  return (
    <div className='flex'>

      {/* left bar */}
      <div className='px-4 py-5 w-[17.1rem] h-screen flex flex-col justify-between bg-black border-2 border-r-white'>
        <div>
            <span className='text-primary font-bold text-[1.5rem]'>SMART COLLAB</span>
            <h3 className='text-white mt-5 mb-4'>Connected</h3>

            <div className='flex gap-5 flex-wrap'>
                {clientsList.map((item,index)=>(
                  <div className='flex flex-col gap-1' key={index}>
                      <Avatar name={item.userName} size="50" round="14px" />
                      <span className='text-white text-xs text-center font-semibold'>{item.userName}</span>
                  </div>
                ))}
            </div>
        </div>

        <div className='flex flex-col'>
          <button className='py-1.5 bg-white rounded-lg font-bold' onClick={copyRoomId}>Copy Room ID</button>
          <button className='mt-5 py-1.5 bg-primary rounded-lg font-bold text-black' onClick={leaveRoom}>Leave</button>
        </div>
      </div>
    
      <div>
        <Editor socketRef={socketRef} roomId={roomId}/>
      </div>
    </div>
  )
}

export default EditorPage
