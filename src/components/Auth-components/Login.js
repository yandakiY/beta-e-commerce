import React from 'react'
import { Button, Container, Figure, FloatingLabel, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';

const Login = ({connectUser , errorLogin}) => {

    const {register , handleSubmit , formState:{errors}} = useForm();

    

  return (
    <>
        {/* Figure Et Titre */}
        <Container className='mt-4 text-center'>
            <h1 style={{fontFamily:'Montserrat'}}>Login</h1>
            <Figure>
                <Figure.Image
                    width={270}
                    height={285}
                    alt="171x180"
                    src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                />
            </Figure>
        </Container>
        
        {/* Forms */}
        <Container>
            <Row className='text-center justify-content-center'>
                <Form style={{width:'450px'}} onSubmit={handleSubmit(connectUser)}>
                    <FloatingLabel label="E-mail" className='mb-4'>
                        <Form.Control placeholder='E-mail' {...register('email' , {required:'Mail is required' , pattern:{value:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , message:'E-mail type is required'}})}/>
                        <Form.Text style={{fontWeight:'bold' , fontFamily:'Montserrat'}} className='text-danger'>{errors.email?.message}</Form.Text>
                    </FloatingLabel>

                    <FloatingLabel label="Password">
                        <Form.Control type='password' placeholder='Password' {...register('password' , {required:'Password is required' , minLength:{value:8 , message:'Password should 8 or more charcets'}})} />
                        <Form.Text style={{fontWeight:'bold' , fontFamily:'Montserrat'}} className='text-danger'>{errors.password?.message}</Form.Text>
                    </FloatingLabel>

                    {errorLogin !== '' && <Form.Group>
                            <Form.Text style={{fontWeight:'bold' , fontFamily:'Montserrat', fontSize:'22px'}} className='text-danger'>{errorLogin}</Form.Text>
                        </Form.Group>
                    }
                    <Button type='submit' variant='primary' size='lg' className='mt-4'>
                        Login
                    </Button>
                </Form>
            </Row>
        </Container>
    </>
  )
}

export default Login