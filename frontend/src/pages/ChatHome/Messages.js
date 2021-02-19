import React from 'react'
import {gql, useLazyQuery} from '@apollo/client'
import {Col} from 'react-bootstrap'


const GET_MESSAGE=gql`
      query fetchMessage($sender:String!){
        fetchMessage(sender:$sender){
        from to content
        }
      }
`
export default function Messages() {
    const [fetchMessage,{loading:loadingMessages,data:messageData}]=useLazyQuery(GET_MESSAGE)


    useEffect(() => {
        if (userSelected){
            fetchMessage({variables:{sender:userSelected}})
        }
    }, [userSelected])
    return (
        <Col xs={8}>
            <center>Messages</center>
            {messageData && messageData.fetchMessage.length>0 ? (
                messageData.fetchMessage.map(message=>(
                    <p key={message.uuid}>{message.content}</p>
                ))
            ):'No Messages yet! Start the Conversation'}
        </Col>
    )
}
