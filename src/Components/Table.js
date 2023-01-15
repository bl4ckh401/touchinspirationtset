import React from 'react';
import { FiEdit2, FiEye } from 'react-icons/fi';
import { MdAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Table = ({ data }) => {
    const Navigate = useNavigate()
    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th className="px-3 py-2text-left">Name</th>
                    <th className="hidden md:table-cell text-left px-3 py-2">Occupation</th>
                    <th className="hidden md:table-cell text-left px-3 py-2">Bio</th>
                    <th className="px-3 py-2 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} className='border-b hover:bg-gray-100 border-gray-300 border-t'>
                            <td className="px-3 py-2 flex justify-start h-full flex-row items-center">
                                <MdAccountCircle color="black" size={50} className="" />
                                <div className='justify-center text-center flex flex-col items-start'>
                                    <h5 className='font-bold text-left my-0'>{item.name}</h5>
                                    <p className='italic font-extralight text-left my-0'>{item.email}</p>
                                </div>
                            </td>
                        <td className="hidden md:table-cell px-3 py-2">{item.occupation}</td>
                        <td className="hidden md:table-cell px-3 py-2">{item.bio}</td>
                        <td className="px-3 py-2">
                            <div className='flex flex-row h-full hover:bg-gray-400 rounded-full justify-start items-center'>
                                <FiEye color="black" size={30} className=""
                                    onClick={() => {
                                    Navigate(`/view/${item._id}`) 
                                }} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
