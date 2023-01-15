import React from 'react'
import { MdAccountCircle } from 'react-icons/md';
import {
    Card,
    CardHeader,
    Button,
    ListGroup,
    ListGroupItem,
    Progress
} from "shards-react";


function ConnectedComponent(props) {
  return (
      <div className='lg:w-full justify-start items-center md:w-full w-full rounded-4xl border shadow-xl' >
        {(props && props != null) &&
              <div className="justify-center rounded-4xl items-center">
              <CardHeader className="border-bottom rounded-4xl justify-center items-center text-center">
                      <div className="text-center flex flex-row justify-center items-center">
                          <MdAccountCircle color="blue" size={50} className="mb-4" />
                      </div>
                      <h4 className="mb-0">{props.name}</h4>
                      <span className="text-muted d-block mb-2">{props.occupation}</span>
                      <Button pill outline size="md" className="mb-2">
                        Follow
                      </Button>
                  </CardHeader>
                  <ListGroup>
                      <ListGroupItem className="p-4 rounded-4xl">
                          <strong className="text-muted d-block mb-2">
                              {props.bio}
                          </strong>
                      </ListGroupItem>
                  </ListGroup>
              </div>
        }
      </div>
  )
}

export default ConnectedComponent