import React,{useState,useEffect} from 'react'
import {Row,Col,Navbar,Nav,Form, Container,Image} from 'react-bootstrap'
import {useAuthDispatch} from '../context/auth'
import {gql, useQuery, useLazyQuery} from '@apollo/client'

const GET_USERS=gql`
    query registeredUsers{
        registeredUsers{
            email name password
            latestMessage{
              from to content
            }
          }
      }
`
const GET_MESSAGE=gql`
      query fetchMessage($sender:String!){
        fetchMessage(sender:$sender){
        from to content
        }
      }
`

export default function Home (props){
    const dispatch = useAuthDispatch()
    const [userSelected, setUserSelected]= useState(null)
    const imageUrl="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
    
    const [fetchMessage,{loading:loadingMessages,data:messageData}]=useLazyQuery(GET_MESSAGE)

    useEffect(() => {
        if (userSelected){
            fetchMessage({variables:{sender:userSelected}})
        }
    }, [userSelected])

    if (messageData){
        console.log(messageData.fetchMessage)
    }
    const logout=()=>{
        dispatch({type:'LOGOUT',payload:null})
        props.history.push('/login')
    }
    const {loading, data, error}= useQuery(GET_USERS)

    let usersTable
    if (loading || !data){
        usersTable=<p>Loading</p>
    }
    else if (data.registeredUsers.length===0){
        usersTable=<p>No Users Yet</p>
    }
    else if (data.registeredUsers.length>0){
        usersTable=data.registeredUsers.map(user=>(
            <div className="d-flex p-3" key={user.email} onClick={()=> setUserSelected(user.email)}>
                <Image src={imageUrl} roundedCircle className="mr-2" 
                    style={{width:50, height:50,objectFit:'cover'}}
                />
                <div>
                    <p className="text-success" style={{marginBottom:0}}>{user.name}</p>
                    <p className="font-weight-light m-0">
                        {user.latestMessage ? user.latestMessage.content :"Welcome to the chat!"} 
                    </p>
                </div> 
                
                <hr/>
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
                                <Nav.Link href="/login" onClick={logout} className='tabs-section'>Logout</Nav.Link>

                                </Nav>
                                <Form inline>
                                <Nav.Link href='/about' className='tabs-section'>About</Nav.Link>
                                </Form>
                            </Navbar>
                        </Col>
                    </Row>
                    <Row >
                        <Col xs={4} className="px-0" style={{backgroundColor:'#e7d9ea'}}> 
                            <center>Participants</center>
                            <i className="fas fa-user-friends"></i>
                            {usersTable}    
                        </Col>
                        <Col xs={8}>
                            <center>Messages</center>
                        </Col>
                    </Row>
            </Container>
            </div>
    )
}