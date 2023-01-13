import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchSingleData, createData } from '../Redux/actions';
function CreateEmployee(props) {
    let id = '';
    function generateid() {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 11; i++) {
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return id;
    }
    id = generateid();

 
    useEffect(() => {
        console.log(id);
    }, [])
    

  return (
      <div className={props.active ? 'flex w-4/5 pt-24 h-fit min-h-screen bg-gray-100 flex-col justify-start items-center' : 'flex w-full pt-24  bg-gray-100 flex-col h-fit justify-center items-center'}>
        <div className='w-full justify-center items-center flex flex-col lg:flex-row md:flex-row flex-wrap'>
      <div className='flex flex-col w-4/5'>
          <input
              type="text"
              value={props.name}
              onChange={event => props.updateName(event.target.value)}
              placeholder="Name"
              className="text-primary border-2 border-primary rounded-md p-2"
          />
          <input
              type="email"
              value={props.email}
              onChange={event => props.updateEmail(event.target.value)}
              placeholder="Email"
              className="text-primary border-2 border-primary rounded-md p-2"
          />
          <input
              type="text"
              value={props.occupation}
              onChange={event => props.updateOccupation(event.target.value)}
              placeholder="Occupation"
              className="text-primary border-2 border-primary rounded-md p-2"
          />
          <textarea
              value={props.bio}
              onChange={event => props.updateBio(event.target.value)}
              placeholder="Bio"
              className="text-primary border-2 border-primary rounded-md p-2"
          ></textarea>
          {console.log(id)}
          <button className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded-full" onClick={() => props.createData(id)}>
              Create New Employee
          </button>

      </div>
      </div>
      </div>
  )
}
function mapStateToProps(state) {
    return {
        name: state.name,
        bio: state.bio,
        email: state.email,
        occupation: state.occupation,
        data: state.data
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateName: name => dispatch({ type: 'UPDATE_NAME', payload: name }),
        updateBio: bio => dispatch({ type: 'UPDATE_BIO', payload: bio }),
        updateEmail: email => dispatch({ type: 'UPDATE_EMAIL', payload: email }),
        updateOccupation: occupation => dispatch({ type: 'UPDATE_OCCUPATION', payload: occupation }),
        createData: (name, email, occupation, bio) => dispatch(createData(name, email, occupation, bio, ownProps.id)),
        fetchSingleData: (id) => dispatch(fetchSingleData(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmployee);

