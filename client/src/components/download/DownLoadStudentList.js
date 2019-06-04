import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {getAllClassId} from "../../api/index"
import FormControl from "react-bootstrap/es/FormControl"
const initialState = {
    /* etc */
};
class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classIds:[],
            classid:""
        };

        
    }

async componentDidMount() {
        const a = await getAllClassId()
        console.log(a.data)
        this.setState({
            classIds:a.data,
        classid:a.data[0]})
    }
 _onSelectClassId = event => {
        console.log(event.target.value)
        this.setState({
            classid: event.target.value,
           
        })
        if(event.target.value !== "none")
        this.downloadFile(event.target.value)
        
    }
    
    _renderSubjectOption = data => {
        return data.map((item, index) => {
                return <option key={index} value={item}>{item}</option>
            }
        )
    }

downloadFile(data){
    console.log(data)
    window.location.href= "http://localhost:8888/web-api/downloads/"+data;
}
    render() {
        return (

            <div className="container " style={{position: 'relative',height:'80%',width:'80%', alignContent:'center',textAlign:'center',alignItems:'center !importan'}}>
                <div className="col-md-4 px-md-1">
                                                        <label>Chọn Mã Lớp</label>
                                                        <div className='row'>
                                                            <div className="form-group col-8">
                                                                <select
                                                                    className="form-control"
                                                                    name="subject"
                                                                    onChange={this._onSelectClassId}
                                                                    defaultValue={"none"}
                                                                    // size={8}
                                                                >
                                                                    <option value="none" selected>Chọn Mã Lớp</option>
                                                                    {this._renderSubjectOption(this.state.classIds)}
                                                                </select>
                                                            </div>
                                                            </div>
                                                        </div>
            </div>
        )
    }
}

export default Upload;