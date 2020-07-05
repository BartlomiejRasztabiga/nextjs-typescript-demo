import { Form, Button } from 'react-bootstrap'
import { connect } from "react-redux";
import axios from 'axios'

import { logIn } from '../redux/actions/authActions'

class Login extends React.Component {

    // const { token } = useSWR('/api/auth/login', fetch)

    onLoginClick = async () => {
        console.log(this)
        const response = await axios.post('/api/auth/login', {
            "email": "test@test.com",
            "password": "test"
        })
        const token = response.data.access_token
        this.props.dispatch(logIn(token))
    }

    render() {
        return <>

            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" onClick={this.onLoginClick}>
                    Login
            </Button>
            </Form>
        </>
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        accessToken: state.auth.access_token
    }
}

export default connect(mapStateToProps)(Login)