import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react';
import { wrapper } from '../redux/store';


const WrappedApp = ({ Component, pageProps }) => (
    <Component {...pageProps} />
);

export default wrapper.withRedux(WrappedApp);