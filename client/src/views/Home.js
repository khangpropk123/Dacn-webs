import React, {Component} from 'react'
import {BrowserRouter as Router, Redirect} from 'react-router-dom'
import {verifyToken} from '../api/index'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginSuccess: false
        }
    }


    componentDidMount() {
        verifyToken()
            .then(response => {
                if (response.status === 200) {
                    console.log(response)
                    this.setState({loginSuccess: true})
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    render() {
        const {loginSuccess} = this.state
        if (loginSuccess) {
            return <Redirect to='/dashboard'/>
        }
        return (
            <Router>
                <div className="container-fluid bg-gradient-blue" style={{
                    background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                    height: '100%',
                    position: "absolute",
                    opacity: '0.8',
                }}>

                    <div style={{height:'100px'}} className=""/>
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="display-4 text-white text-center">Hệ thống quản lí đề và đánh giá năng lực
                                học sinh</h1>
                            <div className="btn-wrapper align-content-lg-center text-center">
                                <a href="/sign-up" className="btn btn-info btn-icon mb-3 mb-sm-0 mr-4">
                                    <span className="btn-inner--text">Đăng kí</span>
                                </a>
                                <a href="/sign-in" className="btn btn-icon mb-3 mb-sm-0 btn-secondary ">
                                    <span className="btn-inner--text">Đăng nhập</span>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </Router>

        )
    }
}

