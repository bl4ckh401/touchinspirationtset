import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateData, fetchSingleData } from '../Redux/actions';
import ConnectedComponent from '../Components/ConnectedComponent';
import LoadingPage from './LoadingPage';
import {
    Card,
} from "shards-react";

function UserDetails (props) {
    const [loading, setLoading] = useState(true)
    const params = useParams()
    let id = params?._id

    useEffect(() => {
        setLoading(true)
        if (id) props.fetchSingleData(id).then(() => setLoading(false));
    }, [id])
    return(
    <Card small className="mb-4 w-1/2 rounded-2xl">
            {(props.data && props.data != null) && <ConnectedComponent id={id} name={props.data.name} email={props.data.email} occupation={props.data.occupation} bio={props.data.bio} />}
    </Card>
);
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);