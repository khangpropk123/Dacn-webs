import Subject from './Subject'

export default async function AddSubject (data) {
    let sub = new Subject()
       sub.name = data
    sub.save()
        .then(doc => {
            console.log(doc)
            return "Ok"
        })
        .catch(err => {
            console.err('Error')
            return "Fail"
        })
}