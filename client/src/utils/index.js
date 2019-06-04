import _ from "lodash"

export const shuffleAnswer = (answers, correct_id) => {
    const correctAnswer = answers[Number(correct_id)]
    const newAnswer = _.shuffle(answers)
    const indexOfCorrectAnswer = newAnswer.indexOf(correctAnswer)
    return {
        answers: newAnswer,
        correct_answer: indexOfCorrectAnswer + 1,
    }
}
export const generateExam = (num, code, questionList) => {
    let newQuestions = []
    const letterCode = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K"]

    for (let i = 1; i <= num; i++) {
        questionList = _.shuffle(questionList)
        newQuestions[i - 1] = questionList.map((question, index) => {
            const temp = shuffleAnswer(question.answers, question.correct_answer)
            return {
                ...question,
                ...temp,
                code: code + letterCode[i - 1],

            }
        })
        newQuestions[i - 1].correct_answers = getCorrectAnswer(newQuestions[i - 1])
    }
    return newQuestions
}
export const getCorrectAnswer = (questions) => {
    return questions.map((question, index) => {
        return question.correct_answer
    })
}