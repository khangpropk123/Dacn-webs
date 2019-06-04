import StudentList from './StudentList'

export default async function AddStudentList (data) {
    let studentlist = new StudentList()
        studentlist.name = data.name,
        studentlist.mssv = data.mssv,
        studentlist.class = data.class,
        studentlist.mark = 0,
        studentlist.student_answers = "",
        studentlist.exam_answers = "",
    studentlist.save()
        .then(doc => {
            console.log(doc)
            return "Ok"
        })
        .catch(err => {
            console.err('Error')
            return "Fail"
        })
}