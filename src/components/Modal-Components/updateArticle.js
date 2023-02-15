import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import {useForm} from 'react-hook-form'
import { useSelector } from 'react-redux';

const UpdateArticle = ({show , handleClose , article}) => {

  // const {register , handleSubmit} = useForm();
  // console.log(article)

  let category = useSelector(state => state.category.category)

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Change value for Article {article.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    {/* Label - Control/Select - Select ? option --  Or Text */}
                    <Form.Label>Category</Form.Label>
                      <Form.Select
                      //  {...register('category')}
                      >
                          {category.map(e => e.name).map((e , i) => <option key={i} value={e}>{e}</option>)}
                          {/* <option>{"Test 1"}</option>
                          <option>{"Test 2"}</option>
                          <option>{"Test 3"}</option> */}
                      </Form.Select>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default UpdateArticle