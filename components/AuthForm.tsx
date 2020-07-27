import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

import MainLayout from '../layouts/MainLayout'
import api from '../services/api'
import { useAuth } from '../lib/AuthContext'

interface AuthProps {
    title: string,
    route: string
}

interface ValidationError {
    field: string,
    message: string
}

interface DisplayErrors {
    errors: ValidationError[],
    fieldName: string
}

const AuthForm = ({ title, route }: AuthProps) => {

    const { setToken } = useAuth()
    const [errors, setErrors] = useState<ValidationError[]>([])

    const handleFormSubmit = e => {
        e.preventDefault()
        const email = e.target.elements['email'].value;
        const password = e.target.elements['password'].value;

        api.post(route, { email, password })
            .then(response => {
                console.log(response.data)
                const token = response.data.access_token
                setToken(token)
            })
            .catch(error => {
                setErrors(error.response.data || [])
                console.error(error)
            })
    }

    return (
        <div>
            <MainLayout>
                <Row className="justify-content-md-center">
                    <Col md="auto" className="pt-5">
                        <h3>
                            {title}
                        </h3>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col md="6">
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter email" />
                                <DisplayErrors errors={errors} fieldName="email" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" placeholder="Password" />
                                <DisplayErrors errors={errors} fieldName="password" />

                            </Form.Group>

                            <Button variant="primary" type="submit" className="btn-block">
                                Submit
                        </Button>
                        </Form>
                    </Col>
                </Row>

            </MainLayout>
        </div>
    )
}

const DisplayErrors = ({ errors, fieldName }: DisplayErrors) => (
    <>
        {errors.filter(e => e.field === fieldName).map((e) => (
            <p className="text-danger">
                {e.message}
            </p>
        ))}
    </>
)

export default AuthForm