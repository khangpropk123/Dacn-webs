import React, {Component} from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import './print.css'
import '../css/Bootstrap.css'
import _ from 'lodash'
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs'
import "react-tabs/style/react-tabs.css"
import QRcode from 'qrcode.react'

import {addExam, getAllSubject} from "../api"
import {generateExam} from "../utils/index"


export default class ExamPaper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quest: [],
            num_pages: 0,
            examcode: '821',
            datas: [],
            exam_code: 0,
            exam_title: 'Default',
            selectedKey: 'panel',
            time: 0,
        }

    }

    componentDidMount() {

        const data = JSON.parse(localStorage.getItem('data'))
        const {exam_code, exam_title, time, subject} = JSON.parse(localStorage.getItem('exam_info'))
        const {num_page, quest} = data
        let num = num_page
        const newData = generateExam(num, exam_code, quest)
        console.log(newData)
        this.setState({
            ...data,
            num_pages: num_page,
            datas: newData,
            exam_code,
            exam_title: exam_title.toUpperCase(),
            time,
            subject,
        }, () => {
            addExam({exams: newData})
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        })
    }




    _renderQuestions = (questions) => {
        return questions.map((question, number) => {
            return (
                <div className="container"
                     style={{textAlign: 'left', fontFamily: 'Times New Roman, Times, serif', fontSize: '18pt'}}>
                    <div className="row" style={{paddingTop: '20px', paddingBottom: '5px', marginLeft: '3%'}}>
                        <b>Câu {number + 1}:</b> {question.question}
                    </div>
                    <div className="row justify-content-center" style={{marginLeft: '5%', fontSize: '14pt'}}>
                        <div className="col-md-6 col-sm-6">

                            <p style={{marginBottom: '0.5px'}}><b>A: </b>{question.answers[0]}</p>
                            <p style={{marginBottom: '0.5px'}}><b>C: </b>{question.answers[2]}</p>
                        </div>
                        <div className="col-md-6 col-sm-6" style={{marginRight: '0%'}}>
                            <p style={{marginBottom: '0.5px'}}><b>B: </b>{question.answers[1]}</p>
                            <p style={{marginBottom: '0.5px'}}><b>D: </b>{question.answers[3]}</p>
                        </div>
                    </div>
                </div>

            )
        })
    }

    _renderExams = questArray => {
        return questArray.map((item, index) => {
            return (
                <TabPanel>
                    {this._renderExamHeader(this.state, item[0].code)}
                    <div style={{paddingTop: '2%'}}>
                        <h1>Đề {index + 1}</h1>
                        {this._renderQuestions(item)}
                        <div
                            className="row justify-content-center"
                            style={{paddingTop: '4%', paddingBottom: '5%', fontSize: '14pt'}}
                        >
                            <b> Giám thị coi thi không giải thích gì thêm.</b>
                        </div>
                        {index < questArray.length - 1 && <div className="pagebreak"/>}
                    </div>
                </TabPanel>
            )
        })
    }

    _renderTabBarItem = () => {
        const {num_pages} = this.state
        const tabBarItems = []
        for (let i = 1; i <= num_pages; i++) {
            tabBarItems.push(
                <Tab>Đề {i}</Tab>
            )
        }
        return <TabList className='d-print-none'>{tabBarItems}</TabList>
    }
    _renderExamHeader = ({exam_title, exam_code, time, subject}, code) => {
        return (
            <page id="page" size="A4">
                <div
                    className="container-fluid justify-content-center p-3 mb-2 bg-white text-dark"
                    style={{fontFamily: 'Times New Roman, Times, serif', fontSize: '18pt'}}
                >
                    <div className="row d-flex justify-content-center ">
                        <div className="col-md-8"
                             style={{paddingTop: '4%', fontSize: '28pt', textAlign: 'center'}}
                        >
                            <b> TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN</b>
                            <div>
                                <b> Khoa Mạng Máy Tính Và Truyền Thông</b>
                            </div>
                        </div>
                        <div
                            className="col-md-4 justify-content-center"
                            style={{paddingTop: '4%', fontSize: '28pt', textAlign: "center"}}
                        >
                            <div><b>{exam_title}</b></div>
                            <div><b>{subject.name}</b></div>
                            <div><b>Năm Học: 2018 - 2019</b></div>
                            <div><b>Thời Gian: {time} Phút</b></div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center "
                         style={{marginTop: '5%', fontSize: '18pt'}}>
                        <div className="col-3">
                            <div className="container-fluid border border-dark">
                                <div> Giám Thị 1</div>
                                <div> Họ và tên: .............................</div>
                                <div> Chữ ký:.................</div>
                            </div>
                            <div className="container-fluid border border-dark"
                                 style={{marginTop: '10px'}}>
                                <div> Giám Thị 2</div>
                                <div> Họ và tên: .............................</div>
                                <div> Chữ ký:.................</div>
                            </div>
                            <div className="container-fluid border border-dark"
                                 style={{marginTop: '10px'}}>
                                <div> Giám Thị 3</div>
                                <div> Họ và tên: ...............................</div>
                                <div> Chữ ký:.................</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="container-fluid border border-dark"
                                 style={{marginLeft: '0%'}}>
                                <div>1. Tên trường:..................................................
                                </div>
                                <div>...................................................................</div>
                                <div>Ký hiệu trường (bằng chữ)................................
                                </div>
                                <div>2. Điểm thi:.....................................................
                                </div>
                                <div>3. Phòng thi:....................................................
                                </div>
                                <div>4. Họ và tên thí sinh:.................................
                                </div>
                                <div>.................................................................</div>
                                <div>5. Ngày sinh:................................................</div>
                                <div>6. Chữ ký của thí sinh:.................................</div>
                                <div>7. Môn thi:....................................................
                                </div>
                                <div>8. Ngày thi: ..................................................
                                </div>
                            </div>
                        </div>
                        <div className="col justify-content-center" style={{marginLeft: '0%'}}>
                            <div className="row justify-content-center">
                                <div className="container-fluid justify-content-center ">
                                    <div>8. Số Báo Danh</div>
                                    <div className="col border border-dark "
                                         style={{height: '30px', width: '200px'}}/>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="container-fluid justify-content-center ">
                                    <div>9. Số Thứ Tự</div>
                                    <div className="col border border-dark "
                                         style={{height: '30px', width: '200px'}}/>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="container-fluid justify-content-center ">
                                    <div>10. Mã Đề Thi</div>
                                    <div className="col border border-dark justify-content-center  "
                                         style={{textAlign: 'center', height: '30px', width: '120px'}}>
                                        <b id="examcode">{code}</b>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{marginLeft: '15%', marginTop: '0%'}}>
                            <div><b>Thí sinh lưu ý: </b> - Giữ cho phiếu phẳng, không bôi bẩn, làm rách.
                            </div>
                            <div style={{marginLeft: '16%'}}> - Phải ghi đầy đủ các mục theo hướng dẫn.
                            </div>
                            <div style={{marginLeft: '16%'}}> - Nhớ ghi đầy đủ và chính xác trong mục:
                            </div>
                            <div style={{marginLeft: '20%'}}><b>Số báo danh </b>, <b>Mã đề thi</b> trước
                                khi làm bài.
                            </div>
                            <div><b>Phần trả lời: </b> Số thứ tự câu trả lời dưới đây ứng với số thứ tự
                                câu trắc nghiệm trong đề thi.
                            </div>
                            <div style={{marginLeft: '9%'}}> Đối với mỗi câu trắc nghiệm, thí sinh viết to
                                và rõ tương ứng với
                                phương án trả lời đúng.
                            </div>
                        </div>
                    </div>
                    <div className="pagebreak"/>
                    <QRcode value={code}/>
                    <img className="container" style={{marginTop: '0%', marginLeft: '2%'}}
                         src="./assets/img/SheetAns2_3.jpg"/>

                    <div className="pagebreak"/>


                </div>

            </page>

        )
    }

    render() {
        return (
            <Router>
                {/*<body style={{alignContent: 'center'}}>*/}
                {/*<div className="page-header" style={{textAlign: 'center', paddingTop: '10pt'}}>*/}
                {/*    <button type="button" className="btn btn-primary d-print-none" onClick={window.print}>Print!*/}
                {/*    </button>*/}
                {/*    <br/>*/}
                {/*</div>*/}
                {/*<div className="page-footer">*/}
                {/*    <p style={{textAlign: 'right'}}><b id="footercode">{exam_code}</b></p>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <table>*/}
                {/*        {this._renderExams(this.state.datas)}*/}
                {/*    </table>*/}

                {/*</div>*/}
                {/*</body>*/}
                <Tabs>
                    {this._renderTabBarItem()}
                    {this._renderExams(this.state.datas)}
                </Tabs>
            </Router>

        )
    }
}


