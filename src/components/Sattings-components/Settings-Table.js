import React from 'react'
import AddArticles from '../Form/AddArticles'
import AddCategories from '../Form/AddCategories'
import NotLists from '../NotLists'
import TableArticleSettings from '../Table/TableArticleSettings'

const SettingsTable = ({lists , category , addCategory , addArticles , sendSubmitUpdate , viewAddArticles , viewAddCategories , backSettings}) => {
  return (
    <div style={{textAlign:'center' , marginTop:'62px'}}>

        <div style={{display:'flex', flexDirection:'row' , justifyContent:'space-evenly' , alignItems:'center'}}>
            {/* Categories Formulaire */}
            {viewAddCategories && <AddCategories addCategory={addCategory} />}

            {/* Articles Formulaire */}
            {viewAddArticles && <AddArticles category={category} lists={lists} addArticle={addArticles} />}
        </div>

        {lists.length === 0 || category.length === 0 ? <NotLists /> : <TableArticleSettings backSettings={backSettings} sendUpdate={sendSubmitUpdate} lists={lists} category={category} />}
    </div>
  )
}

export default SettingsTable