import React, {Component} from "react";
import 'filepond/dist/filepond.min.css';
import {Button} from "react-bootstrap";
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import Cookies from 'js-cookie'

registerPlugin(FilePondPluginImagePreview);

const initialState = {
    /* etc */
};

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {};


    }



    render() {
        const token = Cookies.get('token')
        return (

            <div className="container " style={{height: '80%', width: '80%', alignContent: 'center'}}>
                <FilePond

                    allowMultiple="false"
                    maxFiles={1}
                    name="files"
                    server={{
                        url: 'http://localhost:8888/',
                        process: {
                            url: 'api/upload/question',
                            method: 'POST',
                            withCredentials: false,
                            headers: {'x-access-token': token},
                            timeout: 7000,
                            onload: null,
                            onerror: null,
                            ondata: null
                        }
                    }}
                />
            </div>
        )
    }
}

export default Upload;