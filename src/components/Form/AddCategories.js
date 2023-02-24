import axios from 'axios'
import React from 'react'
import { Container, Form } from 'react-bootstrap'
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

        <Form onSubmit={handleSubmit(addCategory)} 
            style={{display:'flex' , flexDirection:'column' , alignItems:'center', paddingBottom:'15px'}}
        >
                <h3>Add Category</h3>

                <Container>
                    <Form.Group>
                        <Form.Label>Index (Code) Category</Form.Label>
                        <Form.Control type='text'{...register('index' , {required:"Index is required" , minLength:{value:3 , message:'Should be more or eq than 3'}})} />
                        {errors.index?.message && <Form.Text className='text-danger'>{errors.index?.message}</Form.Text>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Name Category</Form.Label>
                        <Form.Control type='text' {...register('name' , {required:"Index is required" , minLength:{value:3 , message:'Should be more or eq than 3'}})} />
                        {errors.name?.message && <Form.Text className='text-danger'>{errors.name?.message}</Form.Text>}
                    </Form.Group>

                    <button type='submit' style={{border:'none' , fontWeight:'bold',  background:'skyblue', padding:'.4rem', marginTop:'15px', borderRadius:'5px', cursor:'pointer'}}>
                        Add New Category
                    </button>
                </Container>
        </Form>
  )
}

export default AddCategories