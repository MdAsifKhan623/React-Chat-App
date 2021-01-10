import React,{useState,useEffect} from 'react'
import {Row,Col,Navbar,Nav,Form, Container} from 'react-bootstrap'
import {useAuthDispatch} from '../../context/auth'
import {gql, useLazyQuery} from '@apollo/client'
import ChatUsers from './ChatUsers'


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
    
    
    const [fetchMessage,{loading:loadingMessages,data:messageData}]=useLazyQuery(GET_MESSAGE)

    useEffect(() => {
        if (userSelected){
            fetchMessage({variables:{sender:userSelected}})
        }
    }, [userSelected])

    const logout=()=>{
        dispatch({type:'LOGOUT',payload:null})
        props.history.push('/login')
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
                        <ChatUsers setUserSelected={setUserSelected} selectedUser={userSelected}/>
                        <Col xs={8}>
                            <center>Messages</center>
                            {messageData && messageData.fetchMessage.length>0 ? (
                                messageData.fetchMessage.map(message=>(
                                    <p key={message.uuid}>{message.content}</p>
                                ))
                            ):'No Messages yet! Start the Conversation'}
                        </Col>
                    </Row>
            </Container>
            </div>
    )
}