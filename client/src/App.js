import React from 'react'
import { BrowserRouter as Router, Switch ,Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Vacations_view from './components/Vacations_view'
import Form from './components/Form'
import Reports from './components/Reports'
import Vacation_edit from './components/Vacation_edit'

export default function App() {
  return (
    <Router>      
      <div>
        <Switch>
          <Route path="/login"          component={Login}/>
          <Route path="/register"       component={Register}/>
          <Route path="/vacations_view" component={Vacations_view}/>
          <Route path="/form"           component={Form}/>
          <Route path="/reports"        component={Reports}/>
          <Route path="/vacation_edit"  component={Vacation_edit}/>
          <Redirect exact from="/" to="/login" />
        </Switch>
      </div>
    </Router>
  )
}
