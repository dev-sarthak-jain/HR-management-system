import React from 'react'
import { HashLink } from 'react-router-hash-link';
import Image1 from "../../assets/img/about1.png"


function Intro() {
  return (
    <div>
        <section className='my-5 flex justify-center p-4 flex-wrap text-center'>
    <div className='text-white p3 sm:py-3 w-full sm:w-2/5'>
        <h2 className='text-2xl sm:text-3xl lg:text-5xl font-bold mx-2.5 my-3'>Hello, we are OpenPolitica.</h2>
        <p className='inter-justify '> OpenPolitica introduces PolicyWeb, a platform that fundamentally changes how
        citizens engage with policy-making through an advanced chatbot designed for nuanced conversations about individual
        concerns, issues, and desired outcomes. This chatbot is central to a process that employs Q methodology
         within custom surveys, specifically tailored to each interaction. These surveys discern the primary outcomes
          and needs from wider discussions, aiming to shift the focus towards what citizens genuinely seek from policy-making,
           away from the often divisive and emotionally charged issues that dominate current political discourse...
           <HashLink to="/about#policyweb" smooth className='text-sm text-blue-600 italic'>Read More</HashLink></p>

    </div>
    <div className='flex justify-center items-center mt-4 mx-4 w-[310px]  xl:w-[550px] '>
        <img className='sm:h-3/4 w-full' src={Image1} alt='' />
    </div>
    </section>
    </div>
  )
}

export default Intro
