import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, handlePageChange, totalObjects, objectsPerPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalObjects / objectsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className='flex w-full h-fit bg-gray-100 flex-col justify-start items-center'>
            <ul className='flex flex-row'>
                <li className='text-xl px-10 py-3'>
                    <a onClick={() => handlePageChange(currentPage - 1)} href='#'>
                        <FaChevronLeft className='text-blue-500' />
                    </a>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={currentPage === number ? 'text-black text-lg px-10 py-3' : 'text-black text-lg px-10 py-3'}>
                        <a onClick={() => handlePageChange(number)} className={currentPage === number ? 'text-blue-500' : 'text-black'} href='#'>{number}</a>
                    </li>
                ))}
                <li className='text-xl px-10 py-3'>
                    <a onClick={() => handlePageChange(currentPage + 1)} href='#'>
                        <FaChevronRight className='text-blue-500' />
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
