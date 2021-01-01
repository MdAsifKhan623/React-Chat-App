import React, {createContext, useReducer, useContext} from 'react'
import jwtDecode from 'jwt-decode'

const AuthStateContext=createContext()
const AuthDispatchContext=createContext()
const token= localStorage.getItem('token')

let user=null
if (token){
    const decodeToken=jwtDecode(token)
    const timeExpires= new Date(decodeToken.exp * 1000)
    if (new Date()>timeExpires){
        localStorage.removeItem('token')
    }
    else{
        user=decodeToken
    }
    console.log(timeExpires)
}else{
    console.log("There's no token ")
}
const authReducer=(state,action)=>{
    switch(action.type){
        case 'LOGIN':
            console.log('inside login')
            localStorage.setItem('token', action.payload.token)
            console.log(localStorage.getItem('token'))
            return {
                ...state,
                user:action.payload
            }
        case 'LOGOUT':
            console.log('inside logout')
            localStorage.removeItem('token')
            console.log(localStorage.getItem('token'))
            return{
                ...state,
                user:null
            }
        default:
            throw new Error(`Unknown Action Type:${action.type}`)
    }
}

export const AuthProvider=({children})=>{
    const [state, dispatch]=useReducer(authReducer,{user})

    return (
        <AuthDispatchContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>
                {children}
            </AuthStateContext.Provider>
        </AuthDispatchContext.Provider>
    )
}

export const useAuthState=()=>useContext(AuthStateContext)
export const useAuthDispatch=()=>useContext(AuthDispatchContext)
