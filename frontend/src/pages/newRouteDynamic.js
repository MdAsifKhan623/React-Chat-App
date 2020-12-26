import React from 'react'
import {useAuthState} from '../../src/context/auth'
import {Redirect,Route} from 'react-router-dom'

export default function NewDynamic(props){
    const {user} = useAuthState()
    
    if (props.authenticated && !user){
        console.log('inside the new dynamic function login')
        return <Redirect to="/login" />
        
    }
    else if (props.guest && user){
        console.log('inside the new dynamic function home page')
        return <Redirect to ="/" />
        
    }
    else{
        console.log('inside the new dynamic function else')
        return <Route component={props.component} {...props} />
    }

}