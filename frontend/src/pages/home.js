import React from 'react'
import {Row,Col,Navbar,Nav,Form, Container} from 'react-bootstrap'
import {useAuthDispatch} from '../context/auth'
import {gql, useQuery} from '@apollo/client'
import {Redirect} from 'react-router-dom'

const GET_USERS=gql`
    query registeredUsers{
        registeredUsers{
          email name
        }
      }
`

export default function Home (props){
    const dispatch = useAuthDispatch()
    console.log('inside home section')
    const token= localStorage.getItem('token')
    const logout=()=>{
        dispatch({type:'LOGOUT',payload:null})
        // return <Redirect to="/login"/>
        props.history.push('/login')
    }

    const {loading, data, error}= useQuery(GET_USERS)
    if (error){
        console.log(error)
    }

    if (data){
        console.log(token)
        console.log(data)
    }
    let usersTable
    if (loading || !data){
        usersTable=<p>Loading</p>
    }
    else if (data.registeredUsers.length===0){
        usersTable=<p>No Users Yet</p>
    }
    else if (data.registeredUsers.length>0){
        usersTable=data.registeredUsers.map(user=>(
            <div key={user.email}>
                <p>{user.name}</p>
            </div>
        ))

    }
    return (
            <div>
            <Container fluid>
                    <Row>
                        <Col>
                            <Navbar bg="dark" variant="dark" className="nav-header">
                                <Navbar.Brand href="/" style={{"fontFamily":"sans-serif"}}>Chat App</Navbar.Brand>
                                <Nav className="mr-auto">
                                <Nav.Link href="/" className='tabs-section'>Home</Nav.Link>
                                <Nav.Link href="/login" className='tabs-section'>Login</Nav.Link>
                                <Nav.Link href="/register" className='tabs-section'>Register</Nav.Link>
                                <button onClick={logout}>Logout</button>
                                </Nav>
                                <Form inline>
                                <Nav.Link href='/about' className='tabs-section'>About</Nav.Link>
                                </Form>
                            </Navbar>
                        </Col>
                    </Row>
                    <Row >
                        <Col xs={4}>
                            {usersTable}    
                        </Col>
                        <Col xs={8}>

                        </Col>
                    </Row>
            </Container>
            </div>
    )
}