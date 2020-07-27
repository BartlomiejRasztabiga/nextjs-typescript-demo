import React, { createContext, useState, useContext, useEffect } from 'react'
import Router from 'next/router'

import api, { addBearerToken, removeBearerToken } from '../services/api';
import { routes } from '../services/routes';

interface Auth {
    user: { name: string, email: string },
    setToken: ({ token: string }) => void,
    isAuthenticated: boolean,
    // loading: boolean,
    // login: (email, password, redirectTo) => object
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
            setToken({ token })
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

    // useEffect(() => {
    //     async function loadUserFromLocalStorage() {
    //         const token = localStorage.getItem('access_token')
    //         if (token) {
    //             console.log("Got a token in the local storage, let's see if it is valid")
    //             console.log(token)
    //             api.defaults.headers.Authorization = `Bearer ${token}`
    //             const response = api.get('api/auth/me').then(response => {
    //                 console.log(response)
    //                 const user = response.data
    //                 if (user) {
    //                     setUser(user);
    //                     // Router.push("/logged")
    //                 }

    //             })
    //                 .catch(err => {
    //                     localStorage.removeItem("access_token")
    //                     setUser(null)
    //                     Router.push("/login")
    //                 })

    //         }
    //         setLoading(false)
    //     }
    //     loadUserFromLocalStorage()
    // }, [])

    // const login = async (email, password, redirectTo) => {
    //     // const response = await api.post('api/auth/login', { email, password })
    //     return await api.post('api/auth/login', { email, password })
    //         .then(response => {
    //             const access_token = response.data.access_token
    //             if (access_token) {
    //                 console.log("Got token")
    //                 console.log(access_token)
    //                 localStorage.setItem("access_token", access_token)
    //                 api.defaults.headers.Authorization = `Bearer ${access_token}`
    //                 api.get('api/auth/me')
    //                     .then(response => {
    //                         const user = response.data
    //                         console.log("Got user", user)
    //                         if (user) {
    //                             setUser(user);
    //                             if (redirectTo) {
    //                                 Router.push(redirectTo)
    //                             }
    //                             return Promise.resolve(null)
    //                         }
    //                     })
    //                     .catch(err => {
    //                         setUser(null)
    //                         return Promise.reject(err)
    //                     })
    //             }
    //         })
    //         .catch(err => {
    //             setUser(null)
    //             return Promise.reject(err)
    //         })
    // }

    // const logout = () => {
    //     localStorage.removeItem("access_token")
    //     setUser(null)
    //     Router.push("/login")
    // }

    // const setToken = token => {
    //     localStorage.setItem("access_token", token)
    //     addBearerToken(token)
    // }


    return (
        <AuthContext.Provider value={{ setToken, user, isAuthenticated: !!user, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)

    return context
};


export default useAuth
