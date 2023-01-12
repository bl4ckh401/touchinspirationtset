import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiMenuAltRight } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { MdAccountCircle } from 'react-icons/md'
import { fetchData } from '../Redux/actions';
import { connect } from 'react-redux';
import { NavData } from '../utils/NavData'

function Navigation(props) {
    const Navigate = useNavigate()
    console.log(props)
    return (
        <div className={props.active ? 'w-screen h-screen fixed m-0 lg:w-1/5 flex flex-col justify-start items-center z-20' : 'z-20 h-16 fixed m-0 w-screen flex flex-col justify-start items-center'}>
            <div className='w-full h-full'>
                <div className='w-screen h-16 bg-blue-500 flex flex-row'>
                   {props.active ? <div className='sm:hidden lg:w-1/5 flex flex-row justify-center items-center h-16'>
                       
                    </div>:<></>}
                    <div className={props.active ? 'items-center justify-between sm:w-full md:w-full  lg:w-full  h-full lg:justify-between lg:content-center lg:items-center flex' : 'items-center justify-between w-full lg:w-full  h-full lg:justify-between lg:content-center lg:items-center flex'}>                        
                        {
                            props.active ? <AiOutlineClose color="white" size={50} onClick={props.onClick} /> : <BiMenuAltRight color="white" size={50} onClick={props.onClick} />
                        }
                        <div className='flex flex-row justify-center items-center'>
                            <h3 className='text-white'>Welcome: Robert</h3>
                            <MdAccountCircle color="white" size={50} className="mr-4" />
                        </div>
                    </div>
                </div>
                {
                    props.active ?
                        <div className='bg-blue-500 h-screen m-0 w-full flex flex-col justify-start items-center'>
                            <ul className='pt-1 w-full justify-center items-center text-left pl-1'>
                                {NavData.map((item) => {
                                    const fetchAllData = async () => {
                                        await props.fetchData()
                                            .then(() => { Navigate(item.path) })
                                    }
                                    return (
                                        <div onClick={fetchAllData} className="w-full justify-center items-center text-center ">
                                            <li className='w-full border text-center px-1 py-3 text-l text-white'>{item.title.toUpperCase()}</li>
                                        </div>
                                    )
                                })}
                            </ul>
                        </div> : <></>
                }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)