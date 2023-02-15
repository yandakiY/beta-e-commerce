import React, { useEffect, useState } from 'react'
import AddArticles from './Form/AddArticles'
import AddCategories from './Form/AddCategories'
import '../style/Settings.css'
import TableArticleSettings from './Table/TableArticleSettings'
import {useSelector , useDispatch} from 'react-redux'
import Button from 'react-bootstrap/Button'
import { actionsLists } from '../store/lists-slice'
import { actionsCategory } from '../store/category-slice'

const Setting = () => {

  const [viewAddCategories , setviewAddCategories] = useState(false)
  const [viewAddArticles , setviewAddArticles] = useState(false)


    const dispatch = useDispatch();

    // Use redux for the access of state article and category
    const lists = useSelector(state  => state.lists.lists)
    const category = useSelector(state  => state.category.category)

    // console.log("Lists ", lists)
    // console.log("Category ", category)

    // //get element lists from server
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

        // console.log("Category",category)
        // console.log("Lists of articles",lists)
    }, []);

    // console.log("Category", category)

  return (
    <>
        <div style={{textAlign:'center'}}>
            <h1>Settings</h1>

            <div style={{display:'flex' , justifyContent:'space-evenly'}}>
                <Button variant={viewAddCategories === false ? 'info' : 'danger'} onClick={() => setviewAddCategories(!viewAddCategories)}>{viewAddCategories ? 'Close Add Categories' : 'Add Categories'}</Button>
                <Button variant={viewAddArticles === false ? 'info' : 'danger'} onClick={() => setviewAddArticles(!viewAddArticles)}>{viewAddArticles ? 'Close Add Articles' : 'Add new articles'}</Button>
                
            </div>

            <div style={{display:'flex', flexDirection:'row' , justifyContent:'space-evenly' , alignItems:'center'}}>
                {/* Categories Formulaire */}
                {viewAddCategories && <AddCategories />}

                {/* Articles Formulaire */}
                {viewAddArticles && <AddArticles />}
            </div>

            {/* List of Articles For modification */}
            <TableArticleSettings lists={lists} category={category} />
            <a href={'/'}>Return to home page</a>
        </div>
    </>
  )
}

export default Setting