import React from 'react'
import { Container } from 'react-bootstrap'

import './css/app.scss'
import './css/styles.css'
import Register from './pages/register'
import ApolloProvider1 from './AppoloProvider'

function App(){
    return (
        <ApolloProvider1>
            <Container fluid>
                <Register/>
            </Container>
        </ApolloProvider1>
    )
}

export default App