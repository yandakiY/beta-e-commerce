import React, { useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { actionsCategory } from '../../store/category-slice';
import { actionsLists } from '../../store/lists-slice';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Container, Row , Col } from 'react-bootstrap';
import { actionsModal } from '../../store/modal-slice';
import TableRowArticle from '../TableRowArticle';


const TableArticleSettings = ({category , lists}) => {

    // const dispatch = useDispatch();
    // // Use redux for the access of state article and category
    // const lists = useSelector(state  => state.lists.lists)
    // const category = useSelector(state  => state.category.category)

    // //get element lists from server
    // const getLists = async () =>{
    //     const res = await fetch('http://localhost:5000/lists');
    //     const data = await res.json();
    
    //     // console.log(data)
    //     return data; 
    // }
    // const getCategory = async () =>{
    //     const res = await fetch('http://localhost:5000/category');
    //     const data = await res.json();
    
    //     // console.log(data)
    //     return data; 
    // }

    

    // useEffect(() => {
    //     const getListsFromServer = async () =>{
    //         let listFormServer = await getLists();

    //         dispatch(actionsLists.setLists(listFormServer));
    //     }
    //     const getCategoryFromServer = async () =>{
    //         let categoryFormServer = await getCategory();

    //         dispatch(actionsCategory.setCategory(categoryFormServer));
    //     }

    //     getListsFromServer();
    //     getCategoryFromServer();
    // }, []);

    
    // console.log(lists)

    console.log("Lists like props", lists)

  return (
    <Container fluid>
        <h2>Articles availables : </h2>
        <Row className='justify-content-md-center'>
            {/* <Col lg={2}>Part with lg - 3 </Col> */}
            <Col lg={7}>
                <Table bordered size="sm" variant='' style={{padding:'15px', fontSize:'17px'}}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            {/* <th>Category</th> */}
                            <th>Price</th>
                            <th>Number of Article</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    
                    {category.map(e => e.name).map((cat, index) =>
                        <tbody key={index}>
                            <tr key={index}>
                                <td style={{color:'white' , backgroundColor:'darkgray' , fontWeight:'bold'}} colSpan='4'>{cat}</td>
                                <td><Button variant='link'>Update</Button></td>
                            </tr>
                            {lists.map((article,i) => article.category === cat && 
                                    <TableRowArticle key={i} article={article}/>
                            )}
                        </tbody>
                    )}
                    
                </Table>
            </Col>
            {/* <Col lg={3}>Part with lg - 3 </Col> */}
        </Row>
    </Container>
  )
}

export default TableArticleSettings