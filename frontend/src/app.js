import React from 'react'
import { Container } from 'react-bootstrap'

import './css/app.scss'
import './css/styles.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Register from './pages/register'
import Home from './pages/home'
import Login from './pages/login'
import ApolloProvider1 from './AppoloProvider'
import {AuthProvider} from '../src/context/auth'


function App(){
    return (
        <ApolloProvider1>
            <AuthProvider>
                <Router>
                    <Container fluid>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                        </Switch>
                    </Container>
                </Router>
            </AuthProvider>
        </ApolloProvider1>
    )
}

export default App