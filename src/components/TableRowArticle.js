import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { actionsLists } from '../store/lists-slice';

const TableRowArticle = ({article}) => {

    const dispatch = useDispatch();

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
  return (
    <tr style={{color: article.stocked === false && 'red' , fontWeight: article.stocked === false && 'bold'}}>
        <td>{article.id}</td>
        <td>{article.name}</td>
        <td>${article.price}</td>
        <td>{article.number}</td>
        <td><Button  variant='primary'>{"Change Value"}</Button> <Button variant='danger' onClick={() => deleteArticle(article.id)}>{"Delete"}</Button></td>
        {/* {show && <td>Modal {e.id} <span>Delete</span> </td>} */}
    </tr>
  )
}

export default TableRowArticle