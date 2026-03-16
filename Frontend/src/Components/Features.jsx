import React from 'react'
import features from '../assets/Features.js'

const Features = () => {
  return (
    <div>
        <h2 className="text-center mb-20 text-white text-[42px] font-semibold">Features We Offer</h2>

      <div className="flex justify-center flex-wrap gap-3">
      {features.map((feature) => (
        <div key={feature.id} className=" flex flex-col p-5 rounded w-96 border-2 border-gray-500">
          <img className="w-14 m-3 rounded-2xl" src={feature.image} alt="" />
          <h3 className="mt-5 mb-3 text-lg font-semibold text-primary">{feature.title}</h3>
          <p className="mb-3 text-lg font-semibold text-white">{feature.description}</p>
        </div>
      ))}

    </div>

    </div>
    
  )
}

export default Features
