import React from 'react'
import { connect } from "react-redux"
import Header from '../components/Header'
import { protectRoute } from "../lib/protectRoute"
import useAuth from "../lib/AuthContext"
import useSWR from 'swr'
import api from "../services/api"
import UserData from '../components/UserData'
import Skeleton from 'react-loading-skeleton';


const LoggedPage = (props) => {

    const { user, loading } = useAuth();
    const { data = {}, isValidating } = useSWR(loading ? false : '/api/auth/me', api.get)

    const showSkeleton = isValidating || loading

    return <>
        <Header />
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            zalogowaned
            {data && <UserData user={data} />}
            {showSkeleton && <Skeleton height={40} count={5} />}
        </main>
    </>
}

export default protectRoute(connect()(LoggedPage))