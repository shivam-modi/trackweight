import React, { useState } from 'react'
import { Container, Form, Row, Button, Col, FormLabel, Table, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {FaPlus} from 'react-icons/fa'
import { useWeight } from '../contexts/WeightContext'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function Main() {
   const {currentUser, logOut} = useAuth()
   const userId = currentUser.uid
   const {getData, uploadData, formatData} = useWeight()
   const [weights, setWeights] = useState([]) 
   const [weight, setWeight] = useState(0)
   const [addNew, setAddNew] = useState(false)
   const history = useHistory()
   const [isUploading, setIsUploading] = useState(false);
   let a = 0, b = 0;
   
   useEffect(() => {
     getData({
       userId: userId
     }).then(res => {
       setWeights(res)
     });
   }, [isUploading, weights])
   
   function handleSubmit(e){
     e.preventDefault()
     try {
       setIsUploading(true);
       uploadData({ weight: weight, userId: userId });
       setIsUploading(false)
       setWeight(0)
       setAddNew(false);
     } catch (error) {
       console.error(error.message)
     }
   }

   async function handleLogout(){
     try{
       await logOut();
       history.push('/login')
     } catch{
       console.error("Failed to log out")
     }
   }
   
    return (
      <div className="ctr">
        <Container className="main bgr">
          <Container className="mt-5">
            <Row>
              <Col className="ctr mt-3">
                <h3>Hello, User</h3>
              </Col>
              <Col className="ctr">
                <Button variant="info" onClick={() => setAddNew(true)}>
                  <FaPlus />
                </Button>
              </Col>
            </Row>
          </Container>

          {addNew ? (
            <Container className="mt-3">
              <Form className="wtfrm">
                <FormLabel>
                  <strong>Enter the weight</strong>
                </FormLabel>
                <Form.Control
                  className="wth"
                  type="number"
                  step="any"
                  placeholder="Enter weight"
                  onChange={(e) => setWeight(e.target.value)}
                />
                <Button type="submit" onClick={handleSubmit}>
                  Save
                </Button>
              </Form>
            </Container>
          ) : null}

          <Container>
            <Table>
              <thead>
                <tr>
                  <th>Weight</th>
                  <th>Updated on</th>
                </tr>
              </thead>
              <tbody>
                {weights
                  .map((wt) => {
                    a = b;
                    b = wt.weight;
                    return (
                      <tr key={wt.time}>
                        <td>
                          <Row>
                            {wt.weight} Kg
                            {a !== 0 ? (
                              <Alert
                                className="alrt"
                                variant={
                                  wt.weight - a > 0 ? "danger" : "success"
                                }
                              >
                                {wt.weight - a > 0 ? "+" : ""}
                                {wt.weight - a}
                              </Alert>
                            ) : null}
                          </Row>
                        </td>
                        <td>{wt.time}</td>
                      </tr>
                    );
                  })
                  .reverse()}
              </tbody>
            </Table>
          </Container>
        </Container>
        <Button variant="danger" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    );
}
