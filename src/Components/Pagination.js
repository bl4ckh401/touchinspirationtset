import React from 'react';

const Pagination = ({ currentPage, handlePageChange, totalObjects, objectsPerPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalObjects / objectsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className='flex w-4/5 pt-24 h-fit bg-gray-100 flex-col justify-start items-center'>
            <ul className='flex flex-row'>
                {pageNumbers.map(number => (
                    <li key={number} className={currentPage === number ? 'active text-blue-500 text-xl p-10' : 'text-xl p-10'}>
                        <a onClick={() => handlePageChange(number)} href='#'>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
