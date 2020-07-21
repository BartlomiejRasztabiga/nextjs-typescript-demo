import React, { createContext, useState, useContext, useEffect } from 'react'
// import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'
import { connect } from "react-redux";

//api here is an axios instance
import api from '../services/api';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = localStorage.getItem('access_token')
            if (token) {
                console.log("Got a token in the local storage, let's see if it is valid")
                api.defaults.headers.Authorization = `Bearer ${token}`
                const response = api.get('api/auth/me').then(response => {
                    const user = response.data
                    console.log(response)
                    if (user) setUser(user);
                }).catch(err => {
                    console.error(err)
                    setUser(null)
                    Router.push("/login")
                })

            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])

    const login = async (email, password) => {
        // const { data: token } = await api.post('auth/login', { email, password })
        // if (token) {
        //     console.log("Got token")
        //     Cookies.set('token', token, { expires: 60 })
        //     api.defaults.headers.Authorization = `Bearer ${token.token}`
        //     const { data: user } = await api.get('users/me')
        //     setUser(user)
        //     console.log("Got user", user)
        // }
    }

    const logout = (email, password) => {
        // Cookies.remove('token')
        // setUser(null)
        // window.location.pathname = '/login'
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)

    return context
};


export default useAuth
