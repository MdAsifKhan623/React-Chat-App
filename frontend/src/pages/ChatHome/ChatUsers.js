import React from 'react'
import {gql, useQuery} from '@apollo/client'
import {Col,Image} from 'react-bootstrap'
import classNames from 'classnames'

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
    const {loading, data, error}= useQuery(GET_USERS)
    const imageUrl="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
    let usersTable
    if (loading || !data){
        usersTable=<p>Loading</p>
    }
    else if (data.registeredUsers.length===0){
        usersTable=<p>No Users Yet</p>
    }
    else if (data.registeredUsers.length>0){
        usersTable=data.registeredUsers.map(user=>{
            const sUSer=selectedUser===user.email
            return (<div role="button" 
                    className={classNames('d-flex p-3 selected-div',{
                        'bg-white':sUSer,
                    })} key={user.email} onClick={()=> setUserSelected(user.email)}>
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
            </div>)
        })

    }
    return (
        <Col xs={4} className="px-0" style={{backgroundColor:'#e7d9ea'}}> 
            <center>Participants</center>
            <i className="fas fa-user-friends"></i>
            {usersTable}    
        </Col>
    )
}
