import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Pagination from '../Components/Pagination';
import { fetchData, searchData } from '../Redux/actions';

const SearchPage = ({ data, fetchData, searchData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [objectsPerPage] = useState(10);

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = data ? data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ):[];
    const lastIndex = currentPage * objectsPerPage;
    const firstIndex = lastIndex - objectsPerPage;
    const currentData = filteredData.slice(firstIndex, lastIndex);

    const handlePageChange = newPage => {
        setCurrentPage(newPage);
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        searchData(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
            />
            {searchTerm.length >= 4 ?
            <ul>
                    {currentData.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>

            :<></>}
        </div>
    );
};

const mapStateToProps = state => ({
    data: state.data
});

const mapDispatchToProps = {
    fetchData,
    searchData
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
