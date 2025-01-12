import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectLoadingPage,
    changePageNumber
} from '../../../redux/Slices/pagenationSlice';

const DashPagenation = (props) => {

    const dispatch = useDispatch();
    const currentPageNumber = useSelector(selectLoadingPage);

    const nextPage = () => {
        if (currentPageNumber < props.maxPageNumber) dispatch(changePageNumber(currentPageNumber+1));
    }

    const prevPage = () => {
        if (currentPageNumber > 1) dispatch(changePageNumber(currentPageNumber - 1));
    }

    // const exactPage = (event) => {
    //     event.preventDefault();
    //     if (event.key === 'Enter') {
    //         const newPage = parseInt(event.target.value);
    //         if (!isNaN(newPage) && newPage >= 1 && newPage <= maxNumber) {
    //             setCurrentNumber(newPage);
    //         }
    //     }
    // }

    return (
        <div className='flex justify-between items-center w-[200px]'>
            <button type='button' className='rotate-90' onClick={prevPage}>
                <svg className="text-[#474B7D] hover:text-lime-600"
                    width="23" height="16" viewBox="0 0 23 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.0915 14.9088C12.2911 15.9605 10.7089 15.9605 9.90848 14.9088L1.38655 3.71123C0.384508 2.39458 1.32348 0.5 2.97806 0.5L20.0219 0.5C21.6765 0.5 22.6155 2.39458 21.6135 3.71123L13.0915 14.9088Z"
                        fill="currentColor" />
                </svg>
            </button>
            <p className='text-white font-nunito text-[20px] not-italic font-medium leading-normal'>
                Page
            </p>
            <div className='bg-white text-center border-[1px] border-[#6B846B] rounded-[5px] w-10'>
                {currentPageNumber}
            </div>
            {/* <form>
            <input type='text'
                value={currentNumber}
                onChange={exactPage}
                className='border-1 border-[#6B846B] rounded-[5px] w-16'
            />
            </form> */}
            <p className='text-white font-nunito text-[20px] not-italic font-medium leading-normal'>
                of {props.maxPageNumber}
            </p>
            <button type='button' className='-rotate-90' onClick={nextPage}>
                <svg className="text-[#474B7D] hover:text-lime-600"
                    width="23" height="16" viewBox="0 0 23 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.0915 14.9088C12.2911 15.9605 10.7089 15.9605 9.90848 14.9088L1.38655 3.71123C0.384508 2.39458 1.32348 0.5 2.97806 0.5L20.0219 0.5C21.6765 0.5 22.6155 2.39458 21.6135 3.71123L13.0915 14.9088Z"
                        fill="currentColor" />
                </svg>
            </button>
        </div>
    );
}

export default DashPagenation;
