import React from 'react'
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { BiConversation } from "react-icons/bi";
import { PiCardsBold , PiHandsPrayingDuotone } from "react-icons/pi";

function Walkthrough() {
  return (
    <div className='p4 my-8'>
    <h2 className='text-2xl sm:text-3xl lg:text-5xl font-bold mx-2.5 my-3 text-center'>
    How PolicyWeb Transforms Your Voice into Action</h2>

    <div className='flex justify-center flex-wrap'>
    {/* DESC 1 */}
    <div className='bg-greenOnDarkMode sm:bg-nightModeDark rounded-md
                        flex flex-wrap w-full sm:w-1/4 m-4 p-2.5 sm:space-y-4'>
            <div className={`my-auto w-[20%] sm:w-full`}>
           <BiConversation className='text-white text-[56px] mx-auto' />
            </div>
            <div className='w-[80%] sm:w-full text-left px-2 sm:text-center'>
            <p className='sm:text-2xl font-bold my-1'>Start a Conversation</p>
            <p className='inter-justify text-sm'>Share your thoughts and concerns with our AI chatbot.</p>
            </div>
        </div>


    {/* DESC 2 */}
    <div className='bg-greenOnDarkMode sm:bg-nightModeDark rounded-md
                        flex flex-wrap w-full sm:w-1/4 m-4 p-2.5 sm:space-y-4'>
            <div className={`my-auto w-[20%] sm:w-full`}>
            <BsFillChatLeftTextFill className='text-5xl border-none shadow-2xl
                                                     mx-auto'/>
            </div>
            <div className='w-[80%] sm:w-full text-left px-2 sm:text-center'>
            <p className='sm:text-2xl font-bold my-1'>Survey Creation</p>
            <p className='inter-justify text-sm'>Based on your conversation, a custom survey is generated.</p>
            </div>
        </div>

            {/* DESC 3 */}
    <div className='bg-greenOnDarkMode sm:bg-nightModeDark rounded-md
                        flex flex-wrap w-full sm:w-1/4 m-4 p-2.5 sm:space-y-4'>
            <div className={`my-auto w-[20%] sm:w-full`}>
            <PiCardsBold  className='text-6xl border-none shadow-2xl
                                                     mx-auto'/>
            </div>
            <div className='w-[80%] sm:w-full text-left px-2 sm:text-center'>
            <p className='sm:text-2xl font-bold my-1'>Policy Card Development:</p>
            <p className='inter-justify text-sm'>Each main concern or outcome leads to the creation of a policy card.</p>
            </div>
        </div>

            {/* DESC 4 */}
    <div className='bg-greenOnDarkMode sm:bg-nightModeDark rounded-md
                        flex flex-wrap w-full sm:w-1/4 m-4 p-2.5 sm:space-y-4'>
            <div className={`my-auto w-[20%] sm:w-full`}>
               <PiHandsPrayingDuotone className='text-6xl border-none shadow-2xl
                                                     mx-auto' />
            </div>
            <div className='w-[80%] sm:w-full text-left px-2 sm:text-center'>
            <p className='sm:text-2xl font-bold my-1'>Community Engagement.</p>
            <p className='inter-justify text-sm'>Join forums, discuss, and view data visualizations.</p>
            </div>
        </div>

        </div>
        </div>
  )
}

export default Walkthrough
