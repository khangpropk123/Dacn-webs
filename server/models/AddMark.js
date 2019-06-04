import MarkTable from './MarkTable'

export default async function AddStudentList (data) {
    let mark = new MarkTable()
        mark.mssv = data.mssv,
        mark.class = data.class,
        mark.mark = data.mark,
    mark.save()
        .then(doc => {
            console.log(doc)
            return "Ok"
        })
        .catch(err => {
            console.err('Error')
            return "Fail"
        })
}