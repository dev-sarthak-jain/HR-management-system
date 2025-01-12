import React from 'react';
import { Link } from 'react-router-dom';
import BotIcon from "./botIcon"
import { AiOutlineArrowLeft, AiOutlinePlus} from "react-icons/ai"
import { BsChevronCompactDown, BsDot } from "react-icons/bs"
import { useDispatch } from 'react-redux';
import { toggleChatSideBar } from '../../redux/Slices/sharedUseEffectSlice';
import { useNavigate } from 'react-router-dom';

const ChatSideTop = ({userHomeUrl}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const hideShatBar = () => {
        dispatch(toggleChatSideBar())
    }

    const gotoDashboard = () => {
        hideShatBar()
        navigate("/")
    }

    return (
        <div>
        <div className='flex mx-2 mb-4'>

        <AiOutlineArrowLeft onClick={gotoDashboard} className="mt-7 mx-2 text-4xl inline" />

        <div className='flex'>
        <BotIcon />
        <div className='mt-5 mx-2'>
        <p>HR assistant</p>

        </div>
        </div>
        </div>

        <div className="m-3 p-2 border-2 border-opacity-60 mb-8 rounded-lg border-white"
        onClick={hideShatBar}
        >
        <Link to={userHomeUrl} className='block hover:opacity-60' >
        <AiOutlinePlus className="text-2xl mx-2.5 inline"/>New Chat
        </Link>
        </div>
        </div>
    );
}

export default ChatSideTop;