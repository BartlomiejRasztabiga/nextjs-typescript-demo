import React from 'react'

import { routes } from '../services/routes';
import AuthForm from '../components/AuthForm'


export default function login() {
    return (
        <AuthForm route={routes.signup} title={"Signup"} />
    )
}