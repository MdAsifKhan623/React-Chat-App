import React,{useState} from 'react'
import { 
    Row, 
    Col,
    Form,
    Button,
    Card 
    } from 'react-bootstrap'
    
import { gql, useLazyQuery } from '@apollo/client';
import {Link} from 'react-router-dom'
import {useAuthDispatch} from '../context/auth'


const LOGIN_USER = gql`
    query login($email:String!, $password:String!) {
        login(email: $email, password:$password) {
            name
            email
            token
        }
    }
`;

const cardstyle={
    border:"3px solid #19d3da",
}
function Login(props){

    const dispatch= useAuthDispatch()

    const [variables,setVariables]=useState({
        email:"",
        password:"",
    })
    let [errors,setErrors]=useState({})
    const [loginUser, { loading }] = useLazyQuery(LOGIN_USER,{
        onError(err){
            console.log(err)
            setErrors(err.graphQLErrors[0].extensions.error)
            // console.log(errors)
        },
        onCompleted(data){
            dispatch({type:'LOGIN', payload:data.login})
            props.history.push('/')
        }
    });
    const submitForm= (e)=>{
        e.preventDefault()
        loginUser({ variables })
    }
    return (
        <Card className="register-card" style={cardstyle}>
            <Row className='p-5'>
                <Col className="register-col">
                    <h1 className="text-center">Login</h1>
                    <Form onSubmit={submitForm}>
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
                        <div className="text-center">
                        <Button variant="success" type="submit" disabled={loading}>
                            {loading ? 'loading..':'Login'}
                        </Button>
                        <br/>
                        <small>
                            <p>Don't have an Account</p> <Link to="/register" >Register</Link>
                        </small>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Card>
    )
}
export default Login