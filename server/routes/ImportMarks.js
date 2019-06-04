import StudentList from '../models/StudentList'

export default async function SaveMark(id,result,exam_result,mark) {
    await StudentList.updateMany({mssv:id},{$set:{mark:mark,student_answers:result,exam_answers:exam_result}}, null)
        .then((status) => {
            console.log(status)
        })
        .catch((err) => {
            console.log(err)
        })
}