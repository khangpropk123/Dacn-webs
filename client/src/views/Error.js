import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import styles from '../assets/css/error.css'

export default class Error extends Component {
    render() {
        return (
            <div>
                <div id="notfound">
                    <div class="notfound">
                        <div class="notfound-404">
                            <h1>Oops!</h1>
                            <h2>404 - Your request not allow</h2>
                        </div>
                        <Link to="/">Về trang chủ</Link>
                    </div>
                </div>
            </div>
        )
    }
}