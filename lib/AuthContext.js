import React, { createContext, useState, useContext, useEffect } from 'react'
// import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'

//api here is an axios instance
import api from '../services/api';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUserFromLocalStorage() {
            const token = localStorage.getItem('access_token')
            if (token) {
                console.log("Got a token in the local storage, let's see if it is valid")
                console.log(token)
                api.defaults.headers.Authorization = `Bearer ${token}`
                const response = api.get('api/auth/me').then(response => {
                    console.log(response)
                    const user = response.data
                    if (user) {
                        setUser(user);
                        Router.push("/logged")
                    }

                })
                    .catch(err => {
                        localStorage.removeItem("access_token")
                        setUser(null)
                        Router.push("/login")
                    })

            }
            setLoading(false)
        }
        loadUserFromLocalStorage()
    }, [])

    const login = async (email, password, redirectTo) => {
        // const response = await api.post('api/auth/login', { email, password })
        return await api.post('api/auth/login', { email, password })
            .then(response => {
                const access_token = response.data.access_token
                if (access_token) {
                    console.log("Got token")
                    console.log(access_token)
                    localStorage.setItem("access_token", access_token)
                    api.defaults.headers.Authorization = `Bearer ${access_token}`
                    api.get('api/auth/me')
                        .then(response => {
                            const user = response.data
                            console.log("Got user", user)
                            if (user) {
                                setUser(user);
                                if (redirectTo) {
                                    Router.push(redirectTo)
                                }
                                return Promise.resolve(null)
                            }
                        })
                        .catch(err => {
                            setUser(null)
                            return Promise.reject(err)
                        })
                }
            })
            .catch(err => {
                setUser(null)
                return Promise.reject(err)
            })
    }

    const logout = (email, password) => {
        localStorage.removeItem("access_token")
        setUser(null)
        Router.push("/login")
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
