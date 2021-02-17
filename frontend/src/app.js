import React from 'react'
import './css/app.scss'
import './css/styles.css'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import Register from './pages/register'
import Home from './pages/ChatHome/home'
import Login from './pages/login'
import ApolloProvider1 from './AppoloProvider'
import {AuthProvider} from '../src/context/auth'
import NewDynamic from './pages/newRouteDynamic'
import {MessageProvider} from '../src/context/messageContext'

function App(){
    return (
        <ApolloProvider1>
            <AuthProvider>
                <MessageProvider>
                    <Router>
                            <Switch>
                                <NewDynamic exact path="/" component={Home} authenticated="true" />
                                <NewDynamic exact path="/register" component={Register} guest="true"/>
                                <NewDynamic exact path="/login" component={Login} guest="true"/>
                            </Switch>
                    </Router>
                </MessageProvider>
            </AuthProvider>
        </ApolloProvider1>
    )
}

export default App