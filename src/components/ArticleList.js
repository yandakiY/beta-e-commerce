import React, { useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux';
import { actionsCategory } from '../store/category-slice';
import { actionsLists } from '../store/lists-slice';
import '../style/ArticleList.css'

const ArticleList = () => {

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

    const disaptch = useDispatch();

    // Les states a afficher
    let lists = useSelector(state => state.lists)
    let category = useSelector(state => state.category)


    // Les filters 
    let search = useSelector(state => state.filter.search)
    let available = useSelector(state => state.filter.available)


    useEffect(() => {
        let getListsFromServer = async () =>{
          let listFormServer = await getLists()
          
          //Mise a jour du state
          disaptch(actionsLists.setLists(listFormServer))
        } 
    
        let getCategoryFromServer = async () =>{
          let categoryFormServer = await getCategory()
    
          //Mise a jour du state
          disaptch(actionsCategory.setCategory(categoryFormServer))
        } 
    
        getListsFromServer()
        getCategoryFromServer();
      }, []);
  return (
    <div>
        
        {/* <h2>Articles Lists :</h2> */}
        {search ? <h3>Recherche : {search}</h3> : ""}

        <div className='entete'>
            <span>
                Name
            </span>
            <span>
                Price
            </span>
        </div>

        {/* {available ? "true" : "0" } */}

        {!available ? 

            /* Button view available en mode Off */
            (!search ? 
            /* Lists of Articles By Category - Not filter */
                (category.category.map(e => e.name).map((cat , index) => 

                    <div key={index} className='lists'>
                        <span style={{textDecoration:'underline' , fontFamily:'consolas'}}>{cat}</span>
                        {lists.lists.map((list , index) => list.category === cat && 
                            <div className='listItem' style={{color: list.stocked === false && 'red', fontWeight: list.stocked === false && 'bold'}} key={index}>
                                <span>{list.name}</span>
                                <span>${list.price}</span>
                            </div> 
                        )} 
                    </div>

                ))
                    :
                /* Lists of Articles By Category - With filter (Search in this case) */
                (category.category.map(e => e.name).map((cat , index) => 

                    <div key={index} className='lists'>
                        <span style={{textDecoration:'underline' , fontFamily:'consolas'}}>{cat}</span>

                        {/* Articles by category.category.map(e => e.name) */}
                        {lists.lists.map((list , index) => 
                            
                            (list.category === cat && list.name.match(search))     
                                && 
                            (<div className='listItem' style={{color:list.stocked === false && 'red', fontWeight:list.stocked === false && 'bold'}} key={index}>
                                <span>{list.name}</span>
                                <span>${list.price}</span>
                            </div>)
                        )}
                    </div>

                ))
            )
            
            /* Button view available en mode On */
            : 
            (!search ? 
            /* Lists of Articles By Category - Not filter */
                (category.category.map(e => e.name).map((cat , index) => 

                    <div key={index} className='lists'>
                        <span style={{textDecoration:'underline' , fontFamily:'consolas'}}>{cat}</span>
                        {lists.lists.map((list , index) => (list.category === cat && list.stocked === true) && 
                            <div className='listItem' style={{color:list.stocked === false && 'red', fontWeight:list.stocked === false && 'bold'}} key={index}>
                                <span>{list.name}</span>
                                <span>${list.price}</span>
                            </div> 
                        )} 
                    </div>

                ))
                    :
                /* Lists of Articles By Category - With filter */
                 (category.category.map(e => e.name).map((cat , index) => 

                <div key={index} className='lists'>
                    <span style={{textDecoration:'underline' , fontFamily:'consolas'}}>{cat}</span>
                    {lists.lists.map((list , index) => 
                        
                        (list.category === cat && list.name.match(search) && list.stocked === true)     
                            &&
                        (<div className='listItem' style={{color:list.stocked === false && 'red', fontWeight:list.stocked === false && 'bold'}} key={index}>
                            <span>{list.name}</span>
                            <span>${list.price}</span>
                        </div>)
                    )}

                    {/* {test > 0 && <div>Pas d'articles</div>} */}
                </div>

                ))
            )
        }
    </div>
  )
}

export default ArticleList