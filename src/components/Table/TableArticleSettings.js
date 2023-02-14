import React, { useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { actionsCategory } from '../../store/category-slice';
import { actionsLists } from '../../store/lists-slice';

const TableArticleSettings = () => {

    const dispatch = useDispatch();
    // Use redux for the access of state article and category
    const lists = useSelector(state  => state.lists.lists)
    const category = useSelector(state  => state.category.category)

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

    // Fonction delete a article in the table and Database
    const deleteArticle = id => {
        dispatch(actionsLists.deleteList(id))
        console.log("Delete article",id)
        // console.log(lists)

        deleteElementLists(id);
    }

    //get element lists from server
    const getLists = async () =>{
        const res = await fetch('http://localhost:5000/lists');
        const data = await res.json();
    
        // console.log(data)
        return data; 
    }
    const getCategory = async () =>{
        const res = await fetch('http://localhost:5000/category');
        const data = await res.json();
    
        // console.log(data)
        return data; 
    }

    

    useEffect(() => {
        const getListsFromServer = async () =>{
            let listFormServer = await getLists();

            dispatch(actionsLists.setLists(listFormServer));
        }
        const getCategoryFromServer = async () =>{
            let categoryFormServer = await getCategory();

            dispatch(actionsCategory.setCategory(categoryFormServer));
        }

        getListsFromServer();
        getCategoryFromServer();
    }, []);

    
    // console.log(lists)

    

  return (
    <>
        <h2>Articles availables : </h2>
        <table style={{padding:'15px', fontSize:'17px'}}>
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
                    <tr  key={index}>
                        <td style={{color:'white' , backgroundColor:'darkgray' , fontWeight:'bold'}} colSpan='4'>{cat}</td>
                        <td>{"Update"}</td>
                    </tr>
                    {lists.map((e,i) => e.category === cat && 
                        <tr style={{color: e.stocked === false && 'red' , fontWeight: e.stocked === false && 'bold'}} key={i}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>${e.price}</td>
                            <td>{e.number}</td>
                            <td><button style={{cursor:'pointer',  background:'skyblue'}}>{"Change Value"}</button>  <button style={{cursor:'pointer', color:'white',background:'red'}} onClick={() => deleteArticle(e.id)}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            )}
            
        </table>
    </>
  )
}

export default TableArticleSettings