import React, {Component} from 'react'
import TextInput from './TextInput'
import {addNewSubject, generateExam, getAllSubject} from '../api/index'
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import ExamPaper from '../components/ExamPaper'
import {Modal, Button, FormLabel, InputGroup} from "react-bootstrap"
import FormControl from "react-bootstrap/es/FormControl"

class Panel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            num_of_exam: 0,
            num_of_hard: 0,
            num_of_normal: 0,
            num_of_quest: 0,
            num_of_easy: 0,
            time: 0,
            exam_code: '000',
            notes: '',
            exam_title: '',
            subject: 'Math',
            subject_name:"English",
            isError: false,
            errorMessage: '',
            content: '<p></p>',
            getSuccess: false,
            subjectData: [],
            newSubjectName: '',
        }
    }

    componentDidMount() {
        try {
            getAllSubject()
                .then(res => {
                    console.log(res)
                    this.setState({subjectData: res.data}, () => {
                        this.setState({
                            subject: this.state.subjectData[0],
                        })
                    })
                })
                .catch(e => {
                    console.log(e)
                })
        } catch (e) {
            console.log(e)
        }
    }

    _validate = () => {
        const {
            num_of_exam, num_of_hard,
            num_of_normal, num_of_quest,
            notes, exam_title, subject
        } = this.state
        if (!num_of_quest) {
            this.setState({
                isError: true,
                errorMessage: 'Vui lòng nhập số lượng tổng câu hỏi'
            })
            return false
        }
        if (!num_of_hard) {
            this.setState({
                isError: true,
                errorMessage: 'Vui lòng nhập số lượng câu hỏi khó'
            })
            return false
        }
        if (!num_of_normal) {
            this.setState({
                isError: true,
                errorMessage: 'Vui lòng nhập số lượng câu hỏi thường'
            })
            return false
        }
        if (!num_of_exam) {
            this.setState({
                isError: true,
                errorMessage: 'Vui lòng nhập số lượng đề'
            })
            return false
        }
        if (!exam_title) {
            this.setState({
                isError: true,
                errorMessage: 'Vui lòng nhập tựa đề'
            })
            return false
        }
        if (!subject) {
            this.setState({
                isError: true,
                errorMessage: 'Vui lòng chọn môn học'
            })
            return false
        }
        return true
    }
    _onChangeInput = (name, value) => {
        this.setState({
            [name]: value,
        }, () => {
            const {num_of_hard, num_of_normal, num_of_quest} = this.state
            this._onChangeEasyQuestionInput(parseInt(num_of_quest) - parseInt(num_of_hard) - parseInt(num_of_normal))
        })
    }

    _onChangeEasyQuestionInput = (value) => {
        const {num_of_normal, num_of_quest, num_of_hard} = this.state
        if (num_of_normal && num_of_hard && num_of_quest) {
            this.setState({
                num_of_easy: value
            })
        }
    }
    _generateExam = async () => {
        if (this._validate()) {
            console.log(this.state.subject)
            try {
                const data = await generateExam({
                    ...this.state,
                    subject: this.state.subject,
                    subjectData: [],
                })
                if (data) {
                    if (data.ok) {
                        localStorage.setItem('data', JSON.stringify(data.data))
                        localStorage.setItem('num_page', this.state.num_of_exam)
                        localStorage.setItem('exam_info', JSON.stringify(this.state))
                        this.setState({
                            getSuccess: true
                        })
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    _onSelectSubject = event => {
        console.log(event.target.value)
        this.setState({
            subject: event.target.value,
           
        })
        
    }
    
    _renderSubjectOption = data => {
        return data.map((item, index) => {
                return <option key={index} value={item._id} selected={this.state.subject === item._id}>{item.name}</option>
            }
        )
    }
    _toggleModal = () => {
        this.setState({
            visibleModal: !this.state.visibleModal
        })
    }
    _addSubject = () => {
        addNewSubject(this.state.newSubjectName)
            .then(response => {
                const {ok, data, msg} = response.data
                console.log(data)
                if (ok) {
                    let {subjectData} = this.state
                    subjectData.push(data)
                    this.setState({
                        subjectData,
                        subject: data._id,
                    })
                }
            })
        this._toggleModal()
    }

    render() {
        const {isError, errorMessage, getSuccess, subjectData} = this.state
        if (getSuccess) {
            return <Redirect to="/exampaper"/>
        }
        return (
            <div>
                <div className="container">
                    {/*Modal*/}
                    <Modal show={this.state.visibleModal} onHide={this._toggleModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thêm môn học mới</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormLabel>Tên môn học</FormLabel>
                            <InputGroup>
                                <FormControl
                                    placeholder='Nhập tên môn học'
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={event => this.setState({newSubjectName: event.target.value})}
                                />
                            </InputGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this._toggleModal}>
                                Huỷ thêm môn
                            </Button>
                            <Button variant="primary" onClick={this._addSubject}>
                                Thêm môn mới
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="wrapper">
                        <div className="main-panel">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="title">Tạo đề thi</h5>
                                        </div>
                                        <div className="card-body">
                                            <form>
                                                <div className="row">
                                                    <TextInput
                                                        containerStyle={"col-md-3 pr-md-1"}
                                                        label={"Tổng số câu hỏi"}
                                                        type="number"
                                                        name="num_of_quest"
                                                        placeholder="Số câu hỏi"
                                                        onChange={this._onChangeInput}
                                                    />
                                                    <TextInput
                                                        containerStyle={"col-md-3 px-md-1"}
                                                        label={"Số câu hỏi khó"}
                                                        type="number"
                                                        name="num_of_hard"
                                                        placeholder="Nhập số câu hỏi khó"
                                                        onChange={this._onChangeInput}
                                                    />
                                                    <TextInput
                                                        containerStyle={"col-md-3 pl-md-1"}
                                                        label={"Số câu hỏi thường"}
                                                        type="number"
                                                        name="num_of_normal"
                                                        placeholder="Nhập số câu hỏi thường"
                                                        onChange={this._onChangeInput}
                                                    />
                                                    <TextInput
                                                        value={this.state.num_of_easy}
                                                        containerStyle={"col-md-3 pl-md-1"}
                                                        label={"Số câu hỏi dễ"}
                                                        type="number"
                                                        name="num_of_easy"
                                                        placeholder="Nhập số câu hỏi dễ"
                                                        onChange={this._onChangeInput}
                                                    />
                                                </div>

                                                <div className="row">
                                                    <TextInput
                                                        containerStyle={"col-md-8"}
                                                        label={"Tựa đề bài thi"}
                                                        type="text"
                                                        name="exam_title"
                                                        placeholder="Nhập tựa đề thi"
                                                        onChange={this._onChangeInput}
                                                    />
                                                    <TextInput
                                                        containerStyle={"col-md-4"}
                                                        label={"Mã đề"}
                                                        type="text"
                                                        name="exam_code"
                                                        placeholder="Nhập mã đề"
                                                        maxLength={4}
                                                        onChange={this._onChangeInput}
                                                    />
                                                </div>
                                                <div className="row">
                                                    <TextInput
                                                        containerStyle={"col-md-4 pr-md-1"}
                                                        label={"Số đề thi"}
                                                        type="number"
                                                        name="num_of_exam"
                                                        placeholder="Nhập số đề thi cần tạo"
                                                        onChange={this._onChangeInput}
                                                        max={8}
                                                    />
                                                    <div className="col-md-4 px-md-1">
                                                        <label>Môn học</label>
                                                        <div className='row'>
                                                            <div className="form-group col-8">
                                                                <select
                                                                    className="form-control"
                                                                    name="subject"
                                                                    onChange={this._onSelectSubject}
                                                                    defaultValue={this.state.subject}
                                                                    // size={8}

                                                                >
                                                                    {this._renderSubjectOption(subjectData)}
                                                                </select>
                                                            </div>
                                                            <div className='col-4'>
                                                                <button type="button" className="btn btn-primary"
                                                                        onClick={this._toggleModal}>
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <TextInput
                                                        containerStyle={"col-md-4 pr-md-1"}
                                                        label={"Thời gian làm bài:"}
                                                        type="number"
                                                        name="time"
                                                        placeholder="Nhập thời gian làm bài"
                                                        onChange={this._onChangeInput}
                                                    />

                                                </div>
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <div className="form-group">
                                                            <label>Ghi chú</label>
                                                            <textarea
                                                                rows="4" cols="100" className="form-control"
                                                                placeholder="Ghi chú (nếu có)"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    isError &&
                                                    <div class="alert alert-danger col-md-4" role="alert">
                                                        {errorMessage}
                                                    </div>
                                                }
                                            </form>
                                        </div>
                                        <div className="card-footer">
                                            <button type="submit" onClick={this._generateExam}
                                                    className="btn btn-fill btn-primary">Tạo đề thi
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Route path="/exampaper" component={ExamPaper}/>
            </div>
        )
    }
}

export default Panel
