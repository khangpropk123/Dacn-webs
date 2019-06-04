import fs from 'fs'
import XLSX from 'xlsx'
import AddStudentList from '../models/AddStudentList'

export default async function  importStudent(file) {
    let workbook =  XLSX.readFile(file);
    var sheet_name_list = workbook.SheetNames;
    let studentList = (XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
       
        studentList.map(student =>{
            let data = {
                name: student.NAME,
                mssv: student.MSSV,
                class: student.CLASS,
                mark:0,
                student_answers: "",
                exam_answers: "",
            }
          AddStudentList(data)
          console.log(data)
            
        })
    fs.unlinkSync(file)
}