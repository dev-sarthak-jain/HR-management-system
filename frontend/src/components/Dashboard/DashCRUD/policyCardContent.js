import React from 'react';
import { readableDate } from '../../common/set_date';

const PolicyCardContent = ({currentMode, category, content, policy_makers, regional_info, effective_date}) => {

  const date_object = readableDate(effective_date)

    return (
        <div className={` ${!currentMode ? `bg-chatTipBackground text-black`
                            :
                              `bg-nightModeDark text-white `}
                        rounded-t-lg px-2 md:px-7 py-4 space-y-2.5  border-transparent inter-justify`}>
                        <h1 className='text-xl font-bold md:text-3xl'>{category} </h1>
                        <p><span className='text-sm sm:text-[16px]'>Policy Makers:</span> {policy_makers} </p>
                        <p><span className='text-sm sm:text-[16px]'>Region:</span>  {regional_info}</p>
                        <p><span className='text-sm sm:text-[16px]'>Effective From:</span> <b>{date_object}</b></p>
                        <p className={`inter-justify ${!currentMode ? `bg-updatedPurple` : `bg-greenOnDarkMode`} text-white p-4 rounded-md`}>
                          {content}
                        </p>
                    </div>
    );
}

export default PolicyCardContent;
