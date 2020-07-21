import React from 'react';
import { connect } from "react-redux";

const LoggedPage = (props) => {

    return <>
        <Header />
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            zalogowaned
    </main>
    </>
}

export default connect()(LoggedPage)