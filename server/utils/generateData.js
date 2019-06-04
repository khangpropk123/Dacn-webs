import _ from "lodash"
import {addSubject} from "../models/AddQuest"

export const generateRandomSubject = async () => {
    let arrSubject = ['Cấu trúc dữ liệu và giải thuật', 'OOP', 'Tấn công Mạng', ' Nhập môn mạng', 'Quản trị mạng', 'An toàn mạng']
    // let getRand = _.random(0, arrSubject.length)
    for (let i = 0; i < 20; i++) {
        await addSubject({
            name: arrSubject[_.random(0, arrSubject.length - 1)] + i
        })
    }
}