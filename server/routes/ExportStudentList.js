import StudentList from '../models/StudentList'
import MarkTable from '../models/MarkTable'
import ImportMarks from './ImportMarks'

export default async function ExportStudentList(class_id){
    try {
        return await StudentList.find({
            class:class_id
        })
    } catch (error) {
        return null
    }
  
}