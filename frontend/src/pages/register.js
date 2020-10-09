import React,{useState} from 'react'
import { 
    Row, 
    Col,
    Form,
    Button,
    Card 
    } from 'react-bootstrap'
const cardstyle={
    border:"3px solid #19d3da",
}
function Register(){
    const [form,setFormValues]=useState({
        fName:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const submitForm= (e)=>{
        e.preventDefault()
        console.log(form)
    }
    return (
        <Card className="register-card" style={cardstyle}>
            <Row className='p-5'>
                <Col className="register-col">
                    <h1 className="text-center">Register</h1>
                    <Form onSubmit={submitForm}>
                        <Form.Group >
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" 
                            value={form.fName}
                            onChange={(e)=>{
                                setFormValues({...form,fName:e.target.value})
                            }}  />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email"
                            value={form.email}
                            onChange={(e)=>{
                                setFormValues({...form,email:e.target.value})
                            }}  />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                            value={form.password}
                            onChange={(e)=>{
                                setFormValues({...form,password:e.target.value})
                            }} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password"
                            value={form.confirmPassword}
                            onChange={(e)=>{
                                setFormValues({...form,confirmPassword:e.target.value})
                            }}  />
                        </Form.Group>
                        <div className="text-center">
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Card>
    )
}
export default Register