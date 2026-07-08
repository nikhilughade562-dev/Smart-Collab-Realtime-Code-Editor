import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-600 px-6 md:px-16 lg:px-24 xl:px-32 pt-14 mt-24 ">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-14 pb-12 border-b border-gray-300">
        
        {/* Brand */}
        <div className="max-w-md">
        <span className='text-primary font-bold text-[1.7rem]' onClick={()=>{navigate('/')}}>SMART COLLAB</span>
          <p className="mt-6 text-white text-sm leading-relaxed">
            <strong>Smart Collab</strong> A real-time collaborative coding platform featuring multi-language support. Users join secure room-based sessions to write, run, and sync code instantly, and seamless collaboration across connected participants.
          </p>
        </div>

        {/* Links & Newsletter */}
        <div className="flex flex-col sm:flex-row gap-14 flex-1 justify-end">
          
          
          {/* Newsletter */}
          <div className="max-w-sm">
            <h2 className="text-white font-semibold mb-4">
              Subscribe to our newsletter
            </h2>
            <p className="text-sm mb-5 text-white">
              Get the latest updates, AI insights, and product announcements
              delivered straight to your inbox.
            </p>
            <form className="flex items-center gap-2">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full border text-white border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-black text-sm px-4 py-2 rounded hover:opacity-90 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-xs md:text-sm mt-8 pb-6 text-gray-500 space-y-2">
        <p> Copyright 2026. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
