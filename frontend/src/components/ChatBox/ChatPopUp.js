import React from 'react';

const ChatPopUp = ({ handleCancel, handleClosePopUp, handleDelete, promptTarget, objectModel }) => {
    return (
        <div
            onClick={handleClosePopUp}
            className='h-full w-full flex justify-center
                    items-center bg-nightModeDark
                     text-black py-2.5 fixed top-0 left-0 z-50 bg-opacity-75'
        >

            <div className={`self-auto w-4/5 lg:w-2/5 bg-white text-black p-5`}>
                <p className='mb-7 font-bold' >Delete {objectModel}</p>
                <p className='my-5'>
                <span className='font-bold'>{promptTarget} </span> will be deleted.

                </p>
                <div className='mx-5 flex justify-end'>
                    <button
                        onClick={handleCancel}
                        className='hover:opacity-70 mx-2.5 px-3.5 py-2
                                 text-black rounded border-solid border-2'>
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className='bg-red-700 hover:bg-opacity-75
                                 mx-2.5 px-3.5 py-2 text-white rounded
                                 border-solid border-2'>
                        Delete
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ChatPopUp;
