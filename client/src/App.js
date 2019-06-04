import React, {Component} from 'react'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Panel from './components/Panel'
import withAuth from './components/PrivateRoute'
import Dashboard from './components/Dashboard'
import {Switch, Route, BrowserRouter as Router,} from 'react-router-dom'
import ExamPaper from './components/ExamPaper'
import Home from './views/Home'
import Error from './views/Error'
import AddQuestion from "./views/AddQuestion"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import routes from './routes'

const RouteWithSubRoutes = route => (
    <Route path={route.path} render={(props) => (
        <route.component {...props} routes={route.routes}/>
    )}/>
)

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            redirect: false,
            path: ''
        }
    }


    render() {
        return (

                <div>
                    <ToastContainer/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/sign-in' component={SignIn}/>
                        <Route exact path='/sign-up' component={SignUp}/>
                        <Route exact path='/dashboard' component={Dashboard}/>
                        {/*<Route exact path="/exampaper" component={withAuth(ExamPaper)}/>*/}
                        {/*<Route path='/add-question' component={withAuth(AddQuestion)}/>*/}


                        {/*{routes.map((route) => (*/}
                        {/*    <RouteWithSubRoutes key={route.path} {...route}/>*/}
                        {/*))}*/}
                        <Route exact component={Error}/>
                    </Switch>

                </div>
        )
    }
}

export default App
