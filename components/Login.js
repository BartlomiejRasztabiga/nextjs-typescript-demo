import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { connect } from "react-redux";
import axios from 'axios'

import { logIn } from '../redux/actions/authActions'

const Login = (props) => {
    const [email, setEmail] = useState({})
    const [password, setPassword] = useState({})

    const logIn = (token) => props.logIn(token)

    const onLoginClick = async () => {
        const response = await axios.post('/api/auth/login', {
            "email": email,
            "password": password
        })
        const token = response.data.access_token
        logIn(token)
    }

    return <>

        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" onClick={onLoginClick}>
                Login
            </Button>
        </Form>
    </>
}


const mapStateToProps = state => {
    return {
        accessToken: state.auth.access_token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: (access_token) => dispatch(logIn(access_token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)