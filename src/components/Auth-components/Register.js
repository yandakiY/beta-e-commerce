import React from 'react'
import { Button, Container, Figure, FloatingLabel, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';

const Register = ({addUser , errorRegister}) => {

    const {register , handleSubmit , setValue , formState:{errors}} = useForm();
    const [viewRegister , setViewRegister] = React.useState(null)

    const wideField = () =>{
        setValue('name' , '')
        setValue('prename' , '')
        setValue('email' , '')
        setValue('password' , '')
    }

    const testPassword = value =>{
        // console.log(value)
        if(value.passwordCheck === '........Boa'){
            setViewRegister(true);
        }else{
            setViewRegister(false)
        }
    }

  return (
    <>
        {(viewRegister === false || viewRegister === null) &&
        /* Test Mot de passe */
        <Container >
            <Row className='text-center justify-content-center'>
                <h1 style={{fontFamily:'Montserrat'}}>Password Admin</h1>
                <Figure>
                    <Figure.Image
                        width={270}
                        height={285}
                        alt="171x180"
                        src="https://www.pngmart.com/files/6/Padlock-PNG-Transparent-Image.png"
                    />
                </Figure>
                <Form style={{width:'450px'}} onSubmit={handleSubmit(testPassword)}>
                    <FloatingLabel controlId="floatingInput" label="Password Admin" className='mb-1'>
                        <Form.Control type='password' placeholder='Password' {...register('passwordCheck' , {required:'This field is required'})} />
                        {viewRegister === false && <Form.Text style={{fontWeight:'bold' , fontFamily:'Montserrat'}} className='text-danger'>Incorrect password</Form.Text>}
                    </FloatingLabel>

                    <Button type='submit' variant='primary' size='lg' className='mt-4'>
                        Validate
                    </Button>
                </Form>
            </Row>
        </Container>}

        {viewRegister === true &&
            <>
                {/* Figure Et Titre */}
                <Container className='mt-4 text-center'>
                    <h1 style={{fontFamily:'Montserrat'}}>Register</h1>
                    <Figure>
                        <Figure.Image
                            width={270}
                            height={285}
                            alt="171x180"
                            src="https://icon-library.com/images/registration-icon/registration-icon-11.jpg"
                        />
                    </Figure>
                </Container>
                
                {/* Forms */}
                <Container>
                    <Row className='text-center justify-content-center'>
                        <Form style={{width:'450px'}} onSubmit={handleSubmit(addUser , wideField)}>
                            <FloatingLabel controlId="floatingInput" label="Name" className='mb-1'>
                                <Form.Control type='text' placeholder='Name' {...register('name' , {required:'Name is required' , minLength:{value:3 , message:'Not considering less 3 charcets'}})} />
                                <Form.Text style={{fontWeight:'bold' , fontFamily:'Montserrat'}} className='text-danger'>{errors.name?.message}</Form.Text>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Prename" className='mb-1'>
                                <Form.Control type='text' placeholder='Prename' {...register('prename' , {required:'Prename is required' , minLength:{value:3 , message:'Not considering less 3 charcets'}})} />
                                <Form.Text style={{fontWeight:'bold' , fontFamily:'Montserrat'}} className='text-danger'>{errors.prename?.message}</Form.Text>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="E-mail" className='mb-1'>
                                <Form.Control type='text' placeholder='E-mail' {...register('email' , {required:'Mail is required' , pattern:{value:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , message:'E-mail type is required'}})} />
                                <Form.Text style={{fontWeight:'bold' , fontFamily:'Montserrat'}} className='text-danger'>{errors.email?.message}</Form.Text>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Password">
                                <Form.Control type='password' placeholder='Password'  {...register('password' , {required:'Password is required' , minLength:{value:8 , message:'Password should 8 or more charcets'}})} />
                                <Form.Text style={{fontWeight:'bold' , fontFamily:'Montserrat'}} className='text-danger'>{errors.password?.message}</Form.Text>
                            </FloatingLabel>


                            {errorRegister !== '' && <Form.Group>
                                    <Form.Text style={{fontWeight:'bold' , fontFamily:'Montserrat', fontSize:'22px'}} className='text-danger'>{errorRegister}</Form.Text>
                            </Form.Group>}

                            <Button type='submit' variant='primary' size='lg' className='mt-4'>
                                Register here
                            </Button>
                        </Form>
                    </Row>
                </Container>
            </>
        }
    </>
  )
}

export default Register