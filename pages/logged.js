import React from 'react';
import { connect } from "react-redux";
import Header from '../components/Header'
import { protectRoute } from "../lib/protectRoute"


const LoggedPage = (props) => {

    return <>
        <Header />
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            zalogowaned
    </main>
    </>
}

export default protectRoute(connect()(LoggedPage))