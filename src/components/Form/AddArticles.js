import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"

const AddArticles = () => {

    const [cat , setCat] = useState([])
    // Get all categories form Json Server

    const getCategories = async () =>{
        const res = await fetch('http://localhost:5000/category');
        const data = res.json()

        // console.log(data) // Test affichage
        return data
    }


    //Afficher les categories
    useEffect(() => {

        const getCategoriesFromServer = async () => {
            let catFromServer = await getCategories();
            setCat(catFromServer)
            // console.log(catFromServer)
        }

        getCategoriesFromServer();

    }, []);
    
    const {handleSubmit , register , formState:{errors}} = useForm({
    });

    // Submit Articles in Json Server
    const onSubmitArticles = async (value) =>{

        const valueToAdd = {...value, stocked:value.number > 0 ? true : false}
        
        const res = await fetch('http://localhost:5000/lists' , {
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(valueToAdd)
        });

        const data = await res.json();
        console.log(data)

        // Permet l'actualisation de la page
        window.location.reload();

        // console.log(value)
    }
  
    return (
        <form 
            onSubmit={handleSubmit(onSubmitArticles)}
            style={{display:'flex' , flexDirection:'column' , alignItems:'center', paddingBottom:'15px'}}
        >
            <h3>Add Articles</h3>
            {/* <div style={{display:'flex' , flexDirection:'column'}}>
                <label>Index Articles</label>
                <input {...register('indexArt' , {required:'Index is required'})} style={{padding:'.6rem'}} type={'text'}/> 
                <span style={{color:'red'}}>{errors.indexArt?.message}</span>
            </div> */}
            <div style={{display:'flex' , flexDirection:'column'}}>
                {/* Put category in Select */}
                <label>Select Category</label>
                <select style={{width:'185px' , height:'35px'}} {...register('category')}>
                    {cat.map((e , index) => <option value={e.name} key={index}>{e.name}</option>)}
                    {/* {cat.map((e , index) => <span key={index}>{e.name}</span>)} */}
                </select>
            </div>
            <div style={{display:'flex' , flexDirection:'column'}}>
                <label>Name  Articles</label>
                <input {...register('name' , {required: 'Name is required' , minLength:{value:3 , message: 'Should be more or eq to 3'}})} style={{padding:'.6rem'}} type={'text'}/> 
                <span style={{color:'red'}}>{errors.name?.message}</span>
            </div>
            
            <div style={{display:'flex' , flexDirection:'column'}}>
                <label>Price Articles</label>
                <input {...register('price' , {required: "Should be a number or a decimal" , pattern:{value:/^\d*\.?\d*$/g , message:'Should be a number or a decimal'}})} type='text' style={{padding:'.6rem'}}/> 
                <span style={{color:'red'}}>{errors.price?.message}</span>
            </div>
            <div style={{display:'flex' , flexDirection:'column'}}>
                <label>Number of Articles</label>
                <input {...register('number' , {required: "Should be a number"})} type='number' style={{padding:'.6rem'}}/> 
                <span style={{color:'red'}}>{errors.number?.message}</span>
            </div>

            {/* <div style={{display:'flex' , flexDirection:'row'}}>
                <label>In the stock : </label>
                <input {...register('stocked')} type='checkbox' style={{padding:'.6rem'}}/>
            </div> */}
            {/* Button Submit */}
            <button type='submit' style={{border:'none' , fontWeight:'bold',  background:'skyblue', padding:'.4rem', marginTop:'15px', borderRadius:'5px', cursor:'pointer'}}>
                Add New Category
            </button>
        </form>
  )
}

export default AddArticles