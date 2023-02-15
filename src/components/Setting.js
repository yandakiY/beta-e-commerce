import React, { useState } from 'react'
import AddArticles from './Form/AddArticles'
import AddCategories from './Form/AddCategories'
import '../style/Settings.css'
import TableArticleSettings from './Table/TableArticleSettings'
import {useSelector , useDispatch} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Setting = () => {

  const [viewAddCategories , setviewAddCategories] = useState(false)
  const [viewAddArticles , setviewAddArticles] = useState(false)

  const disaptch = useDispatch();


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
            <TableArticleSettings />
            <a href={'/'}>Return to home page</a>
        </div>
    </>
  )
}

export default Setting