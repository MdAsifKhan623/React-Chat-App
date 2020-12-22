import React from 'react'
import {useAuthState} from '../../src/context/auth'
import {Redirect,Route} from 'react-router-dom'

export default function NewDynamic(props){
    const {user} = useAuthState()
    console.log(props.authenticated, user)
    if (props.authenticated && !user){
        return <Redirect to="/login" />
    }
    else if (props.guest && user){
        return <Redirect to ="/" />
    }
    else{
        return <Route component={props.component} {...props} />
    }

}