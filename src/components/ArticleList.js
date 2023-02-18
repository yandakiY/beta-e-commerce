import React from 'react'
import { Alert, Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../style/ArticleList.css'


const ArticleList = ({lists , category}) => {

    // Les filters 
  let search = useSelector(state => state.filter.search)
  let available = useSelector(state => state.filter.available)


  return (
    <div>
        
        {/* <h2>Articles Lists :</h2> */}
        {search ? <h5>Recherche : {search}</h5> : ""}

        {/* <div className='entete'>
            <span>
                Name
            </span>
            <span>
                Price
            </span>
        </div> */}

        {/* {available ? "true" : "0" } */}

        {!available ? 

            /* Button view available en mode Off */
            (!search ? 
            /* Lists of Articles By Category - Not filter */
                (category.map(e => e.name).map((cat , index) => 

                    <div key={index} className='lists'>
                        {/* <span style={{textDecoration:'underline' , fontFamily:'consolas'}}>{cat}</span> */}
                        <Container style={{paddingTop:'10px'}} fluid>
                            <Alert variant={'secondary'}>
                                <h5 style={{fontFamily:'Montagu Slab , sans-serif',fontWeight:'bold'}} >{cat}</h5>
                            </Alert>
                        </Container>

                        <Container fluid>
                            <Row xs={1} md={4} lg={4}> {/* Ligne */}
                                {lists.map((list , index) => list.category === cat && 

                                    <Col key={index}> {/* Column */}
                                        <Card>
                                            <Card.Img variant="top" src="holder.js/100px160" />
                                            <Card.Body>
                                            <Card.Title className='flex-col'>
                                                {list.name} {' '} {list.stocked ? '' : <span style={{fontSize:'15px'}}><Badge bg={'danger'}>Not in stock</Badge></span>}
                                            </Card.Title>
                                            <Card.Text>
                                                
                                            </Card.Text>
                                            </Card.Body>
                                            {/* <hr /> */}
                                            <Card.Footer>
                                                <h4><Badge>${list.price}</Badge></h4>
                                            </Card.Footer>
                                        </Card>
                                    </Col>)}
                            </Row>
                        </Container>
                    </div>

                ))
                    :
                /* Lists of Articles By Category - With filter (Search in this case) */
                (category.map(e => e.name).map((cat , index) => 

                    <div key={index} className='lists'>
                        
                        <Container style={{paddingTop:'10px'}} fluid>
                            <Alert variant={'secondary'}>
                                <h5 style={{fontFamily:'Montagu Slab , sans-serif',fontWeight:'bold'}} >{cat}</h5>
                            </Alert>
                        </Container>

                        {/* Articles by category.category.map(e => e.name) */}
                        <Container fluid>
                            <Row xs={1} md={4} lg={4}>
                                {lists.map((list , index) => 
                                    
                                    (list.category === cat && list.name.match(search))     
                                        &&
                                    (<Col key={index}> {/* Column */}
                                            <Card>
                                                <Card.Img variant="top" src="holder.js/100px160" />
                                                <Card.Body>
                                                <Card.Title>
                                                    {list.name} {' '} {list.stocked ? '' : <span style={{fontSize:'15px'}}><Badge bg={'danger'}>Not in stock</Badge></span>}
                                                </Card.Title>
                                                <Card.Text>

                                                </Card.Text>
                                                </Card.Body>
                                                {/* <hr /> */}
                                                <Card.Footer>
                                                    <h4><Badge>${list.price}</Badge></h4>
                                                </Card.Footer>
                                            </Card>
                                    </Col>)
                                )}
                            </Row>
                        </Container>
                    </div>

                ))
            )
            
            /* Button view available en mode On */
            : 
            (!search ? 
            /* Lists of Articles By Category - Not filter */
                (category.map(e => e.name).map((cat , index) => 

                    <div key={index} className='lists'>
                        <Container style={{paddingTop:'10px'}} fluid>
                            <Alert variant={'secondary'}>
                                <h5 style={{fontFamily:'Montagu Slab , sans-serif',fontWeight:'bold'}} >{cat}</h5>
                            </Alert>
                        </Container>

                        <Container fluid>
                            <Row xs={1} md={4} lg={4}>
                                {lists.map((list , index) => (list.category === cat && list.stocked === true) && (
                                    <Col key={index}> {/* Column */}
                                        <Card>
                                            <Card.Img variant="top" src="holder.js/100px160" />
                                            <Card.Body>
                                            <Card.Title>
                                                {list.name} {' '} {list.stocked ? '' : <span style={{fontSize:'15px'}}><Badge bg={'danger'}>Not in stock</Badge></span>}
                                            </Card.Title>
                                            <Card.Text>
                                            </Card.Text>
                                            </Card.Body>
                                            {/* <hr /> */}
                                            <Card.Footer>
                                                <h4><Badge>${list.price}</Badge></h4>
                                            </Card.Footer>
                                        </Card>
                                    </Col>)
                                )}
                            </Row>
                        </Container>
                    </div>

                ))
                    :
                /* Lists of Articles By Category - With filter */
                 (category.map(e => e.name).map((cat , index) => 

                <div key={index} className='lists'>
                    <Container style={{paddingTop:'10px'}} fluid>
                            <Alert variant={'secondary'}>
                                <h5 style={{fontFamily:'Montagu Slab , sans-serif',fontWeight:'bold'}} >{cat}</h5>
                            </Alert>
                    </Container>
                    
                    <Container fluid>
                        <Row xs={1} md={4} lg={4}>
                            {lists.map((list , index) => 
                                
                                (list.category === cat && list.name.match(search) && list.stocked === true)     
                                    &&
                                (<Col key={index}> {/* Column */}
                                        <Card>
                                            <Card.Img variant="top" src="holder.js/100px160" />
                                            <Card.Body>
                                            <Card.Title>
                                                {list.name} {' '} {list.stocked ? '' : <span style={{fontSize:'15px'}}><Badge bg={'danger'}>Not in stock</Badge></span>}
                                            </Card.Title>
                                            <Card.Text>
                                                
                                            </Card.Text>
                                            </Card.Body>
                                            {/* <hr /> */}
                                            <Card.Footer>
                                                <h4><Badge>${list.price}</Badge></h4>
                                            </Card.Footer>
                                        </Card>
                                </Col>)
                            )}
                        </Row>
                    </Container>
                </div>

                ))
            )
        }
    </div>
  )
}

export default ArticleList