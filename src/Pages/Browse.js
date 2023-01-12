import React, { useEffect, useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchData } from '../Redux/actions';
function Browse(props) {
    const Navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        setLoading(true)
      props.fetchData();
      setLoading(false)
    }, [])
    
  return (
      <div className={props.active ? 'flex w-4/5 pt-24 h-fit min-h-screen bg-gray-100 flex-col justify-center items-center' :'flex w-full pt-24  bg-gray-100 flex-col h-fit justify-center items-center'}>
          {loading ? <h1>Loading...........</h1>:<div className='w-full justify-center items-center flex flex-col lg:flex-row md:flex-row flex-wrap'>
              {(props.data && props.data != null) && props.data.map((item) => {
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
          </div>}
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
        fetchData: () => dispatch(fetchData())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
