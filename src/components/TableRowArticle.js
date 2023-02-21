import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { actionsLists } from '../store/lists-slice';
import { actionsModal } from '../store/modal-slice';
import UpdateArticle from './Modal-Components/UpdateArticle';

const TableRowArticle = ({article , lists }) => {

    // Test
    const [infoForm , setInfoForm] = useState(
        {id:article.id , name:article.name , category:article.category , price:article.price , number:article.number , stocked:article.stocked}
    );

    // console.log(article) // Test What article this is ?
    const dispatch = useDispatch();
    
    // State show Modal
    let show = useSelector(state => state.modal.show)

    // Put Modal in the screen
    const handleShow = (valueArticle) =>{
        dispatch(actionsModal.showModal(valueArticle))
    }

    // Close Modal
    const handleClose = () =>{
        dispatch(actionsModal.closeModal())
    }

    // const dispatch = useDispatch();

    const deleteElementLists = async (id) =>{

        // Determine the id firebase of Object we want delete
        // We have elements of Firebase in props lists
        var indexFirebase;
        lists.forEach((e , i) =>{
            if(e.id === id){
                indexFirebase = i;
            }
        })

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
        <>
            <tr style={{color: article.stocked === false && 'red' , fontWeight: article.stocked === false && 'bold'}}>
                <td>{article.id}</td>
                <td>{article.name}</td>
                <td>${article.price}</td>
                <td>{article.number}</td>
                <td><Button onClick={() => handleShow({article})} variant='primary'>Update</Button> <Button variant='danger' onClick={() => deleteArticle(article.id)}>Delete</Button></td>
            </tr>
            
            <>
                {/* Modal Components */}
                <UpdateArticle show={show} article={article} handleClose={handleClose}/> 
            </>
        </>
  )
}

export default TableRowArticle