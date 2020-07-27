import React from 'react'
import { protectRoute } from "../lib/protectRoute"
import { useAuth } from "../lib/AuthContext"
import useSWR from 'swr'
import api from "../services/api"
import UserData from '../components/UserData'
import Skeleton from 'react-loading-skeleton';


const LoggedPage = (props) => {

    const { user, loading } = useAuth();
    const { data: { data } = {}, isValidating } = useSWR(loading ? false : '/api/auth/me', api.get)

    const showSkeleton = isValidating || loading

    return <>
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            zalogowaned
            {data && <UserData user={data} />}
            {showSkeleton && <Skeleton height={40} count={5} />}
        </main>
    </>
}

export default protectRoute(LoggedPage)