import React from 'react'
import { MdAccountCircle } from 'react-icons/md';


function ConnectedComponent(props) {
  return (
      <div className='lg:w-1/3 md:w-1/3 w-2/3 border-blue-500 sm:h-80 h-72 rounded-2xl border shadow-xl m-3' >
        <div className='flex items-center justify-center w-full'>
            <MdAccountCircle color="blue" size={50} className="mb-4" />
        </div>
        {(props && props != null) &&
            <div className='flex flex-col items-center justify-center w-full'>
                <h1 className='text-xl font-bold text-blue-500'>{props.name}</h1>
                <p className='px-4 text-justify text-lg text-blue-500'>{props.occupation}</p>
                <p className='px-4 text-justify text-green-500'>{props.email}</p>
                <p className='px-4 text-justify'>{props.bio}</p>
            </div>}
      </div>
  )
}

export default ConnectedComponent