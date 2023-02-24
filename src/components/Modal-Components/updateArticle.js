import axios from 'axios';
import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import {useForm} from 'react-hook-form'
import { useSelector } from 'react-redux';
import axiosLists from '../../api-axios/axiosLists';

const UpdateArticle = ({show , updateArticle , handleClose}) => {
    
    // Use redux for give state valueModalUpdateArticle
    let valueArticleToUpdate = useSelector(state => state.modal.valueModalUpdateArticle)
    
    const {register , handleSubmit , watch , getValues , setValue , formState:{errors}} = useForm();


    // Set the values in the Input
    React.useEffect(() => {
        setValue('id' , valueArticleToUpdate.id)
        setValue('name' , valueArticleToUpdate.name)
        setValue('price' , valueArticleToUpdate.price)
        setValue('number' , valueArticleToUpdate.number)
        setValue('category' , valueArticleToUpdate.category)

    } , [setValue,valueArticleToUpdate.category, valueArticleToUpdate.id, valueArticleToUpdate.name, valueArticleToUpdate.number, valueArticleToUpdate.price])

    let category = useSelector(state => state.category.category)
    
    const onError = (error) => console.log(error)


    // const getImage = () => {
    //     // console.log(watch('image'))
    //     setValue('image' , 'Image set value')
    // }
    

  return (
    <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            {/* <Modal.Title>Update Article {info.name}</Modal.Title> */}
            <Modal.Title>Update Article {valueArticleToUpdate.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(updateArticle , onError )}>
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
                        <Form.Label>Image Article</Form.Label>
                        <Form.Control type='file' accept='image/*' {...register('image' , {required:'Image is required'})} />
                        {errors.image?.message && <Form.Text className='text-danger'>{errors.image?.message}</Form.Text>}
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
                        <Button variant="secondary" onClick={handleClose}>
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