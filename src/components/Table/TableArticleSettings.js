import React, { useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { actionsCategory } from '../../store/category-slice';
import { actionsLists } from '../../store/lists-slice';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { Container, Row , Col } from 'react-bootstrap';
import { actionsModal } from '../../store/modal-slice';
import TableRowArticle from '../TableRowArticle';
import axios from 'axios';
import axiosLists from '../../api-axios/axiosLists';


const TableArticleSettings = ({category , lists}) => {

    const dispatch = useDispatch();
    const [listsTest , setListsTest] = React.useState([]);

    // We need get lists directly from firebase - via getLists() ?????
    const getLists = async () =>{
        const res = await axiosLists.get();
        const data = await res.data;

        // console.log("Lists",data)
        return data;
    }

    useEffect(() => {
        const loadingLists = async () =>{
            let listsLoaded = await getLists();
            
            setListsTest(listsLoaded);
        }

        loadingLists();
    },[]);

    const deleteElementLists = async (id) =>{

        // Determine the id firebase of Object we want delete
        // We have elements of Firebase in props lists
        var indexFirebase;
        // listsTest.forEach((e , i) =>{
        //     if(e.id === id){
        //         indexFirebase = i;
        //     }else if(e === null){continue}
        // })

        // for(let i = 0 ; i < listsTest.length ; i++){
        //     if(listsTest[i].id === id){
        //         indexFirebase = i;
        //     }else if(listsTest[i] === null){
        //         continue
        //     }
        // }

        // console.log('index firebase' , indexFirebase)
        // console.log(listsTest.map(e => e === null ? 'null' : e.id).map((e , i) => e == id && indexFirebase += i))

        // Determine the id firebase of Object we want delete
        // We have elements of Firebase in props lists
        let listsIdInitial = listsTest.map(e => e === null ? 'null' : e.id)

        // Determine the index of Firebase via index of Loop 'map'
        listsIdInitial.map((e , i) => e === id ? indexFirebase = i : 0)



        console.log('Index firebase',indexFirebase)

        // console.log('Index from firebase', indexFirebase)

        await axios.delete(`https://beta-e-commerce-default-rtdb.firebaseio.com/lists/${indexFirebase}.json`)
            .then(e => console.log(e))
            .catch(err => console.error(err))
    }

    // Fonction delete a article in the Table and Database
    const deleteArticle = id => {
        dispatch(actionsLists.deleteList(id))

        deleteElementLists(id);
    }

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
                                {/* <td><Button variant='link'>Update</Button></td> */}
                            </tr>
                            {lists.map((article,i) => article.category === cat && 
                                <TableRowArticle key={i} article={article} lists={lists} deleteArticle={deleteArticle}/>
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