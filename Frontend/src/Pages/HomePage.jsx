import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Features from '../Components/Features'
import Footer from '../Components/Footer'

const HomePage = () => {
  return (
    <div className='bg-black'>
      <Navbar/>
      <Hero/>
      <Features/>
      <Footer/>
    </div>
  )
}

export default HomePage
