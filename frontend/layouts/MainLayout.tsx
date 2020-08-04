import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Navbar from '../components/Navbar'


const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <Container>
                <Row>
                    <Col>
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MainLayout