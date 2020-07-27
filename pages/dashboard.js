import React from 'react'
import { protectRoute } from "../lib/protectRoute"
import { useAuth } from "../lib/AuthContext"
import useSWR from 'swr'
import api from "../services/api"
import Skeleton from 'react-loading-skeleton';


const DashboardPage = (props) => {

    const { user, loading } = useAuth();
    const { data: { groceryItems } = {}, isValidating } = useSWR(loading ? false : '/api/grocery-items', api.get)

    const showSkeleton = isValidating || loading

    return <>
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {groceryItems && <GroceryItemsList groceryItems={groceryItems} />}
            {showSkeleton && <Skeleton height={40} count={5} />}
        </main>
    </>
}

export default protectRoute(DashboardPage)