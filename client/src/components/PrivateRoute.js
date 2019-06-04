import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {verifyToken} from '../api/index'


export default function withAuth(ComponentToProtect) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                isLoading: true,
                redirect: false
            }
        }

        componentDidMount() {
            verifyToken()
                .then(response => {
                    if (response.status === 200) {
                        this.setState({isLoading: false})
                    } else {
                        this.setState({isLoading: false, redirect: true})
                    }
                    console.log(response)
                    return response
                })
                .catch(e => {
                    console.log(e)
                    this.setState({isLoading: false, redirect: true})
                })
        }

        render() {
            const {isLoading, redirect} = this.state
            if (isLoading) {
                return null
            }
            if (redirect) {
                return <Redirect to='/sign-in'/>
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            )
        }
    }
}
