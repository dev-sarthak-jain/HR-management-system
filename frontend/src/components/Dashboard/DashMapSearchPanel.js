import React, { useState } from 'react';
import DashLocationSearchBox from './DashMiscellaneous/DashLocationSearchBox';
import DashCollapseList from './DashMiscellaneous/DashCollapseList';
import OpenPolMapComponent from "./DashMap/OpenPolMapComponent";
import { MdOutlineCancel } from "react-icons/md";

const DashMapSearchPanel = ({hideMap}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className={`relative p-3 ${hideMap ? "hidden" : "block" }
        md:block bg-[#284B63] md:bg-nightModeDark`}>
            <h1 className='hidden md:block text-white font-nunito md:text-xl
             lg:text-[36px] not-italic font-bold leading-normal'>
                Filter By:
            </h1>
            <p className='text-white font-nunito text-sm lg:text-[20px] not-italic
             font-medium leading-normal'>
                Location:
            </p>
            <DashLocationSearchBox />
            <div className='mt-[24px] flex'>
            <div className='relative flex w-full h-[250px] md:h-[484px]
             bg-[#2c912c] justify-center items-center '>

                {/* MAP COMPONENTS */}
                {!isModalOpen && <OpenPolMapComponent />}
                {/* MAP TEXT */}
                 <div className='flex sm:hidden justify-center align items-center
                  bg-[#aeabab] bg-opacity-75 w-full h-full absolute top-0 left-0 z-10'>
                 <button
                 onClick={openModal}
                 className='py-3 px-8 rounded-md bg-[#284B63] hover:opacity-80
                  text-white'>
                    View Map
                 </button>
                 </div>
                </div>


            </div>
            <div className='mt-[28px]'>
                <DashCollapseList />
            </div>

            {/* MAP POP-UP */}
           {isModalOpen && <div className='h-full w-full flex justify-center items-center
            bg-nightModeDark text-black py-2.5 fixed top-0 left-0 z-50 bg-opacity-75'>
                {/* CLOSE MAP POP-UP */}
                <MdOutlineCancel
                onClick={closeModal}
                 className='cursor-pointer hover:opacity-60 absolute right-2 top-5 z-[55] text-4xl' />
                {/* MAP */}
                <OpenPolMapComponent />
            </div> }


        </div>
    );
}

export default DashMapSearchPanel;
