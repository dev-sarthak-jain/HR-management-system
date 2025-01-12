import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from '../../../store/auth/selectors';
import { userInfo } from "../../../redux/Selectors/selectors"

const DashTitle = () => {
    let userName;
    const user = useSelector(state => userInfo(state))
    if(user){
        userName = user.first_name + " " + user.last_name;
    }
        const token = useSelector(getToken) || userName || 'Jane Doe';

        const [username, setUsername] = useState(token);

        const changeUserName = username => {
            setUsername(token);
        }

        useEffect(() => {
            changeUserName(token);
        }, [token]);

    return (
        <div>
            <div className='flex flex-col space-y-1 md:space-y-3 justify-center items-center'>
                <h1
                    className='text-white text-center font-nunito
                            text-3xl md:text-4xl lg:text-6xl not-italic font-bold leading-normal'>
                    Welcome Back,
                </h1>
                <h1 className='text-white text-center font-nunito
                            text-3xl md:text-4xl lg:text-6xl not-italic font-bold leading-normal'>
                    {username}
                </h1>
            </div>
            <div className='mt-3 lg:mt-6 h-5 lg:h-16 flex justify-center items-center'>
                <p className='text-white text-center font-nunito text-[16px] md:text-lg lg:text-3xl not-italic
                            font-medium leading-normal'>
                    How may we help you today?
                </p>
            </div>
        </div>
    );
}

export default DashTitle;
