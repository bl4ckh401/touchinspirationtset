import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { updateData, fetchSingleData, fetchData, resetData } from '../Redux/actions';
import ConnectedComponent from './ConnectedComponent';
import LoadingPage from '../Pages/LoadingPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormGroup,
    FormInput,
    FormSelect,
    FormTextarea,
    Button
} from "shards-react";
import UserDetails from "../Pages/UserDetails";

function ViewUser(props) {
    const [loading, setLoading] = useState(true)
    const params = useParams()
    let id = params?._id
    const notify = () => toast.success("The Employees' data has been updated successfully");
    const navigate = useNavigate()
    const location = useLocation()
    function handleClick() {
        navigate('/')
    }
    async function navigateBack(){
            
    }
    const Update = () => {
        toast.info("Updating Employee Details");
        props.updateData(id).then(notify())
    }

    useEffect(() => {
        setLoading(true)
        if (id) props.fetchSingleData(id).then(() => setLoading(false));
        return () => {
            // reset data when user navigates away from page
            // props.resetData()
        }
    }, [id])

    return (
        <div className={props.active ? 'flex w-4/5 pt-20 z-10 h-fit min-h-screen bg-gray-100 flex-row justify-start items-start' : 'flex w-full bg-gray-100 pt-16 flex-row h-screen justify-start items-start'}>
            <div className="relative">
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
            <div className="relative">
                <BiArrowBack color="black" size={40} className='left-0 mr-4 -ml-4 hover:cursor-pointer top-0' onClick={async () => {
                    await props.fetchData()
                        .then(() => setLoading(false))
                        .then(() => navigate(`/`))
                }} />
            </div>
        <UserDetails />
        <Card small className="mb-4 ml-2">
            <CardHeader className="border-bottom">
                <h6 className="m-0">Update Employee Details</h6>
            </CardHeader>
            <ListGroup flush>
                <ListGroupItem className="p-3">
                    <Row>
                        <Col>
                            <Form>
                                <Row form>
                                    {/* First Name */}
                                    <Col md="6" className="form-group">
                                        <label htmlFor="feFirstName">Name</label>
                                        <FormInput
                                            id="feFirstName"
                                            placeholder="Name"
                                            value={props.name}
                                            onChange={event => props.updateName(event.target.value)}
                                            className="w-24"
                                        />
                                    </Col>
                                </Row>
                                <Row form>
                                    {/* Email */}
                                    <Col md="6" className="form-group">
                                        <label htmlFor="feEmail">Email</label>
                                        <FormInput
                                            type="email"
                                            id="feEmail"
                                            placeholder="Email Address"
                                            value={props.email}
                                            onChange={event => props.updateEmail(event.target.value)}
                                            autoComplete="email"
                                        />
                                    </Col>
                                    {/* Password */}
                                    <Col md="6" className="form-group">
                                        <label htmlFor="fePassword">Occupation</label>
                                        <FormInput
                                            type="text"
                                            id="feOccupation"
                                            placeholder="Occupation"
                                            value={props.occupation}
                                            onChange={event => props.updateOccupation(event.target.value)}
                                            autoComplete="current-password"
                                        />
                                    </Col>
                                </Row>
                                <Row form>
                                    {/* Description */}
                                    <Col md="12" className="form-group">
                                        <label htmlFor="feDescription">Bio</label>
                                        <FormTextarea id="feDescription" 
                                            rows="5" 
                                            value={props.bio}
                                            onChange={event => props.updateBio(event.target.value)} 
                                        />
                                    </Col>
                                </Row>
                                <Button className="bg-green-500" onClick={Update}>Update Account</Button>
                            </Form>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </Card>
    </div>
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
        updateName: name => dispatch({ type: 'UPDATE_NAME', payload: name }),
        updateBio: bio => dispatch({ type: 'UPDATE_BIO', payload: bio }),
        updateEmail: email => dispatch({ type: 'UPDATE_EMAIL', payload: email }),
        updateOccupation: occupation => dispatch({ type: 'UPDATE_OCCUPATION', payload: occupation }),
        updateData: (name, email, occupation, bio) => dispatch(updateData(name, email, occupation, bio, ownProps.id)),
        fetchData: () => dispatch(fetchData()),
        fetchSingleData: (id) => dispatch(fetchSingleData(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUser);