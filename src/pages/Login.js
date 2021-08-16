import React,{useState} from 'react'
import {Button, Card, Container, Alert } from "react-bootstrap"
import anylogo from "../assets/anonymous.png"
import  {useAuth} from "../contexts/AuthContext"
import { useHistory } from 'react-router-dom'

export default function Login() {
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory(); 
     
    async function handleClick(e){
        e.preventDefault()

        try {
          setError('');
          setLoading(true)
          await login();
          history.push("/");
        } catch {
          setError('Failed to create an account')
        }
        setLoading(false);
    }
    return (
      <Container
        className="ctr d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Title className="mt-2">
              <h2>Sign In Anonymously</h2>
            </Card.Title>
            <Card.Body>
              <Card.Img src={anylogo}></Card.Img>
              <strong>Weight Tracker</strong>
            </Card.Body>
            <Card.Footer>
              <Button disabled={loading} onClick={handleClick}>
                Sign In
              </Button>
            </Card.Footer>
          </Card>
          {error && <Alert variant="danger">{error}</Alert>}
        </div>
      </Container>
    );
}
