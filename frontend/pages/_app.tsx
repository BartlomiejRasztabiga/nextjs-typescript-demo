import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react';
import { AuthProvider } from '../lib/AuthContext';
import { AppProps } from 'next/app';


const WrappedApp = ({ Component, pageProps } : AppProps) => (
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
);

export default WrappedApp;