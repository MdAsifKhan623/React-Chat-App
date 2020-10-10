import React from 'react'
import { Container } from 'react-bootstrap'

import './css/app.scss'
import './css/styles.css'
import Register from './pages/register'
import ApolloProvider from './AppoloProvider'

function App(){
    return (
        <ApolloProvider>
            <Container fluid>
                <Register/>
            </Container>
        </ApolloProvider>
    )
}

export default App