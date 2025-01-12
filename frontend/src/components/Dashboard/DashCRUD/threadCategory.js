import React from 'react'

export default function ThreadCategory({ label, radioValue, onClick }) {
  return (
    <div className='flex justify-between'>
      <label htmlFor={radioValue}>{label}</label>
      <input
        onClick={onClick}
        type="radio"
        id={radioValue}
        name="category"
        value={radioValue}
        className='bg-greenOnDarkMode' />
    </div>
  )
}
