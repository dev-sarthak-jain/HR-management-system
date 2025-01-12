import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { policySearchedLocation, searchedLocation } from '../../../redux/Slices/sharedUseEffectSlice';
// import { policySearchedLocation } from '../../../../redux/Slices/sharedUseEffectSlice';

const DashLocation = ({}) => {
    const dispatch = useDispatch()
    const locX = useSelector(policySearchedLocation)
    
    const locationOnChange = (event) => {
        event.preventDefault();
    };
    

    return (
        <form onSubmit={locationOnChange}>
            <div className="relative">
                <input
                    className="h-[32px] text-[14px] w-[100%] pl-4 pr-10 bg-white rounded-[10px] border-[1px solid #6B846B]
                    focus:ring-blue-50 focus:border-blue-50 block"
                    type="text"
                    name="locationSearchKey"
                    value={locX}
                    onChange={(e) => {
                        dispatch(
                            searchedLocation({
                                location: e.target.value
                            })
                        )
                    }}
                    id="locationSearchKey"
                    placeholder="You can enter a location here..."
                    required
                />
                <button
                    className="absolute inset-y-0 right-0 pr-4"
                    type="submit"
                >
                    <svg className="text-[#083207] hover:text-lime-600"
                        fill="none" width="16" height="17" viewBox="0 0 16 17"
                    >
                        <path d="M11.4351 10.3138H10.7124L10.4563 10.0606C11.3838 8.958 11.8935 7.55033 11.8925 6.0945C11.8925 4.88912 11.5438 3.71081 10.8904 2.70858C10.237 1.70634 9.30832 0.925197 8.22179 0.463919C7.13525 0.00264065 5.93966 -0.118051 4.7862 0.117107C3.63274 0.352264 2.57322 0.932709 1.74162 1.78504C0.910021 2.63737 0.343696 3.72331 0.114258 4.90552C-0.115179 6.08774 0.00257642 7.31314 0.452634 8.42676C0.902692 9.54039 1.66484 10.4922 2.64269 11.1619C3.62055 11.8316 4.7702 12.189 5.94626 12.189C7.4191 12.189 8.77301 11.6358 9.8159 10.7169L10.0629 10.9795V11.7202L14.6369 16.3989L16 15.0018L11.4351 10.3138ZM5.94626 10.3138C3.66838 10.3138 1.82962 8.42916 1.82962 6.0945C1.82962 3.75984 3.66838 1.87523 5.94626 1.87523C8.22413 1.87523 10.0629 3.75984 10.0629 6.0945C10.0629 8.42916 8.22413 10.3138 5.94626 10.3138Z"
                            fill="currentColor" />
                    </svg>
                </button>
            </div>
        </form>
    );
}

export default DashLocation;