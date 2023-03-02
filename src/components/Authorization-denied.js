/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Button, Col, Container, Figure, Row } from 'react-bootstrap'

const AuthorizationDenied = () => {
  return (
    <>
        <Container className='mt-5'>

            <Row style={{display:'flex' , flexDirection:'row', alignItems:'baseline'}} className=''>
                <Col lg={8}>
                    <h1 style={{fontFamily:'Montserrat', fontWeight:'bold'}} className='text-center'>Authorization Denied</h1>
                </Col>
                <Col lg={4}>
                    <Figure>
                        <Figure.Image
                            title='Not allow to be here'
                            width={200}
                            height={210}
                            alt="171x180"
                            src="https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png"
                        />
                    </Figure>
                </Col>
            </Row>

            <Row>
                <Button className='btn-lg' variant='link' href='/'>Go Home</Button>
            </Row>
        </Container>
    </>
  )
}

export default AuthorizationDenied