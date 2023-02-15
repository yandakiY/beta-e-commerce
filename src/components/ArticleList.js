import React from 'react'
import { useSelector } from 'react-redux';
import '../style/ArticleList.css'

const ArticleList = ({lists , category}) => {

    // Les filters 
  let search = useSelector(state => state.filter.search)
  let available = useSelector(state => state.filter.available)


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
                (category.map(e => e.name).map((cat , index) => 

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
                (category.map(e => e.name).map((cat , index) => 

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
                (category.map(e => e.name).map((cat , index) => 

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
                 (category.map(e => e.name).map((cat , index) => 

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