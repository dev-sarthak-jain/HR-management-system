import React from 'react'
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { ChatIconBot } from '../common/svg-icons/svgs';
import { PiCardsFill } from "react-icons/pi";
import { policyweb } from '../../mockups/About/Policyweb';

function Description() {
  return (
    <div className='my-5 flex justify-center p-4 flex-wrap text-center'>
      <section className='' id="policyweb">
        <h2 className='text-2xl sm:text-3xl lg:text-5xl font-bold mx-2.5 my-3'>What is PolicyWeb?</h2>

        {policyweb.map((texts, index) => (
          <p key={index} className='inter-justify my-4 sm:text-center'>{texts}</p>
        ))}
      </section>

      <div className='flex justify-center sm:justify-around flex-wrap'>
        {/* BOX 1 */}
        <div className='bg-greenOnDarkMode sm:bg-nightModeDark rounded-md
                        flex flex-wrap w-full sm:w-1/4 m-4 p-2.5 sm:space-y-4'>
            <div className={`my-auto w-[20%] sm:w-full`}>
            <ChatIconBot />
            </div>
            <div className='w-[80%] sm:w-full text-left px-2 sm:text-center'>
            <p className='sm:text-2xl font-bold my-1'>Natural Language Analysis</p>
            <p className='inter-justify text-sm'>Our AI chatbot delves deep into your conversation,
            extracting key outcomes and concerns.</p>
            </div>
        </div>

                {/* BOX 2 */}
                <div className='bg-greenOnDarkMode sm:bg-nightModeDark rounded-md
                        flex flex-wrap w-full sm:w-1/4 m-4 p-2.5 sm:space-y-4'>
            <div className={`my-auto w-[20%] sm:w-full`}>
            <BsFillChatLeftTextFill className='text-4xl sm:text-5xl border-none shadow-2xl
                                                     mx-auto'/>
            </div>
            <div className='w-[80%] sm:w-full text-left px-2 sm:text-center'>
            <p className='sm:text-2xl font-bold my-1'>Custom Surveys</p>
            <p className='inter-justify text-sm'>Each chat generates a unique survey, tailoring questions to your
            specific conversation.</p>
            </div>
        </div>

                {/* BOX 3 */}
                <div className='bg-greenOnDarkMode sm:bg-nightModeDark rounded-md
                        flex flex-wrap w-full sm:w-1/4 m-4 p-2.5 sm:space-y-4'>
            <div className={`my-auto w-[20%] sm:w-full`}>
            <PiCardsFill className='text-5xl sm:text-6xl border-none shadow-2xl
                                                     mx-auto'/>
            </div>
            <div className='w-[80%] sm:w-full text-left px-2 sm:text-center'>
            <p className='sm:text-2xl font-bold my-1'>Policy Cards</p>
            <p className='inter-justify text-sm'>These are the heart of PolicyWeb, enabling robust discussions in
            forums and showcasing relevant data visualizations, all within a user-friendly
            dashboard.</p>
            </div>
        </div>

      </div>

    </div>
  )
}

export default Description
