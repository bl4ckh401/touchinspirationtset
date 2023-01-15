import React, { useEffect, useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Papa from 'papaparse';
import { fetchData, searchData } from '../Redux/actions';
import SearchPage from './SearchPage';
import Pagination from '../Components/Pagination';
import LoadingPage from './LoadingPage';
import Breadcrumbs from '../Components/BreadCrumbs';
import { AiOutlineCloudDownload, AiOutlineSearch } from 'react-icons/ai';
import Table from '../Components/Table';

const crumbs = [
    { path: '/', label: 'Employees List' },
    { path: '/view/:id', label: 'Employee Details' },
    { path: '/edit/:id', label: 'Update Employee Details' },
];
function Browse(props) {
//Declarations of state and variables
    const Navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [objectsPerPage] = useState(10);
    const [search, setSearch] = useState(false)
    const data = props.data ? props.data : [];

    const lastIndex = currentPage * objectsPerPage;
    const firstIndex = lastIndex - objectsPerPage;
    const currentData = props.data ? props.data.slice(firstIndex, lastIndex) : [];
//End of declaration of variables

//Fuction for Changing the pages
    const handlePageChange = newPage => {
        setCurrentPage(newPage);
    };

//Fuction for Searching for a certain user
    const handleSearch = event => {
        setSearchTerm(event.target.value);
        searchData(event.target.value);
    };

//Fuction for filtering Data based on the name of Employee
    const filteredData = props.data ? props.data.filter(item =>
        item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

//Fuction for downloading Empoyee data as CSVs
    const downloadCSV = (data, fileName) => {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `${fileName}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
//Function to handle download button clicked
    const handleDownload = () => {
        downloadCSV(data, 'users');
    };

    useEffect(() => {
        setLoading(true)
        props.fetchData().then(() => setLoading(false))
    }, [])
    
  return (
      <div className={props.active ? 'flex w-4/5 pt-16 z-10 h-fit min-h-screen bg-gray-100 flex-col justify-start items-center' :'flex w-full bg-gray-100 pt-16 flex-col h-fit justify-center items-center'}>
          {/* <Breadcrumbs crumbs={crumbs} /> */}
          {loading ? <LoadingPage/>:
          <>
            <div className='w-11/12 justify-center items-center mt-2 flex flex-col bg-white lg:flex-row md:flex-row flex-wrap shadow-gray-400 shadow-lg'>
                <div className='flex flex-row bg-white justify-between mt-2 w-full'>
                    {search ? 
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="text-primary border-2 border-primary rounded-md p-2 w-10/12"
                    /> 
                    : 
                    <h1 className='text-3xl px-3'>All Employees</h1>}
                    <div className='flex flex-row justify-evenly w-2/12 items-center'>
                        <AiOutlineSearch color="black" size={40} className='hover:bg-gray-300 hover:cursor-pointer' onClick={()=>setSearch(!search)}/>
                        <AiOutlineCloudDownload color="black" className='hover:bg-gray-300 hover:cursor-pointer' size={40} onClick={handleDownload} />
                    </div>
                </div>
                <Table data={searchTerm.length >= 2 ? filteredData : currentData}/>
            </div>
            <Pagination
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                totalObjects={props.data ? props.data.length : 0}
                objectsPerPage={objectsPerPage}
            />
          </>
          }     
    </div>
  )
}
function mapStateToProps(state) {
    return {
        data: state.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch(fetchData()),
        searchData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
