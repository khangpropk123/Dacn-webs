import React, {Component} from 'react'
import {BrowserRouter as Router, Redirect} from 'react-router-dom'
import {
    Form,
    FormLabel,
    FormControl,
    InputGroup,
    Button,
    Row,
    Col,
    Modal,
} from "react-bootstrap";
import TextInput from "../components/TextInput"
import {addNewSubject, addQuestion, getAllSubject} from "../api"
import {toast} from "react-toastify"

export default class AddQuestion extends Component {

    constructor(props) {
        super(props)

        this.state = {
            level: 1,
            answerA: '',
            answerB: '',
            answerC: '',
            answerD: '',
            question: '',
            subject: '',
            correctAnswer: 1,
            subjectData: [],
            visibleModal: false,
            newSubjectName: '',
        }
    }

    componentDidMount() {
        getAllSubject().then(res => {
            this.setState({subjectData: res.data})
        })
    }

    _addQuestion = () => {
        addQuestion({
            ...this.state,
            subjectData: []
        })
            .then(response => {
                const {ok, msg, data} = response.data
                if (ok) {
                    toast(msg, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                    this.setState({
                        level: 1,
                        answerA: '',
                        answerB: '',
                        answerC: '',
                        answerD: '',
                        question: '',
                        subject: '',
                        correctAnswer: 1,
                    })
                } else {
                    toast('Thêm câu hỏi thất bại, vui lòng thử lại', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                }
            })
    }
    _onChangeLevel = (event) => {
        const level = event.target.value
        console.log(level)
        this.setState({
            level
        })
    }
    _onChangeInput = (name, value) => {
        this.setState({
            [name]: value,
        })
    }
    _onChangeCorrectAnswer = event => {
        const correctAnswer = event.target.value
        this.setState({
            correctAnswer
        })
    }
    _onChangeSubject = event => {
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
                    toast(msg)
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
        const {
            subjectData, subject, correctAnswer,
            answerA, answerB, answerC, answerD, question,
            level,
        } = this.state
        return (
            <Router>
                <div className="card ">
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
                    <div className="card-header">
                        <h4 className="card-title">Thêm câu hỏi</h4>
                    </div>
                    <div className="card-body">
                        <Form>
                            <div className="col-md-4 px-md-1">

                                <label>Môn học</label>
                                <div className="row">
                                    <div className="form-group col-8">
                                        <select
                                            value={subject}
                                            className="form-control" name="subject"
                                            onChange={this._onChangeSubject}
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
                            <div className='row'>
                                <TextInput
                                    containerStyle={"col-md-10 pr-md-1"}
                                    label={'Câu hỏi'}
                                    type="text"
                                    name="question"
                                    placeholder="Nhập câu hỏi"
                                    onChange={this._onChangeInput}
                                    value={question}
                                />
                                <div className="col-md-2 px-md-1">
                                    <div className="form-group">
                                        <label>Độ khó</label>
                                        <select
                                            value={level}
                                            className="form-control" name="subject"
                                            onChange={this._onChangeLevel}
                                        >
                                            <option value={1}>Dễ</option>
                                            <option value={2}>Vừa</option>
                                            <option value={3}>Khó</option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <TextInput
                                containerStyle={"col-md-12 pr-md-1"}
                                label={'Đáp án A'}
                                type="text"
                                name="answerA"
                                placeholder="Nhập đáp án A"
                                onChange={this._onChangeInput}
                                value={answerA}
                            />
                            <TextInput
                                containerStyle={"col-md-12 pr-md-1"}
                                label={'Đáp án B'}
                                type="text"
                                name="answerB"
                                placeholder="Nhập đáp án B"
                                onChange={this._onChangeInput}
                                value={answerB}
                            />
                            <TextInput
                                containerStyle={"col-md-12 pr-md-1"}
                                label={'Đáp án C'}
                                type="text"
                                name="answerC"
                                placeholder="Nhập đáp án C"
                                onChange={this._onChangeInput}
                                value={answerC}
                            />
                            <TextInput
                                containerStyle={"col-md-12 pr-md-1"}
                                label={'Đáp án D'}
                                type="text"
                                name="answerD"
                                placeholder="Nhập đáp án D"
                                onChange={this._onChangeInput}
                                value={answerD}
                            />

                            <div className="col-md-4 px-md-1">
                                <div className="form-group">
                                    <label>Đáp án chính xác</label>
                                    <select
                                        value={correctAnswer}
                                        className="form-control" name="subject"
                                        onChange={this._onChangeCorrectAnswer}
                                    >
                                        <option value={1}>A</option>
                                        <option value={2}>B</option>
                                        <option value={3}>C</option>
                                        <option value={4}>D</option>
                                    </select>
                                </div>
                            </div>
                            <Row className="justify-content-md-center">
                                <Col xs lg="2"/>
                                <Col md="auto">
                                    <Button onClick={this._addQuestion}>Lưu</Button>
                                </Col>
                                <Col xs lg="2"/>
                            </Row>

                        </Form>
                    </div>
                </div>
            </Router>


        )
    }
}