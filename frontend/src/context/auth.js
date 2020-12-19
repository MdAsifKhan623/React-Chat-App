import React, {createContext, useReducer, useContext} from 'react'
import jwtDecode from 'jwt-decode'

const AuthStateContext=createContext()
const AuthDispatchContext=createContext()
const token= localStorage.getItem('token')

if (token){
    const decodeToken=jwtDecode(token)
    const timeExpires= new Date(decodeToken.exp * 1000)
    console.log(timeExpires)
}else{
    console.log("There's no token ")
}
const authReducer=(state,action)=>{
    switch(action.type){
        case 'LOGIN':
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                user:action.payload
            }
        case 'LOGOUT':
            localStorage.removeItem('token')
            return{
                ...state,
                user:null
            }
        default:
            throw new Error(`Unknown Action Type:${action.type}`)
    }
}

export const AuthProvider=({children})=>{
    const [state, dispatch]=useReducer(authReducer,{user:null})

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
