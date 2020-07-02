import { Form, Button } from 'react-bootstrap'
import fetch from '../lib/fetch'

import useSWR from 'swr'

const Login = () => {

    const { token } = useSWR('/api/auth/login', fetch)

    return <>
        
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
          </Button>
        </Form>
        <p>{token}</p>
    </>
}

export default Login