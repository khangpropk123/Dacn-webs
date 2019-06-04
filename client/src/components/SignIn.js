import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom'
import SignUp from './SignUp'
import {login, verifyToken} from '../api/index'
import Cookies from 'js-cookie'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isError: false,
            errorMessage: '',
            loginSuccess: false
        }
    }

    componentDidMount() {
        verifyToken()
            .then(response => {
                if (response.status === 200) {
                    this.setState({loginSuccess: true})
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    _onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    _onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    _validateInput = ({username, password}) => {
        if (!username) {
            this.setState({
                isError: true,
                errorMessage: 'Vui lòng nhập tên tài khoản'
            })
            return false
        }
        if (!password) {
            this.setState({
                isError: true,
                errorMessage: 'Vui lòng nhập mật khẩu'
            })
            return false
        }

        return true
    }
    _onLogin = () => {
        const {username, password} = this.state
        if (this._validateInput(this.state)) {
            login({username, password})
                .then(response => {
                    console.log(response)
                    if (response.ok) {
                        // return <Redirect to='/dashboard'/>
                        this.setState({
                            loginSuccess: true
                        })
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }

    render() {
        const {isError, errorMessage, loginSuccess} = this.state
        if (loginSuccess) return <Redirect to='/dashboard'/>
        return (
            <Router>
                <div className='container-fluid'
                     style={{
                         background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                         height: '100%',
                         position: "absolute",
                         opacity: '0.8',
                     }}>
                    <div className="container pt-lg-md">
                        <div className="row col-lg-5"/>
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card bg-gradient-white shadow border-0">
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <div className="text-center text-muted mb-4">
                                            <small>Đăng nhập với tài khoản</small>
                                        </div>
                                        <form role="form">
                                            <div className="form-group mb-3">
                                                <div className="input-group input-group-alternative">
                                                    <input className="form-control" placeholder="Email" type="email"
                                                           onChange={this._onChangeUsername}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group input-group-alternative">
                                                    <input className="form-control" placeholder="Password"
                                                           type="password" onChange={this._onChangePassword}/>
                                                </div>
                                            </div>
                                            {
                                                isError &&
                                                <div className="text-muted font-italic">
                                                    <small>
                                                        {errorMessage}
                                                    </small>
                                                </div>
                                            }
                                            <div className="text-center">
                                                <button type="button" className="btn btn-primary my-4"
                                                        onClick={this._onLogin}>Đăng nhập
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-6">
                                        <a href="#" className="text-light">
                                            <small>Quên mật khẩu?</small>
                                        </a>
                                    </div>
                                    <div className="col-6 text-right">
                                        <Link to="/sign-in" className="text-light">
                                            <small>Tạo tài khoản</small>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default SignIn