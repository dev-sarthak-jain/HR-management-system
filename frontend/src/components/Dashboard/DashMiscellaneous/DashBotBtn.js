import React from 'react';
import { useNavigate } from 'react-router-dom';

const BotBtn = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/chat');
    };

    return (
        <div className='flex w-[470px] h-[64px] justify-center items-center'>
            <div className='text-white text-center font-nunito text-[16px] lg:text-[24px] not-italic
                            font-medium leading-normal underline'
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
            >
                OpenPolitica Bot
            </div>
        </div>
    );
}

export default BotBtn;
