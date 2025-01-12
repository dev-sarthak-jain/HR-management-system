import React from 'react';

const ChatHelp = ({mode,chathelp, prompt1Clicked, prompt2Clicked}) => {
    return (
        <div className={`flex justify-center items-center text-center text-[16px] sm:text-lg mb-5`}>
    <div className='space-y-2'>
    <h2 className='font-bold  '>{chathelp.icon} {chathelp.mainPrompt}</h2>
    <p
    onClick={prompt1Clicked}
    className={`cursor-pointer rounded-full px-4 py-2.5
     ${`${mode ?
     "bg-chatTipBackground text-black" :
     "bg-blackCustom border-transparent placeholder-white"  }`}`}>
    {chathelp.prompt1}
    </p>
    <p
    onClick={prompt2Clicked}
    className={`cursor-pointer rounded-full  px-4 py-2.5
    ${`${mode ? "bg-chatTipBackground text-black" :
    "bg-blackCustom border-transparent placeholder-white"  }`}`}>
    {chathelp.prompt2}
    </p>
    </div>
    </div>
    );
}

export default ChatHelp;
