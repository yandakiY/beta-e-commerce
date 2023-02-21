import axios from 'axios';
import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import {useForm} from 'react-hook-form'
import { useSelector } from 'react-redux';

const UpdateArticle = ({show , handleClose}) => {
    
    // Use redux for give state valueModalUpdateArticle
    let valueArticleToUpdate = useSelector(state => state.modal.valueModalUpdateArticle)
    
    const {register , handleSubmit , setValue , formState:{errors}} = useForm();

    // console.log(article)
    const handleCloseModal = () =>{
        handleClose();
        // errors = false
        window.location.reload()
    }


    // Set the values in the Input
    React.useEffect(() => {
        setValue('id' , valueArticleToUpdate.id)
        setValue('name' , valueArticleToUpdate.name)
        setValue('price' , valueArticleToUpdate.price)
        setValue('number' , valueArticleToUpdate.number)
        setValue('category' , valueArticleToUpdate.category)
    } , [setValue, valueArticleToUpdate.category, valueArticleToUpdate.id, valueArticleToUpdate.name, valueArticleToUpdate.number, valueArticleToUpdate.price])

    // React.useEffect(() => {

    // })

    let category = useSelector(state => state.category.category)
    
    const onError = (error) => console.log(error)

    const sendSubmit = async (value) =>{

        console.log(value)

        let data = await axios.put(`http://localhost:5000/lists/${value.id}` , {...value , stocked: value.number > 0 ? true : false})
        handleClose()
        window.location.reload()
    }

    

  return (
    <>
        <Modal show={show} onHide={handleCloseModal}>
            <Modal.Header closeButton>
            {/* <Modal.Title>Update Article {info.name}</Modal.Title> */}
            <Modal.Title>Update Article {valueArticleToUpdate.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(sendSubmit , onError)}>
                    <Form.Group>
                        <Form.Label>Id Article</Form.Label>
                        <Form.Control type='text' disabled {...register('id')} />
                    </Form.Group>
                    {/* Select Form Group */}
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select {...register('category')} >
                            {category.map(e => e.name).map((e , i) => <option  key={i} value={e}>{e}</option>)}
                        </Form.Select>
                    </Form.Group>  {/**/}
                   <Form.Group>
                        <Form.Label>Name Article</Form.Label>
                        <Form.Control type='text' {...register('name' , {required:'Name is required'})} />
                        {errors.name?.message && <Form.Text className='text-danger'>{errors.name?.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price Article ($)</Form.Label>
                        <Form.Control type='text' {...register('price' , {required:'Price is required' , pattern:{value:/^\d*\.?\d*$/g , message:'Should be a number or a decimal'}})} />
                        {errors.price?.message && <Form.Text className='text-danger'>{errors.price?.message}</Form.Text>}
                    </Form.Group>
                     <Form.Group>
                        <Form.Label>Number Article</Form.Label>
                        <Form.Control type='number' {...register('number' , {required:'Number article is required' , min:{value:0 ,message:'Min value is 0'}})} />
                        {errors.number?.message && <Form.Text className='text-danger'>{errors.number?.message}</Form.Text>}
                    </Form.Group>  {/**/}
                

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" type='submit'>
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default UpdateArticle