import React from 'react';
import DashTitle from './DashMiscellaneous/DashTitle';
import DashSearchBox from './DashMiscellaneous/DashSearchBox';
import DashBotBtn from './DashMiscellaneous/DashBotBtn';

const DashHeader = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='mt-10 lg:mt-24'><DashTitle /></div>
            <div className='mt-10'><DashSearchBox /></div>
            <div className='mb-7'><DashBotBtn /></div>
        </div>
    );
}

export default DashHeader;
