import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    selectPolicyCardData,
    selectLoadingPage,
} from '../../redux/Slices/pagenationSlice';
import DashBotSearchBox from './DashMiscellaneous/DashBotSearchBox';
import DashPolicyCard from './DashMiscellaneous/DashPolicyCard';
import DashPagenation from './DashMiscellaneous/DashPagenation';
import { BsPlusLg } from 'react-icons/bs';
import { policySearchedLocation } from '../../redux/Slices/sharedUseEffectSlice';


const DashCardPanel = () => {
    const searched = useSelector(policySearchedLocation) //Input from filter by location in DashLocationSearchBox.js

    const policyCardData = useSelector(selectPolicyCardData).filter(item => {
        if(searched === ""){
            return item
        }else{
            // Check if searched term is in Policy card location
            if(item && item.location.toLowerCase().includes(searched.toLowerCase())){
                return item
            }
        }

    })


    const loadingnumber = useSelector(selectLoadingPage);
    const maxPageNumber = Math.ceil(policyCardData.length / 3);
    const trendsTotal = [1, 2, 3, 4];
    const loadingStatus = useSelector(state => state.pagenation.loading)


    useEffect(() => {

    },[loadingStatus])

    return (
        <>
            <h1 className='hidden md:block mb-5 text-white font-nunito md:text-xl lg:text-[36px] not-italic font-bold leading-normal'>
                Trending Policies
            </h1>
            {loadingStatus
            ?
            <div className='flex item-center justify-center h-full w-full'>
            <div
            className="my-4 animate-spin rounded-full h-16 w-16
            border-t-4 border-[#3C6E71]"></div>
            </div>
            :
            <div>
            {policyCardData && policyCardData.filter((_, index) => (index >= loadingnumber * 3 - 3 && index <= loadingnumber * 3 - 1))
                .map((data, index) => (
                    <article key={index} className='mb-10'>

                        <div className='flex justify-center flex-wrap md:flex-nowrap space-x-5 space-y-5 md:space-y-0'>
                            <section className='w-full md:w-[50%] '>
                            <DashPolicyCard data={data} />
                            </section>

                            {/* DATA ASIDE PANEL */}
                            <aside className='hidden md:block w-auto'>
                                <DashBotSearchBox />
                                <div className='flex flex-wrap w-full'>
                                    {trendsTotal.map((element, index) => (
                                        <div key={index} className='flex justify-center items-center
                    border-2 stretched-dash border-dashed  w-[45%] h-24 m-2.5 border-black'>
                                            <BsPlusLg className=' text-greenOnDarkMode
                                            font-bold text-5xl' />
                                        </div>)

                                    )}
                                </div>
                            </aside>
                        </div>
                    </article>
                ))}
            {policyCardData && (policyCardData.length > 3 && <DashPagenation maxPageNumber={maxPageNumber} />)}
            </div>
        }
        </>
    );
}

export default DashCardPanel;
