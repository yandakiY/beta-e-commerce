import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import {useForm} from 'react-hook-form'
import { useSelector } from 'react-redux';

const UpdateArticle = ({show , handleClose}) => {

    let category = useSelector(state => state.category.category)

    // Use redux for give state valueModalUpdateArticle
    let valueArticleToUpdate = useSelector(state => state.modal.valueModalUpdateArticle)

    // console.log(valueArticleToUpdate)
    const {register , handleSubmit , watch , setValue , reset} = useForm();

    const sendSubmit = (value) =>{

        console.log(value)
        handleClose()
        window.location.reload()
    }

    //Use reset for the solution ???
    // React.useEffect(() => {
    //     reset({...valueArticleToUpdate})
    // } , [reset]);

    // Use setValue for the solution ???
    React.useEffect(() => {
        setValue('id' , valueArticleToUpdate.id)
        setValue('name' , valueArticleToUpdate.name)
        setValue('category' , valueArticleToUpdate.category)
        setValue('price' , valueArticleToUpdate.price)
        setValue('number' , valueArticleToUpdate.number)
    });

  return (
    <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Update Article {valueArticleToUpdate.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Id Article</Form.Label>
                        <Form.Control type='text' disabled {...register('id')} />
                    </Form.Group>
                    {/* Select Form Group */}
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select defaultValue={valueArticleToUpdate.category} {...register('category')}>
                            {category.map(e => e.name).map((e , i) => <option key={i} value={e}>{e}</option>)}
                        </Form.Select>
                    </Form.Group>  {/**/}
                   <Form.Group>
                        <Form.Label>Name Article</Form.Label>
                        <Form.Control type='text' {...register('name')}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price Article ($)</Form.Label>
                        <Form.Control type='text' {...register('price')}/>
                    </Form.Group>
                     <Form.Group>
                        <Form.Label>Number Article</Form.Label>
                        <Form.Control type='text' {...register('number')}/>
                    </Form.Group>  {/**/}
                

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type='submit' onClick={handleSubmit(sendSubmit)}>
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