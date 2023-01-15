import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { BiMenuAltRight } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { MdAccountCircle } from 'react-icons/md'
import { fetchData } from '../Redux/actions';
import { connect } from 'react-redux';
import { NavData } from '../utils/NavData'

function Navigation(props) {
    const Navigate = useNavigate()
    const location = useLocation()
    console.log(props)
    return (
        <div className={props.active ? 'w-screen h-screen fixed m-0 lg:w-1/6 flex flex-col justify-start items-center z-20' : 'z-20 h-16 fixed m-0 w-screen flex flex-col justify-start items-center'}>
            <div className='w-full left-0 h-full'>
                <div className='w-screen h-16 lg:bg-black transition duration-1000 md:bg-black flex justify-end flex-row'>
                    <div className={props.active ? "items-center justify-between w-full md:w-full bg-white lg:w-5/6  h-full lg:justify-between lg:content-center lg:items-center flex" : 'items-center justify-between w-full lg:w-full  h-full lg:justify-between lg:content-center lg:items-center flex'}>                        
                        {
                            props.active ? <AiOutlineClose color="black" className='hover:cursor-pointer' size={50} onClick={props.onClick} /> : <BiMenuAltRight color={props.active ? 'black' : "white"} size={50} className='hover:cursor-pointer' onClick={props.onClick} />
                        }
                        <div className='hidden lg:flex lg:flex-row justify-center items-center'>
                            <h3 className={props.active ? "text-black lg:flex" : 'text-white lg:flex' }>Welcome: Robert</h3>
                            <MdAccountCircle color={props.active ? 'black' :"white" } size={50} className="mr-4" />
                        </div>
                    </div>
                </div>
                {
                    props.active ?
                        <div className='bg-black z-20 h-screen left-0 w-full flex flex-col justify-start items-center'>
                            <ul className='pt-1 w-full justify-center items-center text-left'>
                                {NavData.map((item) => {
                                    const fetchAllData = async () => {
                                        await props.fetchData()
                                            .then(() => { Navigate(item.path) })
                                    }
                                    return (
                                        <div onClick={fetchAllData} className={location.pathname === item.path ? "w-full hover:cursor-pointer justify-center bg-gray-700 items-center text-center" : "w-full hover:cursor-pointer justify-center items-center text-center"}>
                                            <li className='w-full text-center py-2 text-sm text-white'>{item.title.toUpperCase()}</li>
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