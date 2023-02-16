import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { actionsLists } from '../store/lists-slice';
import { actionsModal } from '../store/modal-slice';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { actionsCategory } from '../store/category-slice';
import UpdateArticle from './Modal-Components/UpdateArticle';
import { BsThreeDotsVertical } from "react-icons/bs";
import Dropdown from 'react-bootstrap/Dropdown';

const TableRowArticle = ({article}) => {

    // Test

    // Test resolution Modal props
    // Mise en place d'un state
    // ???????
    // const [infoForm , setInfoForm] = React.useState({id:contact.id , name:contact.name , prename:contact.prename ,number:contact.number , fav:contact.fav})

    const [infoForm , setInfoForm] = useState(
        {id:article.id , name:article.name , category:article.category , price:article.price , number:article.number , stocked:article.stocked}
    );



    // console.log(article) // Test What article this is ?
    const dispatch = useDispatch();
    
    // State show Modal
    let show = useSelector(state => state.modal.show)

    // Get category state
    // let category = useSelector(state => state.category.category)
    // console.log("How is my category", category)

    // Get all category from server

    // const getCategory = async () => {
    //     const res = await axios.get('http://localhost:5000/category');
    //     const data = res.data

    //     return data
    // }

    // Put Modal in the screen
    const handleShow = (valueArticle) =>{
        dispatch(actionsModal.showModal(valueArticle))
        // console.log("Article selected",article)
        // setInfoForm(article)
    }

    // Close Modal
    const handleClose = () =>{
        dispatch(actionsModal.closeModal())
    }

    // const {register , handleSubmit} = useForm();

    // delete element of lists from server
    const deleteElementLists = async (id) =>{
        const res = await fetch(`http://localhost:5000/lists/${id}`,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json'
            }
        })

        const data = res.json();

        console.log(data)
    }

    // Fonction delete a article in the Table and Database
    const deleteArticle = id => {
        dispatch(actionsLists.deleteList(id))
        console.log("Delete article",id)
        // console.log(lists)

        deleteElementLists(id);
    }

    // useEffect(() => {
    //     const getCategoryFromServer = async () =>{
    //         const categories = await getCategory();
    //         dispatch(actionsCategory.setCategory(categories))
    //     }

    //     getCategoryFromServer();
    // }, []);
  return (
        <>
            <tr style={{color: article.stocked === false && 'red' , fontWeight: article.stocked === false && 'bold'}}>
                <td>{article.id}</td>
                <td>{article.name}</td>
                <td>${article.price}</td>
                <td>{article.number}</td>
                {/* <td>
                    <Dropdown>
                        <Dropdown.Toggle variant="" id="dropdown-basic">
                            Options
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleShow({article})}>Update of {article.id}</Dropdown.Item>
                            <Dropdown.Item onClick={() => deleteArticle(article.id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td> */}
                <td><Button onClick={() => handleShow({article})} variant='primary'>Update</Button> <Button variant='danger' onClick={() => deleteArticle(article.id)}>Delete</Button></td>
                {/* {article.id} */}
            </tr>
            
            <>
                {/* Modal Components */}
                <UpdateArticle show={show} handleClose={handleClose}/> 
            </>
        </>
  )
}

export default TableRowArticle