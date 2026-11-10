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
  const [showLeaveModal, setShowLeaveModal] = useState(false);

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
        localStorage.removeItem("username");
        navigate('/joinRoom');
    }

    function handleLeaveClick() {
        setShowLeaveModal(true);
    }

    function cancelLeave() {
        setShowLeaveModal(false);
    }

    function confirmLeave() {
        setShowLeaveModal(false);
        leaveRoom();
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
          <button className='mt-5 py-1.5 bg-primary rounded-lg font-bold text-black'  onClick={handleLeaveClick}>Leave</button>
        </div>
      </div>

      {showLeaveModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

        <div className="w-full max-w-md bg-[#1e1e1e] border border-gray-700 rounded-xl p-6 shadow-2xl">

            {/* Warning Icon */}
            <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
                    <span className="text-red-500 text-3xl">⚠</span>
                </div>
            </div>

            {/* Heading */}
            <h2 className="text-white text-xl font-bold text-center mb-2">
                Leave this Room?
            </h2>

            <p className="text-gray-400 text-sm text-center mb-5">
                Are you sure you want to leave this collaboration session?
            </p>

            {/* Warning Message */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-400 text-sm font-semibold mb-1">
                    Unsaved Code Warning
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                    Your code is temporarily stored and will not be
                    permanently saved. Once the last participant leaves
                    the room, all room data will be deleted and cannot
                    be recovered.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">

                <button
                    onClick={cancelLeave}
                    className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-300 font-semibold hover:bg-gray-700 transition"
                >
                    Cancel
                </button>

                <button
                    onClick={confirmLeave}
                    className="flex-1 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                >
                    Leave Room
                </button>

            </div>

        </div>
    </div>
)}
    
      <div>
        <Editor socketRef={socketRef} roomId={roomId}/>
      </div>
    </div>
  )
}

export default EditorPage
