import React from 'react'
import Image1 from "../../assets/img/about2.png"
import Image2 from "../../assets/img/about3.png"

function Mission() {
    return (
        <div className='py-4 my-8'>

            <h2 className='hidden lg:block my-3 text-center text-4xl font-bold'>Our Mission</h2>
            <section className='flex justify-center p-4 flex-wrap text-center'>
                <div className='text-white p-3 w-full sm:w-2/5'>
                    <h1 className='text-2xl sm:text-3xl lg:text-5xl font-bold mx-2.5 my-3'>Empowering Democracy with Technology.</h1>
                    <p className='indent-1 inter-justify'>OpenPolitica is at the forefront of integrating artificial
                        intelligence with democratic processes. Our mission is to bridge
                        the gap between citizens and policy-makers,ensuring every voice
                        is heard and acted upon.</p>
                </div>
                <div className='flex justify-center items-center xl:items-start  mx-4 w-[310px] xl:w-[550px] '>
        <img className='h-3/4 w-full'  src={Image1} alt='' />
    </div>
            </section>

            <section className='flex justify-center p-4 flex-wrap text-center'>
                <div className='flex justify-center items-center xl:items-start mx-4 w-[310px] xl:w-[550px] bg-[#D9D9D9]order-last sm:order-first'>
                <img className='h-3/4 w-full' src={Image2} alt='' />
                </div>
                <div className='text-white p-3 w-full sm:w-2/5 order-first sm:order-last'>
                    <h1 className='text-2xl sm:text-3xl lg:text-5xl font-bold mx-2.5 my-3'>Amplifying Voices through Innovation</h1>
                    <p className='indent-1 inter-justify'>At OpenPolitica, we believe in harnessing the power
                        of AI to transform democracy. Our goal is to work collaboratively with
                        policymakers and political organizations to amplify the voices of the people.
                        We strive to make AI a catalyst for democratic change.</p>

                </div>
            </section>

        </div>
    )
}

export default Mission
