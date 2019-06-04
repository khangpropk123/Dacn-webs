import React, {Component} from 'react'
import {Link, BrowserRouter as Router, Redirect} from 'react-router-dom'
import axios from 'axios'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            email: '',
            isAgreeWithLicense: false,
            isError: false,
            errorMessage: '',
            registerSuccess: false
        }
    }

    _validateInput = ({username, password, email, isAgreeWithLicense}) => {
        const emailPattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        if (!username) {
            this.setState({
                isError: true,
                errorMessage: 'Vui lòng nhập tên tài khoản'
            })
            return false
        }
        if (!email) {
            this.setState({
                isError: true,
                errorMessage: 'Vui lòng nhập email'
            })
            return false
        }
        if (!emailPattern.test(email)) {
            this.setState({
                isError: true,
                errorMessage: 'Vui lòng nhập đúng địa chỉ email'
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
        if (!isAgreeWithLicense) {
            this.setState({
                isError: true,
                errorMessage: 'Vui lòng đồng ý với các điều khoản để có thể đăng kí'
            })
            return false
        }
        return true
    }
    _onRegister = event => {
        const {
            username, password,
            email, isAgreeWithLicense
        } = this.state
        if (this._validateInput(this.state)) {
            axios.post('/web-api/register',
                {
                    username,
                    password,
                    email
                },
                {
                    headers: {
                        'content-type': 'application/json'
                    }
                }
            )
                .then(res => {
                    const {ok} = res.data
                    if (ok) {
                        this.setState({registerSuccess: true})
                    }
                    console.log(res.data)
                })
                .catch(error => console.log(error))
        }

    }
    _onChangeText = event => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    _onCheckBoxChangeValue = event => {
        const {value} = event.target
        switch (value) {
            case "on":
                return this.setState({
                    isAgreeWithLicense: true
                })
            default:
                return this.setState({
                    isAgreeWithLicense: false
                })
        }
    }

    render() {
        const {isError, errorMessage, registerSuccess} = this.state
        if (registerSuccess) return <Redirect to='dashboard'/>
        return (
            <Router>
                <div className="section section-shaped section-lg">

                    <div className="container pt-lg-md">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card bg-secondary shadow border-0">

                                    <div className="card-body px-lg-5 py-lg-5">

                                        <form role="form">
                                            <div className="form-group">
                                                <div className="input-group input-group-alternative mb-3">
                                                    <input name='username' className="form-control" placeholder="Name"
                                                           type="text" onChange={this._onChangeText}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group input-group-alternative mb-3">
                                                    <input name='email' className="form-control" placeholder="Email"
                                                           type="email" onChange={this._onChangeText}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group input-group-alternative">
                                                    <input name='password' className="form-control"
                                                           placeholder="Password" type="password"
                                                           onChange={this._onChangeText}/>
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
                                            <div className="row my-4">
                                                <div className="col-12">
                                                    <div
                                                        className="custom-control custom-control-alternative custom-checkbox">
                                                        <input className="custom-control-input" id="customCheckRegister"
                                                               type="checkbox" onChange={this._onCheckBoxChangeValue}/>
                                                        <label className="custom-control-label"
                                                               for="customCheckRegister">
                                                            <span>Tôi đồng ý với
                            <a href="#"> các Điều khoản riêng tư</a>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="button" className="btn btn-primary mt-4"
                                                        onClick={this._onRegister}>Tạo tài khoản
                                                </button>
                                            </div>
                                        </form>
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

export default SignUp