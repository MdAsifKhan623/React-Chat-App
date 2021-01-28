import React,{useState} from 'react'
import { 
    Row, 
    Col,
    Form,
    Button,
    Card 
    } from 'react-bootstrap'
    
import { gql, useMutation } from '@apollo/client';
import {Link} from 'react-router-dom'

const REGISTER_USER = gql`
    mutation register($name: String!, $email:String!, $password:String!, $confirmPassword:String!) {
        register(name: $name, email: $email, password:$password, confirmPassword:$confirmPassword) {
            name
            email
        }
    }
`;

const cardstyle={
    border:"3px solid #19d3da",
}
function Register(props){
    const [variables,setVariables]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        image:""
    })
    let [errors,setErrors]=useState({})
    const [registerUser, { loading }] = useMutation(REGISTER_USER,{
        update(_,__){
            props.history.push('/login')
        },
        onError(err){
            console.log(err.graphQLErrors[0].extensions.error)
            setErrors(err.graphQLErrors[0].extensions.error)
        }
    });
    const submitForm= (e)=>{
        e.preventDefault()
        registerUser({ variables })
    }
    return (
        <Card className="register-card" style={cardstyle}>
            <Row className='p-5'>
                <Col className="register-col">
                    <h1 className="text-center">Register</h1>
                    <Form onSubmit={submitForm}>
                        <Form.Group >
                            <Form.Label className={errors.name && 'text-danger' }>
                            {errors.name ?? 'Full Name'}
                            </Form.Label>
                            <Form.Control type="text" 
                            value={variables.name}
                            className={errors.name && 'in-valid'}
                            onChange={(e)=>{
                                setVariables({...variables,name:e.target.value})
                            }}  />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label className={errors.email && 'text-danger' }>
                                {errors.email ?? 'Email'}
                            </Form.Label>
                            <Form.Control type="email"
                            value={variables.email}
                            className={errors.email && 'in-valid'}
                            onChange={(e)=>{
                                setVariables({...variables,email:e.target.value})
                            }}  />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label className={errors.password && 'text-danger' }>
                                {errors.password ?? 'Password'}
                            </Form.Label>
                            <Form.Control type="password"
                            value={variables.password}
                            className={errors.password && 'in-valid'}
                            onChange={(e)=>{
                                setVariables({...variables,password:e.target.value})
                            }} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label className={errors.confirmPassword && 'text-danger' }>
                                {errors.confirmPassword ?? 'Confirm Password'}
                            </Form.Label>
                            <Form.Control type="password"
                            value={variables.confirmPassword}
                            className={errors.confirmPassword && 'in-valid'}
                            onChange={(e)=>{
                                setVariables({...variables,confirmPassword:e.target.value})
                            }}  />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label className={errors.image && 'text-danger' }>
                                {errors.image ?? 'Enter Image URL'}
                            </Form.Label>
                            <Form.Control type="password"
                            value={variables.image}
                            className={errors.image && 'in-valid'}
                            onChange={(e)=>{
                                setVariables({...variables,image:e.target.value})
                            }}  />
                        </Form.Group>
                        <div className="text-center">
                        <Button variant="success" type="submit" disabled={loading}>
                            {loading ? 'loading..':'Submit'}
                        </Button>
                        <br/>
                        <small>
                            <p>Do you want to Login?</p> <Link to="/login">Login</Link>
                        </small>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Card>
    )
}
export default Register