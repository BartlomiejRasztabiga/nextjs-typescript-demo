import useAuth from "./AuthContext"
import Router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'


export function protectRoute(Component) {
    return () => {
        const { user, isAuthenticated, loading } = useAuth();
        // const router = useRouter()

        useEffect(() => {
            if (!isAuthenticated && !loading) Router.push('/login')
        }, [loading, isAuthenticated])

        return (<Component {...arguments} />)
    }
}