import React, {Component} from 'react'
import {BrowserRouter as Router, Redirect} from 'react-router-dom'
import {getAllQuestion} from "../api/index"
import _ from 'lodash'


export default class QuestionsManager extends Component {

    constructor(props) {
        super(props)
        this.state = {a: null}
    }

    _renderQuestion = async () => {
        const quest = await getAllQuestion()
        if (quest) {
            if (!_.isEmpty(quest.data)) {
                return quest.data.map((item, index) => {
                    const {answers, correct_answer, level, question, subject,author} = item
                    return (
                        <tr key={index}>
                            <td> {index}</td>
                            <td>{question}</td>
                            <td>{level}</td>
                            <td>{subject}</td>
                            <td>{answers[0]}</td>
                            <td>{answers[1]}</td>
                            <td>{answers[2]}</td>
                            <td>{answers[3]}</td>
                            <td>{answers[parseInt(correct_answer)]}</td>
                            <td>{author}</td>
                        </tr>
                    )
                })
            }

        }
    }

    async componentDidMount() {
        const a = await this._renderQuestion()
        this.setState({a})
    }

    render() {
        return (
            <Router>
                <div className="card ">
                    <div className="card-header">
                        <h4 className="card-title">Quản lí câu hỏi</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table tablesorter " id="">
                                <thead className=" text-primary">
                                <tr>
                                    <th>ID</th>
                                    <th>Câu hỏi</th>
                                    <th>Độ khó</th>
                                    <th>Id môn học</th>
                                    <th>Đáp án A</th>
                                    <th>Đáp án B</th>
                                    <th>Đáp án C</th>
                                    <th>Đáp án D</th>
                                    <th>Đáp án chính xác</th>
                                    <th>Người Tạo</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.a}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Router>


        )
    }
}