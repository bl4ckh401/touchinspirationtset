import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
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
import { fetchSingleData, createData, fetchData } from '../Redux/actions';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
function CreateEmployee(props) {
    let id = '';
    const [loading, setLoading] = useState(true)
    const notify = () => toast.success("The Employees has been created successfully");
    const navigate = useNavigate()

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
      <div className={props.active ? 'flex w-4/5 pt-24 h-fit min-h-screen bg-gray-100 flex-row justify-start items-start' : 'flex w-full pt-24  bg-gray-100 flex-row h-fit justify-start items-start'}>
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
                  setLoading(true)
                  await props.fetchData()
                      .then(() => setLoading(false))
                      .then(() => navigate(`/`))
              }} />
          </div>
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
                                          <label htmlFor="feFirstName">First Name</label>
                                          <FormInput
                                              id="feFirstName"
                                              placeholder="First Name"
                                              value={props.name}
                                              onChange={event => props.updateName(event.target.value)}
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
                                  <Button className="bg-green-500" theme="success" onClick={() => props.createData(id).then(() => notify())}>Create New Employee</Button>
                              </Form>
                          </Col>
                      </Row>
                  </ListGroupItem>
              </ListGroup>
          </Card>
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
        fetchSingleData: (id) => dispatch(fetchSingleData(id)),
        fetchData:()=>dispatch(fetchData())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmployee);

