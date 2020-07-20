import React from 'react';
import Router from "next/router";
import { connect } from 'react-redux';

export function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {
        componentDidMount() {
            this.checkAuth(this.props.isAuthenticated)
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.isAuthenticated)
        }

        checkAuth(isAuthenticated) {
            if (!isAuthenticated) {
                Router.push("/")
            }
        }

        render() {
            return (
                <>
                    {this.props.isAuthenticated === true ? <Component {...this.props} /> : null}
                </>
            )
        }
    }
}