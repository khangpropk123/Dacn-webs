import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link,} from 'react-router-dom'
// import withAuth from '../components/PrivateRoute'
import Panel from '../components/Panel'
import UploadQuestion from '../components/upload/UploadQuestion'
import UploadStudentList from '../components/upload/UploadStudentList'
import QuestionsManager from '../views/QuestionsManager'
import AddQuestion from '../views/AddQuestion'
import {Navbar, NavDropdown, Form, FormControl, Button, Nav} from "react-bootstrap"
import '../assets/css/index.css'
import ExamPaper from "./ExamPaper"
import routes from "../routes"

const RouteWithSubRoutes = route => (
    <Route path={route.path} exact={route.exact} render={(props) => (
        <route.component {...props} routes={route.routes}/>
    )}/>
)

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedKey: 'panel'
        }
    }

    render() {
        const {selectedKey} = this.state
        return (
            <Router>
                <div className="container-fluid">
                    <Navbar bg="light" expand="lg">
                        <Nav
                            variant="tabs"
                            activeKey={selectedKey}
                            onSelect={selectedKey => this.setState({selectedKey})}
                        >
                            <Nav.Item>
                                <Nav.Link eventKey="panel">
                                    <Link to="/dashboard/panel" className="navItem" style={{padding: 20}}>
                                        Tạo đề thi
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="uploadstudenlist">
                                    <Link to='/dashboard/upload/student-list/upload' className="navItem"
                                          style={{padding: 20}}>
                                        Thêm danh sách sinh viên
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="add-question">
                                    <Link to="/dashboard/add-question" className="navItem" style={{padding: 20}}>
                                        Thêm câu hỏi
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="uploadquestion">
                                    <Link to='/dashboard/upload/question' className="navItem" style={{padding: 20}}>
                                        Thêm câu hỏi bằng excel
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="manager">
                                    <Link to='/dashboard/question-manager' className="navItem" style={{padding: 20}}>
                                        Quản lí câu hỏi
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="export">
                                    <Link to="/dashboard/upload/student-list/download" className="navItem"
                                          style={{padding: 20}}>
                                        Export Danh sách sinh viên
                                    </Link>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar>


                    {routes.map((route) => (
                        <RouteWithSubRoutes key={route.path} {...route}/>
                    ))}
                    <Route path="/exampaper" component={ExamPaper}/>
                </div>

            </Router>
        )
    }
}

export default (Dashboard)
