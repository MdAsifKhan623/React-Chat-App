import React from 'react'
import { Container } from 'react-bootstrap'

import './css/app.scss'
import './css/styles.css'
import Register from './pages/register'

function App(){
    return (
        <Container fluid>
            <Register/>
        </Container>
    )
}

export default App