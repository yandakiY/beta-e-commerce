import React, { useState } from 'react'
import AddArticles from './Form/AddArticles'
import AddCategories from './Form/AddCategories'
import '../style/Settings.css'
import TableArticleSettings from './Table/TableArticleSettings'
import {useSelector , useDispatch} from 'react-redux'

const Setting = () => {

  const [viewAddCategories , setviewAddCategories] = useState(false)
  const [viewAddArticles , setviewAddArticles] = useState(false)

  const disaptch = useDispatch();

//   // Get state test
//   const stateTest = useSelector((state) => state);
//   console.log('Via selector' , stateTest);



  return (
    <>
        <div style={{textAlign:'center'}}>
            <h1>Settings</h1>

            <div style={{display:'flex' , justifyContent:'space-evenly'}}>
                <button style={{background: viewAddCategories && 'red' , color: viewAddCategories && 'white', fontWeight:'bold'}} onClick={() => setviewAddCategories(!viewAddCategories)}>{viewAddCategories ? 'Close Add Categories' : 'Add Categories'}</button>
                <button style={{background: viewAddArticles && 'red' , color: viewAddArticles && 'white', fontWeight:'bold'}} onClick={() => setviewAddArticles(!viewAddArticles)}>{viewAddArticles ? 'Close Add Articles' : 'Add new articles'}</button>
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