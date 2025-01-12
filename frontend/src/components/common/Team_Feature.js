import React from 'react';


const TeamFeature = ({ src, desc, text, width, height }) => {
    return (
        <div className='w-1/4 m-4 space-y-2'>
            <div className={``}>
                <img src={src} alt='' className={`bg-[#D9D9D9] ${height} ${width} border-none sm:shadow-2xl
                                                     mx-auto`} />
            </div>
            <p className='sm:text-2xl font-bold my-1'>{desc}</p>
            <p className='text-sm'>{text}</p>
        </div>
    );
}

export {TeamFeature};
