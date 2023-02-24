import React, {  useState } from 'react'
import { Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { actionsModal } from '../store/modal-slice';
import UpdateArticle from './Modal-Components/UpdateArticle';

const TableRowArticle = ({article , handleShow , handleClose , updateArticle , deleteArticle}) => {

    

    // console.log(article) // Test What article this is ?
    const dispatch = useDispatch();
    
    // State show Modal
    let show = useSelector(state => state.modal.show)

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
                <UpdateArticle show={show} article={article} updateArticle={updateArticle} handleClose={handleClose}/> 
            </>
        </>
  )
}

export default TableRowArticle