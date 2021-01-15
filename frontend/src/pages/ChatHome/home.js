import React,{useState,useEffect} from 'react'
import {Row,Col,Navbar,Nav,Form, Container} from 'react-bootstrap'
import {useAuthDispatch} from '../../context/auth'
import {gql, useLazyQuery,useMutation} from '@apollo/client'
import ChatUsers from './ChatUsers'


const GET_MESSAGE=gql`
      query fetchMessage($sender:String!){
        fetchMessage(sender:$sender){
        from to content messageTime
        }
      }
`
const SEND_MESSAGE=gql`
      mutation sendMessage($to:String!,$content:String!){
          sendMessage(to:$to,content:$content){
              uuid,from,to,content
          }
      }
`

export default function Home (props){
    const dispatch = useAuthDispatch()
    const [userSelected, setUserSelected]= useState(null)
    const [content,setContent]=useState('')
    
    const [fetchMessage,{loading:loadingMessages,data:messageData}]=useLazyQuery(GET_MESSAGE)

    const [sendMessage]=useMutation(SEND_MESSAGE,{
        refetchQueries:resultMutation=>[{query:GET_MESSAGE, variables:{sender:userSelected}}],
        onError: err=> console.log(err)

    })

    useEffect(() => {
        if (userSelected){
            fetchMessage({variables:{sender:userSelected}})
        }
    }, [userSelected])

    const logout=()=>{
        dispatch({type:'LOGOUT',payload:null})
        props.history.push('/login')
        window.location.href='/login'
    }

    const submitMessage=(e)=>{
        e.preventDefault()
        if (content===''){
            return
        }
        sendMessage({variables:{to:userSelected, content:content}})
        setContent('')
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
                        <Col xs={10} md={8} >
                            <div className="message-section d-flex flex-column-reverse">
                                {messageData && messageData.fetchMessage.length>0 ?  ( 
                                        messageData.fetchMessage.map((message)=>(    
                                            message.from===userSelected? (
                                                <div className=" mr-auto">
                                                    <div className="d-flex my-3">
                                                        <div className="py-2 px-3 rounded-pill bg-primary">
                                                            <p className="text-white " key={message.uuid}>{message.content}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {new Date(message.messageTime).toLocaleString()}
                                                    </div>
                                                </div>
                                                    
                                                ):(

                                                <div className=" ml-auto">
                                                    <div className="d-flex my-3">
                                                        <div className="py-2 px-3 rounded-pill bg-secondary">
                                                            <p className="text-white " key={message.uuid}>{message.content}</p>
                                                        </div>
                                                    </div>
                                                   <div>
                                                        {new Date(message.messageTime).toLocaleString()}
                                                   </div> 
                                                </div>)                   
                                            
                                        ))
                                ):<div className="not-connected" style={{color:'#556052'}}>No Messages yet! Start the Conversation</div>}
                            </div>
                            {userSelected && <div>
                                <Form onSubmit={submitMessage} >
                                    <Form.Group className="d-flex align-items-center">
                                        <Form.Control 
                                        type="text"
                                        className="message-input ip-field rounded-pill border-5"
                                        placeholder="Type a Message."
                                        value={content}
                                        style={{backgroundColor:'#dfe0df'}}
                                        onChange={(e)=>setContent(e.target.value)}
                                         />
                                         <i className="far fa-paper-plane fa-2x ml-2" onClick={submitMessage}></i>

                                    </Form.Group>
                                </Form>
                                
                            </div>}
                            
                        </Col>
                    </Row>
            </Container>
            </div>
    )
}