import { useAuth } from "./AuthContext"
import Router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'


export function protectRoute(Component) {
    return () => {
        const { isAuthenticated, loading } = useAuth();
        // const router = useRouter()

        useEffect(() => {
            console.log(isAuthenticated)
            if (!isAuthenticated && !loading) Router.push('/login')
        }, [loading, isAuthenticated])

        return (<Component {...arguments} />)
    }
}