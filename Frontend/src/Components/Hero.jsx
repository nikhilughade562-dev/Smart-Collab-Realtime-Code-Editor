import React from 'react'
import {useNavigate} from 'react-router-dom'


const Hero = () => {
  const navigate=useNavigate();
  return (
     <section className="px-4 sm:px-20 xl:px-32 relative flex flex-col w-full justify-center bg-cover bg-no-repeat min-h-screen">
      
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-6xl font-semibold mx-auto font-display leading-tight text-white">
         Write, Run, and <span className='text-primary'>Collaborate on code</span>  <br />
          <span className="text-white">All in one place.</span>
        </h1>

        <p className="mt-5 max-w-xs sm:max-w-lg 2xl:max-w-xl mx-auto text-white text-[1.3rem] ">
         Real-time collaborative coding with multi-language support, Code execution, and seamless sharing.
        </p>
      </div>

      {/* Call to Action */}
      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
          onClick={() => navigate("/joinRoom")}
          className="bg-primary text-black font-semibold px-10 py-3 rounded-lg hover:scale-105 active:scale-95 transition">
          Create Room
        </button>
      </div>

    </section>
  )
}

export default Hero
