import React, { useEffect } from 'react'
import { useAuth } from "../lib/AuthContext"
import useSWR from 'swr'
import api from "../services/api"
import Skeleton from 'react-loading-skeleton';
import Router from 'next/router'
import { protectRoute } from "../lib/protectRoute"
import { routes } from '../services/routes';
import { IGroceryItem } from '../models/GroceryItem'
import GroceryItemsList from '../components/GroceryItemsList'
import MainLayout from '../layouts/MainLayout';


const DashboardPage = (props) => {
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        if (!isAuthenticated) Router.push('/')
    }, [isAuthenticated])

    const { data, error } = useSWR(isAuthenticated ? routes.groceryItems : null, api.get)

    if (error) return <p> There was an error </p>
    if (!data) return <p> Loading... </p>

    console.log(data)

    let showSkeleton = !data

    let { data: groceryItems } = data as { data: IGroceryItem[] }

    return <>
        <MainLayout>
            {groceryItems && <GroceryItemsList groceryItems={groceryItems} />}
            {showSkeleton && <Skeleton height={40} count={5} />}
        </MainLayout>
    </>
}

// export default protectRoute(DashboardPage)
export default DashboardPage