import fs from 'fs'
import XLSX from 'xlsx'
import AddQuest from '../models/AddQuest'
import Subject from '../models/Subject'
import AddSubject from'../models/AddSubject'


module.exports =  function ImportQuestion(file, author) {
     function  saveSubject(name){
        let _sub = new Subject()
                         _sub.name = name
                        _sub.save()
    } 
    try {
        let workbook = XLSX.readFile(file);
        let sheet_name_list = workbook.SheetNames;
        let quests = (XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
        let subjects =[]
        quests.map( question =>  {
        subjects.push(question.SUBJECT)
        })

        let unique = [...new Set(subjects)];
        
        async function addSub(){
            unique.map(async sub=>{
                let subject =  await Subject.findOne({name: sub})
                 if(subject===null)
                 AddSubject(sub)
                 else console.log("Có rồi")
             })
        }
        addSub().then(data=>(
            quests.map(async question =>{
                let subject = ""
                subject = await Subject.findOne({name: question.SUBJECT})
                        try {
                            subject = subject._id
                        let quest = {
                            question: question.QUESTION,
                            subject: subject,
                            answers: [
                                question.ANSWER1,
                                question.ANSWER2,
                                question.ANSWER3,
                                question.ANSWER4,],
                            correct_answer: question.CORRECT_ANS,
                            level: question.LV,
                            author: author
                            }
                            console.log(quest)
                            AddQuest(quest)
                            console.log(subject)
                        } catch (error) {
                            
                        }
                            })
            
        ))

        fs.unlinkSync(file)
    } catch (e) {
        console.log(e)
    }
}