import React from 'react'
import {gql, useQuery} from '@apollo/client'
import {Col,Image} from 'react-bootstrap'
import classNames from 'classnames'
import {useMessageDispatch,useMessageState} from '../../context/messageContext'

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

export default function ChatUsers({setUserSelected, selectedUser}) {
    // const {loading, data, error}= useQuery(GET_USERS)
    const messageDispatch=useMessageDispatch()
    const {users}= useMessageState()
    const {loading}=useQuery(GET_USERS,{
        onCompleted: data => messageDispatch({type:'SET_USERS', payload:data.registeredUsers}),
        onError:error=> console.log(error)

    })
    const imageUrl="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
    let usersTable
    if (loading || !users){
        usersTable=<p>Loading</p>
    }
    else if (users.length===0){
        usersTable=<p>No Users Yet</p>
    }
    else if (users.length>0){
        usersTable=users.map(user=>{
            const sUSer=selectedUser===user.email
            return (<div role="button" 
                    className={classNames('d-flex p-3 selected-div',{
                        'bg-white':sUSer,
                    })} key={user.email} onClick={()=> {
                        setUserSelected(user.email)
                        messageDispatch({type:'SET_SELECTED_USER',payload:user.email})
                        }}>
                    <Image src={imageUrl} roundedCircle className="mr-2" 
                    style={{width:50, height:50,objectFit:'cover'}}
                    />
                <div className="d-none d-md-block">
                    <p className="text-success" style={{marginBottom:0}}>{user.name}</p>
                    <p className="font-weight-light m-0">
                        {user.latestMessage ? user.latestMessage.content :"Welcome to the chat!"} 
                    </p>
                </div> 
                
                <hr/>
            </div>)
        })

    }
    return (
        <Col xs={2} md={4} className="px-0" style={{backgroundColor:'#e7d9ea'}}> 
            <center><i className="fas fa-user-friends fa-2x mt-2"></i></center>
            {usersTable}    
        </Col>
    )
}
