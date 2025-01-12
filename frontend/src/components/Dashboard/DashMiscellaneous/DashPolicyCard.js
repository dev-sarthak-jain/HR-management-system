import React, { useState } from 'react';
import { readableDate } from '../../common/set_date';
import { Link } from 'react-router-dom';

const DashPolicyCard = (props) => {
    const dateObject = readableDate(props.data.effective_date)

    return (
        <Link to={`/dashboard/${props.data.eid}`} >
        <div className='text-justify parent relative p-3 ml-3 h-[300px] bg-nightModeDark
         text-white rounded-[5px]'
            style={{ cursor: 'pointer', boxShadow:'5px 5px 10px rgba(0, 0, 0, 0.5)' }}
        >
            <p className='text-white font-nunito text-[12px] not-italic font-semibold leading-normal'>
            Effective From: {dateObject}
            </p>
            <p className='text-white font-nunito text-[20px] not-italic font-bold leading-normal'>
            {props.data.category}
            </p>
            <p className='text-white font-nunito text-[12px] not-italic font-semibold leading-normal'>
            Policy Makers: {props.data.policy_makers}
            </p>
            <p className='text-white font-nunito text-[12px] not-italic font-semibold leading-normal'>
            Region: {props.data.regional_info}
            </p>
            <div className='absolute bottom-0 left-3 right-3 h-[168px] overflow-y-scroll no-scrollbar bg-[#3C6E71] p-2 rounded-[5px]'>
                <p className='text-white font-nunito text-[9px] not-italic font-medium leading-normal'>
                    {props.data.content}
                </p>
            </div>
        </div>
        </Link>
    );
}

export default DashPolicyCard;
