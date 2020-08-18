import React, { createContext, useState, useContext, useEffect } from 'react'
import Router from 'next/router'

import api, { addBearerToken, removeBearerToken } from '../services/api';
import { routes } from '../services/routes';

interface Auth {
    user: { name: string, email: string },
    setToken: ({ token: string }) => void,
    isAuthenticated: boolean,
    logout: () => void
}

const ACCESS_TOKEN = "access_token"


const AuthContext = createContext({} as Auth);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            console.log(token)
            setToken(token)
        }
    }, [])

    const updateUser = async () => {
        await api.get(routes.me)
            .then((data) => {
                console.log(data)
                setUser(data)
            })
            .catch(error => {
                console.error(error)
                logout()
            })
    }

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN)
        setUser(null)
        removeBearerToken()
        redirectAfterLogout()
    }

    const setToken = async token => {
        console.log(token)
        localStorage.setItem(ACCESS_TOKEN, token)
        addBearerToken(token)
        await updateUser()
        redirectAfterLogin()
    }

    const redirectAfterLogin = () => {
        Router.push("/dashboard")
    }

    const redirectAfterLogout = () => {
        Router.push("/")
    }

    return (
        <AuthContext.Provider value={{ setToken, user, isAuthenticated: !!user, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    return context
};
