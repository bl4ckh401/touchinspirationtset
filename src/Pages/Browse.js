import React, { useEffect, useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchData, searchData } from '../Redux/actions';
import SearchPage from './SearchPage';
import Pagination from '../Components/Pagination';
import LoadingPage from './LoadingPage';
function Browse(props) {
    const Navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [objectsPerPage] = useState(10);
    
    const handlePageChange = newPage => {
        setCurrentPage(newPage);
    };
    const lastIndex = currentPage * objectsPerPage;
    const firstIndex = lastIndex - objectsPerPage;
    const currentData = props.data ? props.data.slice(firstIndex, lastIndex) : [];

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        searchData(event.target.value);
    };
    const filteredData = props.data ? props.data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    useEffect(() => {
        setLoading(true)
        props.fetchData().then(() => setLoading(false))
    }, [])
    
  return (
      <div className={props.active ? 'flex w-4/5 pt-24 h-fit min-h-screen bg-gray-100 flex-col justify-start items-center' :'flex w-full pt-24  bg-gray-100 flex-col h-fit justify-center items-center'}>
          {loading ? <LoadingPage/>:
          <>
                  <div className='flex flex-col w-4/5'>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="text-primary border-2 border-primary rounded-md p-2 w-full"
                />
            </div>
                  <h1>Select/Click on the Employee to Edit the Detail:</h1>
            <div className='w-full justify-center items-center flex flex-col lg:flex-row md:flex-row flex-wrap'>
                {searchTerm.length >= 4 ?
                    <>
                        {(filteredData && filteredData != null) && filteredData.map((item) => {
                            return (
                                <div className='lg:w-1/3 md:w-1/3 w-2/3 border-blue-500 sm:h-80 h-72 rounded-2xl border shadow-xl m-3' id={item._id} key={item._id} onClick={() => {
                                    Navigate(`/edit/${item._id}`)
                                }}>
                                    <div className='flex items-center justify-center w-full'>
                                        <MdAccountCircle color="blue" size={50} className="mb-4" />
                                    </div>
                                    <div className='flex flex-col items-center justify-center w-full'>
                                        <h1 className='text-xl font-bold text-blue-500'>{item.name}</h1>
                                        <p className='px-4 text-justify text-lg text-blue-500'>{item.occupation}</p>
                                        <p className='px-4 text-justify text-green-500'>{item.email}</p>
                                        <p className='px-4 text-justify'>{item.bio}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                    : <>
                        {(currentData && currentData != null) && currentData.map((item) => {
                            return (
                                <div className='lg:w-1/3 md:w-1/3 w-2/3 flex-col border-blue-500 sm:h-80 h-72 rounded-2xl border shadow-xl m-3' id={item._id} key={item._id} onClick={() => {
                                    Navigate(`/edit/${item._id}`)
                                }}>
                                    <div className='flex items-center justify-center w-full'>
                                        <MdAccountCircle color="blue" size={50} className="mb-4" />
                                    </div>
                                    <div className='flex flex-col items-center justify-center w-full'>
                                        <h1 className='text-xl font-bold text-blue-500'>{item.name}</h1>
                                        <p className='px-4 text-justify text-lg text-blue-500'>{item.occupation}</p>
                                        <p className='px-4 text-justify text-green-500'>{item.email}</p>
                                        <p className='px-4 text-justify'>{item.bio}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </>}
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
