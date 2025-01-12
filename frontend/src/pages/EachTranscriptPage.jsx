import React from 'react';
import ChatSide from '../components/ChatBox/ChatSide';
import ChatBoxByTranscript from '../components/ChatBox/ChatBoxByTranscript';
import { MdCancelPresentation } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { chatSideOpen, toggleChatSideBar } from '../redux/Slices/sharedUseEffectSlice';

const EachTranscriptPage = () => {
    const dispatch = useDispatch()

    const sideBar = useSelector(state => chatSideOpen(state))
    const closeChatSide = () => {
        dispatch(toggleChatSideBar())
    }
    return (
        <div className='relative h-screen flex flex-wrap font-nunito font-medium box-border ' >
   <button
        className={`${sideBar ? "block" : "hidden"} lg:hidden text-4xl absolute top-2 left-[81%] z-10`}
        onClick={closeChatSide}>
        <MdCancelPresentation className='text-chatTipBackground' />
      </button>
            <ChatSide />
            <ChatBoxByTranscript />
        </div>
    );
}

export default EachTranscriptPage;
