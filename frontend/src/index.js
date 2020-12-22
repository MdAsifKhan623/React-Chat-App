import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
// import Login from '../src/pages/login'
// import Register from '../src/pages/register'
// import {BrowserRouter as Router,Route, Switch, Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
 <div>
   {/* <Router>
      <Switch>
         <Route path="/login" component={Login}/>
         <Route path="/register" component={Register} />
         <Route path="/" component={App} />
         <Redirect to="/login" />
      </Switch>
    </Router> */}
    <App/>
 </div>,document.getElementById('root')   
)