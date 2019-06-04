import setupDB from '../src/database'
import Question from '../models/QuestModel'
import ImportQuestion from './ImportQuestion'
import User from '../models/User'
import Exam from '../models/Exam'
import _ from 'lodash'
import md5 from 'blueimp-md5'
import jwt from 'jsonwebtoken'
import FormData from 'form-data'
import axios from 'axios'

const fs = require('fs')
import http from 'http'
import withAuth from '../middlewares/index'
import ImportStudent from './ImportStudent'
import ExportStudentList from './ExportStudentList'
import ImportMarks from './ImportMarks'
import ExportExcelStudentList from './ExportExcelStudentList'
import StudentList from '../models/StudentList'

setupDB._connect

//Setup Upload 
import multer from 'multer'

const upload = multer({
    dest: '../uploads/' // this saves your file into a directory called "uploads"
});
//Setup XLSX module
import AddQuest from "../models/AddQuest"
import Subject from '../models/Subject'
import {generateRandomSubject} from "../utils/generateData"

//Import utils
import {getUserIdFromToken, mix} from '../utils/others'
import ExportStudentLists from './ExportStudentList';

const secret = 'mysecretsshhh'


module.exports = function (app, path) {
    app.get('/', (req, res) => {
        res.render(path + '/upload');
    });


    app.post("/api/upload/studentlists", upload.array("files", 12), (req, res) => {
        console.log(req.files[0].path);
        res.send([req.files[0].filename]);
        ImportStudent(req.files[0].path);
    })

    // app.post"/upload", Uploa
    app.post("/api/upload/question", upload.array("files", 12), async (req, res) => {

        res.send([req.files[0].filename]);
        const userId = getUserIdFromToken(req)
        let author = "None"
        await User.findOne({_id: userId}, (err, user) => {
            try {
                author = user.username
                console.log(author)
            } catch (error) {
                author = "Admin"
            }


        })
        ImportQuestion(req.files[0].path, author);
    });
    app.get('/export', async function (req, res) {
        await ExportStudentList()
    })
    app.get('/genmarks', async function (req, res) {
        ImportMarks()
    })
    app.post('/gen', async function (req, res) {
        const resp = await {
            num_of_quest: parseInt(req.body.num_of_quest),
            num_of_hard: parseInt(req.body.num_of_hard),
            num_of_normal: parseInt(req.body.num_of_normal),
            exam_title: req.body.exam_title,
            num_of_exam: parseInt(req.body.num_of_exam),
            subject: req.body.subject, // subjectId
        }
        console.log(resp.subject)
        const subject = await Subject.findById(resp.subject, (err, subject) => {
            if (subject) {
                // console.log(subject)
                return subject
            }
            // console.log(err)
        })
        let data = []
        if (parseInt(resp.num_of_quest) <= parseInt(resp.num_of_hard) + parseInt(resp.num_of_normal) || resp.exam_title === "" || parseInt(resp.num_of_exam) === 0) {
            res.status(200).json({
                ok: false,
                msg: "Vui lòng điền đầy đủ thông tin"
            })
        } else {
            await Question.find({
                    subject: resp.subject,
                    level: 1,
                },
                null,
                {
                    limit: parseInt(resp.num_of_quest - resp.num_of_hard - resp.num_of_normal),
                })
                .then(datas => {
                    // console.log(datas)
                    datas.forEach(item => {
                        data.push(item)
                    })
                })
                .catch(err => {
                    console.log("Error")
                })
            await Question.find({
                subject: resp.subject,
                level: 2,

            }, null, {
                limit: parseInt(resp.num_of_normal),
            })
                .then(datas => {
                    // console.log(datas)
                    datas.forEach(item => {
                        data.push(item)
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            await Question.find({
                subject: resp.subject,
                level: 3,
            }, null, {
                limit: parseInt(resp.num_of_hard),
            })
                .then(datas => {
                    // console.log(datas)
                    datas.forEach(item => {
                        data.push(item)
                    })
                    data = mix(data)
                    // console.log(data)
                    res.status(200).json({
                        ok: true,
                        msg: "Tạo đề thành công",
                        data: {
                            num_quest: resp.num_of_quest,
                            num_page: resp.num_of_exam,
                            title: resp.exam_title,
                            quest: data,
                        },
                    })

                })
                .catch(err => {
                    console.log(err)
                })
        }


    })


    app.get('/admin', (req, res) => {
        res.sendFile(path + "/server/public/admin/questgen.html")

    })

    app.post('/web-api/exams', (request, response) => {
        const {exams} = request.body
        const userId = getUserIdFromToken(request)
        exams.map((exam, index) => {
            console.log('Đề nè: ', exam)
            const newExam = new Exam()
            newExam.author_id = userId
            newExam.number_of_question = exam.length
            newExam.exam_code = exam[0].code
            newExam.questions = JSON.stringify(exam)
            newExam.correct_answers = exam.correct_answer
            newExam.save()

        })
        response.status(200)
    })
    app.post('/web-api/login', (req, res) => {
        const {username, password} = req.body
        const hashedPassword = md5(password)
        const user = User.findOne({username: username, password: hashedPassword}, (err, user) => {
            if (err) {
                // console.log(err)
                res.status(500).json({
                    error: 'Internal error please try again'
                })
            } else if (!user) {
                res.status(401)
                    .json({
                        error: 'Incorrect username or password'
                    })
            } else {
                const payload = {id: user._id}
                const token = jwt.sign(payload, secret, {
                    expiresIn: "2d"
                })
                res.cookie('token', token, {httpOnly: false})
                    .status(200)
                    .json({
                        ok: true,
                        token,
                        username
                    })

            }
        })
    })

    app.post('/web-api/register', (req, res) => {
        const {username, password, email} = req.body
        User.find({name: username}, (err, user) => {
            /**
             * Nếu có lỗi in lỗi và dừng
             */
            if (err) {
                console.log("Lỗi Mongo: ", err)
                return
            }
            /**s
             * Nếu tên chưa được sử dụng:
             *      Tìm xem email đã được sử dụng chưa:
             *          Nếu email chưa được sử dụng thì đăng kí thành công
             *          Nếu không thì trả về kết quả đăng kí thất bại
             */
            if (_.isEmpty(user)) {
                User.find({email: email}, (err, user) => {
                    if (!_.isEmpty(user)) {
                        res.send({
                            ok: false,
                            msg: "Địa chỉ email đã được sử dụng"
                        })
                    } else {
                        const hashedPassword = md5(password)
                        const user = new User({username, password: hashedPassword, email})
                        user.save()
                            .then(user => {
                                res.send({
                                    ok: true,
                                    msg: "Tạo tài khoản thành công"
                                })
                            })
                            .catch(e => console.log(e))
                    }
                })
            } else {
                res.send({
                    ok: false,
                    msg: "Tên tài khoản đã được sử dụng"
                })
            }
        })
    })


    app.get('/web-api/verify-token', withAuth, (req, res, next) => {
        res.sendStatus(200)
    })

    app.post('/web-api/add-question', (request, response) => {
        const {question, level, answerA, answerB, answerC, answerD, subject, correctAnswer} = request.body
        const newQuestion = new Question({
            question: question,
            subject: subject,
            level: level,
            correct_answer: parseInt(correctAnswer),
            answers: [answerA, answerB, answerC, answerD]
            //TODO: Gán ib vào correct_answer lưu vào Exam
        })
        newQuestion.save()
        response.status(200).json({
            "ok": true,
            "msg": "Thêm câu hỏi mới thành công",
            "data": newQuestion,
        })
    })
    //TODO: Test API
    app.post('/web-api/add-subject', async (request, response) => {
        console.log(request.body)
        try {
            const {name} = request.body
            // const
            return await Subject.findOne({name: name}, (err, subject) => {
                if (err) {
                    console.log(err)
                }
                console.log(subject)
                if (!_.isEmpty(subject)) {
                    return response
                        .status(200)
                        .json({
                            "ok": false,
                            "msg": "Môn này đã tồn tại",
                        })
                }
                const newSubject = new Subject({name})
                newSubject.save()
                return response
                    .status(200)
                    .json({
                        "ok": true,
                        "msg": "Thêm môn mới thành công",
                        "data": newSubject,
                    })
            })
        } catch (e) {
            console.log(e)
            return response.status(400)
        }


    })

    app.get('/web-api/get-all-subjects', (request, response) => {
        Subject.find({}, (err, subjects) => {
            let subjectMap = {}
            subjects.forEach(function (subject) {
                subjectMap[subject._id] = subject
            })
            response.send(_.sortBy(_.values(subjectMap), 'name'))
        })
    })

    app.get('/web-api/get-all-question', (req, res) => {
        Question.find({}, (err, questions) => {
            let questMap = []
            questions.forEach(function (quest) {

                questMap.push(quest)
            })
            res.send(_.sortBy(questMap, ['id']))
        })
    })


    // app.post('/web-api/app/get-grade', upload.single('image'), (request, response) => {
    //     console.log(request.file)
    //     if (!request.file) {
    //         return response.status(400)
    //     }
    //     const {file} = request
    //     const url = '192.168.0.42:8000/web-api/get-grade/'
    //
    //
    //     const form = new FormData()
    //     form.append('image', file.buffer, {
    //         uri: file.path,
    //         type: file.mimetype,
    //         name: 'test.jpg',
    //     })
    //     axios.post(url, form, {
    //         headers: {
    //             'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
    //         }
    //     })
    //         .then(response => {
    //             console.log(response)
    //             return response
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             throw new Error(error)
    //         })
    //
    //     response.status(200)
    // })


    app.post('/web-api/mark', async (request, response) => {
        let {id, result, code} = request.body

        await Exam.findOne({exam_code:code})
        .then(exam =>{
        let exam_result = []
        result = JSON.parse(result)
        let mark = 0
        const pointPerQuest = Number((10/result.length).toFixed(2))
        exam.questions.map(ex=>{
            // 
            let objs = JSON.parse(ex)
            objs.map(obj => {
                exam_result.push(obj.correct_answer)
            })
        })
        for(let i=0 ; i<result.length;i++){
            if(result[i]===exam_result[i])
                mark=mark+pointPerQuest
        }
        const AnswerMap= ["A","B","C","D"]
        let student_result =""
        let exams_result = ""
        for(let i=0;i<result.length;i++){
            student_result +=(AnswerMap[result[i]])
            exams_result+=(AnswerMap[exam_result[i]])
        }
        console.log(mark)
        console.log(student_result)
        console.log(exams_result)
            ImportMarks(id,student_result,exams_result,mark)

        })
         await ExportExcelStudentList("ATKTHT2019.NT1")
       

        /**
         * @param id  Mã số sinh viên
         * @param result Đáp án quét được chưa chấm
         * @param code Mã đề
         * */
        return response.sendStatus(200)
        // console.log(data)
    })
    app.post('/web-api/get-all-class-id',async function (req,res){
        let allClassId = await StudentList.distinct("class");
        console.log(allClassId)
        res.send(allClassId)
    })
    app.get('/web-api/downloads/:id',async function(req, res){
        let id = req.params.id
        if(!fs.existsSync(file)){
            await ExportExcelStudentList(id)
        }
        const file = `${path}/server/ExcelList/${id}.xlsx`;
       await res.download(file) // Set disposition and send it.
        
        
      });

    /**
     * Test API
     * */


    app.get('/web-api/test/generate-random-questions', async (req, res) => {
        const arrSubject = await Subject.find({}, (err, subject) => {
            if (err) {
                return []
            }
            return subject
        })
        const getRand = () => _.random(0, arrSubject.length)
        for (let i = 0; i < 100; i++) {
            await AddQuest({
                user_id: 'xxx',
                subject: arrSubject[getRand()]._id,
                question: 'Câu hỏi',
                level: 1,
                answers: ['A', 'B', 'C', 'D'],
                correct_answer: parseInt(_.random(0, 3)),
            })
        }
        res.status(200).json({
            "ok": true,
            "msg": "Tạo dữ liệu câu hỏi ngẫu nhiên thành công",
        })

    })

    app.get('/web-api/test/generate-random-subject', async (request, response) => {
        await generateRandomSubject()
        response.status(200).json({
            "ok": true
        })
    })


    // app.get('/web-api/test/get-all-user', (req, res) => {
    //     User.find({}, (err, users) => {
    //         let userMap = {}
    //         users.forEach(function (user) {
    //             userMap[user._id] = user
    //         })
    //         res.send(userMap)
    //     })
    // })
    app.get("*", function (req, res) {
        res.status(404)
    })
}