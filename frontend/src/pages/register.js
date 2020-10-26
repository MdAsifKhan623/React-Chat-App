import React,{useState} from 'react'
import { 
    Row, 
    Col,
    Form,
    Button,
    Card 
    } from 'react-bootstrap'
    
import { gql, useMutation } from '@apollo/client';

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
function Register(){
    const [form,setFormValues]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    let [error,setErrors]=useState({})
    const [registerUser, { loading }] = useMutation(REGISTER_USER,{
        update(_,res){
            console.log(res)
        },
        onError(err){
            console.log(err)
            console.log(err.graphQLErrors)
        }
    });
    const submitForm= (e)=>{
        e.preventDefault()
        console.log(form)
        registerUser({ form })
    }
    return (
        <Card className="register-card" style={cardstyle}>
            <Row className='p-5'>
                <Col className="register-col">
                    <h1 className="text-center">Register</h1>
                    <Form onSubmit={submitForm}>
                        <Form.Group >
                            <Form.Label className={error.name && 'text-danger' }>
                            {error.name ?? 'Full Name'}
                            </Form.Label>
                            <Form.Control type="text" 
                            value={form.name}
                            className={error.name && 'in-valid'}
                            onChange={(e)=>{
                                setFormValues({...form,name:e.target.value})
                            }}  />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label className={error.email && 'text-danger' }>
                                {error.email ?? 'Email'}
                            </Form.Label>
                            <Form.Control type="email"
                            value={form.email}
                            className={error.email && 'in-valid'}
                            onChange={(e)=>{
                                setFormValues({...form,email:e.target.value})
                            }}  />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label className={error.password && 'text-danger' }>
                                {error.password ?? 'Password'}
                            </Form.Label>
                            <Form.Control type="password"
                            value={form.password}
                            className={error.password && 'in-valid'}
                            onChange={(e)=>{
                                setFormValues({...form,password:e.target.value})
                            }} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label className={error.confirmPassword && 'text-danger' }>
                                {error.confirmPassword ?? 'Confirm Password'}
                            </Form.Label>
                            <Form.Control type="password"
                            value={form.confirmPassword}
                            className={error.confirmPassword && 'in-valid'}
                            onChange={(e)=>{
                                setFormValues({...form,confirmPassword:e.target.value})
                            }}  />
                        </Form.Group>
                        <div className="text-center">
                        <Button variant="success" type="submit" disabled={loading}>
                            {loading ? 'loading..':'Submit'}
                        </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Card>
    )
}
export default Register