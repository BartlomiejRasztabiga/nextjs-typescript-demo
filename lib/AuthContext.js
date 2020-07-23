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
                    if (user) setUser(user);
                })
                .catch(err => {
                    console.error(err)
                    setUser(null)
                    // Router.push("/login")
                })

            }
            setLoading(false)
        }
        loadUserFromLocalStorage()
    }, [])

    const login = async (email, password) => {
        const response = await api.post('api/auth/login', { email, password })
        const access_token = response.data.access_token
        if (access_token) {
            console.log("Got token")
            console.log(access_token)
            localStorage.setItem("access_token", access_token)
            // Cookies.set('token', access_token, { expires: 60 })
            api.defaults.headers.Authorization = `Bearer ${access_token}`
            const response = api.get('api/auth/me').then(response => {
                const user = response.data
                console.log("Got user", user)
                if (user) setUser(user);
            })
            .catch(err => {
                console.error(err)
                setUser(null)
                // Router.push("/login")
            })
            
        }
    }

    const logout = (email, password) => {
        localStorage.removeItem("access_token")
        setUser(null)
        Router.push("/login")
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
