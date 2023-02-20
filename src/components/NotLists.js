import React from 'react'
import { Button, Card, Container, Spinner } from 'react-bootstrap'

const NotLists = () => {
  return (
    <Container>
        <Card className="text-center">
            <Card.Header>Loading...</Card.Header>
            <Card.Body>
                {/* <Card.Title>Data not found</Card.Title> */}
                <div style={{fontSize:'65px'}}>
                  <Spinner animation="border" />
                </div>
            </Card.Body>
            <Card.Footer className="text-muted">
                <Button variant="link" href={'/'}>Refresh here</Button>
            </Card.Footer>
        </Card>
    </Container>
  )
}

export default NotLists