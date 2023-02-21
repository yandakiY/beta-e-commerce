import axios from 'axios'
import React from 'react'
import { useForm } from "react-hook-form"
import axiosCategory from '../../api-axios/axiosCategory'

const AddCategories = ({addCategory}) => {
  
    const {handleSubmit , register , formState:{errors}} = useForm({})

    const onSubmitCategories = async (value) => {

        // const res = await axios.put('https://beta-e-commerce-default-rtdb.firebaseio.com/category.json', [...category , value])

        // const data = await res.data
        // console.log(data)

        // // Permet l'actualisation de la page
        // window.location.reload();
        
        // console.log(value)
    } 

    return (

        <form onSubmit={handleSubmit(addCategory)} 
            style={{display:'flex' , flexDirection:'column' , alignItems:'center', paddingBottom:'15px'}}
        >
                <h3>Add Category</h3>
                <div style={{display:'flex' , flexDirection:'column'}}>
                    <label>Index Categories</label>
                    <input {...register('index' , {required:"This field is required" , minLength:{value:3 , message:'Should be more or eq than 3'}})} style={{padding:'.6rem'}} type={'text'}/> 
                    <span style={{color:'red'}}>{errors.index?.message}</span>
                </div>

                <div style={{display:'flex' , flexDirection:'column'}}>
                    <label>Nom Categories</label>
                    <input {...register('name' , {required:"This field is required" , minLength:{value:3 , message:'Should be more or eq than 3'}})} style={{padding:'.6rem'}} type={'text'}/> 
                    <span style={{color:'red'}}>{errors.name?.message}</span>
                </div>

                <button type='submit' style={{border:'none' , fontWeight:'bold',  background:'skyblue', padding:'.4rem', marginTop:'15px', borderRadius:'5px', cursor:'pointer'}}>
                    Add New Category
                </button>
        </form>
  )
}

export default AddCategories