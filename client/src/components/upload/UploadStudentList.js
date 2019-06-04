import React, {Component} from "react";
import 'filepond/dist/filepond.min.css';
import {Button} from "react-bootstrap";
import { FilePond,registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
registerPlugin(FilePondPluginImagePreview);

const initialState = {
    /* etc */
};
class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        
    }


    render() {
        return (

            <div className="container " style={{height:'80%',width:'80%', alignContent:'center'}}>
                <FilePond
                        // Set the callback here.
                        allowMultiple = "false"
                        maxFiles={1}
                        name="files"
                        server="http://localhost:8888/api/upload/studentlists"
                    />
            </div>
        )
    }
}

export default Upload;