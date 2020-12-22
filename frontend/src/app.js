import React from 'react'
import { Container } from 'react-bootstrap'

import './css/app.scss'
import './css/styles.css'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import Register from './pages/register'
import Home from './pages/home'
import Login from './pages/login'
import ApolloProvider1 from './AppoloProvider'
import {AuthProvider} from '../src/context/auth'
import NewDynamic from './pages/newRouteDynamic'

function App(){
    return (
        <ApolloProvider1>
            <AuthProvider>
                <Router>
                    <Container fluid>
                        <Switch>
                            <NewDynamic exact path="/" component={Home} authenticated/>
                            <NewDynamic exact path="/register" component={Register} guest/>
                            <NewDynamic exact path="/login" component={Login} guest/>
                        </Switch>
                    </Container>
                </Router>
            </AuthProvider>
        </ApolloProvider1>
    )
}

export default App