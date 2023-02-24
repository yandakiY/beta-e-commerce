import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Form, Row } from 'react-bootstrap';
import {useForm} from "react-hook-form"
import { useSelector } from 'react-redux';
import axiosLists from '../../api-axios/axiosLists';

const AddArticles = ({category , lists , addArticle}) => {

    const [cat , setCat] = useState(category)
    
    const {handleSubmit , register , formState:{errors}} = useForm({});

    // Submit Articles in Json Server
  
    return (
        <Form 
            onSubmit={handleSubmit(addArticle)} encType='multipart/form-data'
            style={{display:'flex' , flexDirection:'column' , alignItems:'center', paddingBottom:'15px'}}
        >
            <h3>Add Articles</h3>

            <Container>

                <Row lg={2} md={2} xs={1}>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select {...register('category')} >
                            {cat.map(e => e.name).map((e , i) => <option  key={i} value={e}>{e}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name Article</Form.Label>
                        <Form.Control type='text' {...register('name' , {required:'Name is required' , minLength:{value:3 , message: 'Should be more or eq to 3'}})} />
                        {errors.name?.message && <Form.Text className='text-danger'>{errors.name?.message}</Form.Text>}
                    </Form.Group>
                </Row>
                <Form.Group>
                    <Form.Label>Image of  Article</Form.Label>
                    <Form.Control type='file' accept='images/' {...register('image' , {required: 'Image required'})} />
                    {errors.name?.message && <Form.Text className='text-danger'>{errors.name?.message}</Form.Text>}
                </Form.Group>
                
                <Row lg={2} md={2} xs={1}>
                    <Form.Group>
                        <Form.Label>Price Article ($)</Form.Label>
                        <Form.Control type='text' {...register('price' , {required:'Price is required' , pattern:{value:/^\d*\.?\d*$/g , message:'Should be a number or a decimal'}})} />
                        {errors.price?.message && <Form.Text className='text-danger'>{errors.price?.message}</Form.Text>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Number Article</Form.Label>
                        <Form.Control type='number' {...register('number' , {required:'Number article is required' , min:{value:0 ,message:'Min value is 0'}})} />
                        {errors.number?.message && <Form.Text className='text-danger'>{errors.number?.message}</Form.Text>}
                    </Form.Group>
                </Row>
                

                {/* Button Submit */}
                <button type='submit' style={{border:'none' , fontWeight:'bold',  background:'skyblue', padding:'.4rem', marginTop:'15px', borderRadius:'5px', cursor:'pointer'}}>
                    Add New Category
                </button>
            </Container>
        </Form>
  )
}

export default AddArticles