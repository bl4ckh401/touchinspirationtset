import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateData, fetchSingleData } from '../Redux/actions';
import ConnectedComponent from '../Components/ConnectedComponent';
import LoadingPage from './LoadingPage';
function ViewEmployee(props) {
    const [loading, setLoading] = useState(true)
    const params = useParams()
    let id = params?._id

    useEffect(() => {
        setLoading(true)
        if (id) props.fetchSingleData(id).then(() => setLoading(false));
    }, [id])

    return (
        <div className={props.active ? 'flex w-5/6 pt-20 h-screen bg-gray-100 flex-col justify-start items-start' : 'flex w-full pt-24  bg-gray-100 flex-col h-fit justify-start items-start'}>
            {loading ? <LoadingPage /> :
                <>
                    <div className='w-full justify-start bg-white shadow-lg shadow-gray-400 items-start flex flex-col lg:flex-row md:flex-row flex-wrap'>
                        {(props.data && props.data != null) && <ConnectedComponent id={id} name={props.data.name} email={props.data.email} occupation={props.data.occupation} bio={props.data.bio} />}
                    </div>
                </>}

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
        updateData: (name, email, occupation, bio) => dispatch(updateData(name, email, occupation, bio, ownProps.id)),
        fetchSingleData: (id) => dispatch(fetchSingleData(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewEmployee);