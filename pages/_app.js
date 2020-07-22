import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react';
import { wrapper } from '../redux/store';
import { AuthProvider } from '../lib/AuthContext';


const WrappedApp = ({ Component, pageProps }) => (
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
);

export default wrapper.withRedux(WrappedApp);