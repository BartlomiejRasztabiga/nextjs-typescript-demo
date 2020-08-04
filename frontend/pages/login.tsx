import React from 'react'

import { routes } from '../services/routes'
import AuthForm from '../components/AuthForm'

const Login = () => {

    return (
        <AuthForm route={routes.login} title={"Login"} />
    )
}

export default Login