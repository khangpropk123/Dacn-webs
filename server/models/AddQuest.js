import QuestModel from './QuestModel'
import Subject from './Subject'

export default  function (data) {
    let question = new QuestModel()
    question.question = data.question
    question.author = data.author
    question.subject = data.subject
    question.level = data.level
    question.answers = data.answers
    question.correct_answer = data.correct_answer
    question.save()
        .then(doc => {
            console.log(doc.subject)
            return "Ok"
        })
        .catch(err => {
            return "Fail"
        })
}

export const addSubject = data => {
    const subject = new Subject()
    subject.name = data.name
    return subject.save()
        .then(doc => {
            console.log(doc)
            return "Ok"
        })
        .catch(err => {
            console.err('Error')
            return "Fail"
        })
}
