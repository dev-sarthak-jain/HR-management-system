import React, { useState } from 'react';
import { AiFillCaretDown } from "react-icons/ai"

const DashCollapseList = () => {
    const [isTopicCollapsed, setIsTopicCollapsed] = useState(true);
    const [isDataCollapsed, setIsDataCollapsed] = useState(true);
    const [isTypeCollapsed, setIsTypeCollapsed] = useState(true);

    const toggleCollapse = (section) => {
        switch (section) {
            case "topic":
                setIsTopicCollapsed((prev) => !prev);
                break;
            case "data":
                setIsDataCollapsed((prev) => !prev);
                break;
            case "type":
                setIsTypeCollapsed((prev) => !prev);
                break;
            default:
                break;
        }
    };

    const collapseStyles = {
        collapse: {
            maxHeight: '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease-out',
        },
        collapseButton: {
            cursor: 'pointer',
        },
        collapseOpen: {
            maxHeight: '1000px',
        },
    };

    return (
        <div className='md:w-3/4 space-y-3'>
            <div className='border-b-2 border-white'>
                <div className='flex justify-between lg:h-[64px] items-center p-0'
                    style={collapseStyles.collapseButton} onClick={() => toggleCollapse("topic")}
                >
                    <p className='text-white font-nunito lg:text-[20px] not-italic font-medium leading-normal'>
                        Topic
                    </p>
                    <button type='button' className={isTopicCollapsed? `rotate-0`:`rotate-180`}>
                    <AiFillCaretDown className="my-2 text-[#474B7D] hover:text-lime-600 text-2xl" />
                    </button>
                </div>
                <div className='p-0'
                    style={{
                        ...collapseStyles.collapse,
                        ...(isTopicCollapsed ? {} : collapseStyles.collapseOpen),
                    }}
                >
                    <div className='flex justify-between p-1'>
                        <p className='text-white font-nunito text-[16px] not-italic font-medium leading-normal'>
                            Gun Control
                        </p>
                        <input type="checkbox" className="cursor-pointer w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                    <div className='flex justify-between p-1'>
                        <p className='text-white font-nunito text-[16px] not-italic font-medium leading-normal'>
                            Oil Prices
                        </p>
                        <input type="checkbox" className="cursor-pointer w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                    <div className='flex justify-between p-1'>
                        <p className='text-white font-nunito text-[16px] not-italic font-medium leading-normal'>
                            Clean Water
                        </p>
                        <input type="checkbox" className="cursor-pointer w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                    <div className='flex justify-between p-1'>
                        <p className='text-white font-nunito text-[16px] not-italic font-medium leading-normal'>
                            Labor Laws
                        </p>
                        <input type="checkbox" className="cursor-pointer w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                </div>
            </div>
            <div className='border-b-2 border-white'>
                <div className='flex justify-between lg:h-[64px] items-center p-0'
                    style={collapseStyles.collapseButton} onClick={() => toggleCollapse("data")}
                >
                    <p className='text-white font-nunito lg:text-[20px] not-italic font-medium leading-normal'>
                        Date
                    </p>
                    <button type='button' className={isDataCollapsed? `rotate-0`:`rotate-180`}>
                    <AiFillCaretDown className="my-2 text-[#474B7D] hover:text-lime-600 text-2xl" />
                    </button>
                </div>
                <div className='p-0'
                    style={{
                        ...collapseStyles.collapse,
                        ...(isDataCollapsed ? {} : collapseStyles.collapseOpen),
                    }}
                >
                    <div className='flex justify-between p-1'>
                        <p className='text-white font-nunito text-[16px] not-italic font-medium leading-normal'>
                            Gun Control
                        </p>
                        <input type="checkbox" className="cursor-pointer w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                    <div className='flex justify-between p-1'>
                        <p className='text-white font-nunito text-[16px] not-italic font-medium leading-normal'>
                            Oil Prices
                        </p>
                        <input type="checkbox" className="cursor-pointer w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                    <div className='flex justify-between p-1'>
                        <p className='text-white font-nunito text-[16px] not-italic font-medium leading-normal'>
                            Clean Water
                        </p>
                        <input type="checkbox" className="cursor-pointer w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                    <div className='flex justify-between p-1'>
                        <p className='text-white font-nunito text-[16px] not-italic font-medium leading-normal'>
                            Labor Laws
                        </p>
                        <input type="checkbox" className="cursor-pointer w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                </div>
            </div>
            <div className='border-b-2 border-white'>
                <div className='flex justify-between lg:h-[64px] items-center p-0'
                    style={collapseStyles.collapseButton} onClick={() => toggleCollapse("type")}
                >
                    <p className='text-white font-nunito lg:text-[20px] not-italic font-medium leading-normal'>
                        Policy Type
                    </p>
                    <button type='button' className={isTypeCollapsed? `rotate-0`:`rotate-180`}>
                    <AiFillCaretDown className="my-2 text-[#474B7D] hover:text-lime-600 text-2xl" />
                    </button>
                </div>
                <div className='p-0'
                    style={{
                        ...collapseStyles.collapse,
                        ...(isTypeCollapsed ? {} : collapseStyles.collapseOpen),
                    }}
                >
                    <div className='flex justify-between p-1'>
                        <p className='text-white font-nunito text-[16px] not-italic font-medium leading-normal'>
                            Gun Control
                        </p>
                        <input type="checkbox" className="cursor-pointer w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                    <div className='flex justify-between p-1'>
                        <p className='text-white font-nunito text-[16px] not-italic font-medium leading-normal'>
                            Oil Prices
                        </p>
                        <input type="checkbox" className="cursor-pointer w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                    <div className='flex justify-between p-1'>
                        <p className='text-white font-nunito text-[16px] not-italic font-medium leading-normal'>
                            Clean Water
                        </p>
                        <input type="checkbox" className="cursor-pointer w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                    <div className='flex justify-between p-1'>
                        <p className='text-white font-nunito text-[16px] not-italic font-medium leading-normal'>
                            Labor Laws
                        </p>
                        <input type="checkbox" className="cursor-pointer w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashCollapseList;
