var json2xls = require('json2xls');
import fs from 'fs'
import ExportStudentList from './ExportStudentList'
export default async function ExportExcelStudentList(class_id){
    let data = await ExportStudentList(class_id)
    let sheet = []
    data.map(d=>{
        let temData = {
            'Mã số sinh Viên':d.mssv,
            'Họ Tên': d.name,
            'Mã Lớp': d.class,
            'Điểm': d.mark,
            'Câu Trả Lời': d.student_answers,
            'Đáp Án': d.exam_answers
        }
        sheet.push(temData)
    })
    console.log(sheet)
    var xls = json2xls(sheet);

fs.writeFileSync('./server/ExcelList/'+class_id+'.xlsx', xls, 'binary');
    console.log("ok")
}