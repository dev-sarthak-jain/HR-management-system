import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ThreadCategory from './threadCategory'
import { AiFillCaretDown } from "react-icons/ai"
import CommentSection from './CommentSection'
import { selectNumberOfComments, sortBySlicer } from '../../../redux/Slices/sharedUseEffectSlice'

function Thread() {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const numberOfComments = useSelector(selectNumberOfComments)


    const toggleSort = () => {
        setIsOpen(!isOpen)
    }

    const sortByFormat = (e) => {
        dispatch(
            sortBySlicer({
                sortByCategory : e.target.value
            })
        )
    }

    useEffect(() => {

    },[numberOfComments])


    return (
        <div className='lg:p-4'>

            {/* ONLY SHOW ON SCREENS SMALLER THAN LAPTOPS */}


        <div className='mt-4 flex justify-between lg:hidden w-full'>
            <h1 className='text-xl py-2 px-5'>Thread</h1>

            {numberOfComments > 3
            &&
            <p onClick={toggleSort}
            className={`${ isOpen ? "bg-[#284B63]" : "bg-nightModeDark" } text-sm p-3 w-[30%]`}
            >Sort By<AiFillCaretDown className="inline text-xs" />
            </p> }

            </div>


            <div className='flex md:mx-4 flex-wrap'>

                {/* SORT CATEGORY */}
                {numberOfComments > 3
                &&
                <section
                className={` ${isOpen ? "block" : "hidden"} lg:block w-full lg:w-1/5 p-4 space-y-4 bg-[#284B63] lg:bg-nightModeDark`}>
                    <div className='hidden lg:flex justify-between '>
                        <p className='text-3xl'>Sort By:</p>
                         <AiFillCaretDown className="my-2 text-2xl" />
                    </div>

                    <ThreadCategory
                        label="Top Trending"
                        radioValue="top_trending"
                        onClick={sortByFormat}
                    />
                    <ThreadCategory
                        label="Most Replies"
                        radioValue="most_replies"
                        onClick={sortByFormat}
                    />
                    <ThreadCategory
                        label="Most Reactions"
                        radioValue="most_reactions"
                        onClick={sortByFormat}
                    />
                    <ThreadCategory
                        label="Most Recent"
                        radioValue="most_recent"
                        onClick={sortByFormat}
                    />
                    {/* Create redux slice that its state changes by category
                     and filter the comments array by the clicked category */}

                </section>}


                {/* COMMENT SECTION */}
                <main className='md:mx-3 w-[100%] lg:w-[70%] my-4'>
                    <CommentSection />
                </main>


            </div>

        </div>
    )
}

export default Thread
