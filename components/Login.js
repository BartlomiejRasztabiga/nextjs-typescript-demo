import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { connect } from "react-redux";
import axios from 'axios'

import { login } from '../redux/actions/authActions'

const Login = (props) => {
    const [email, setEmail] = useState({})
    const [password, setPassword] = useState({})

    const onLoginClick = async () => {
        props.login(email, password)
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

            {props.login_error && <small className="text-danger">{props.login_error.body}</small>}
        </Form>
    </>
}


const mapStateToProps = state => {
    return {
        accessToken: state.auth.access_token,
        login_error: state.auth.login_error
    }
}

const mapDispatchToProps = { login }


export default connect(mapStateToProps, mapDispatchToProps)(Login)