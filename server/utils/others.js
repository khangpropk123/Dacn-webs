import jwt from "jsonwebtoken"
import _ from 'lodash'

export const swap = (rand, data) => {
    for (let i = 0; i < rand[0]; i++) {
        let tem
        tem = data[i]
        data[i] = data[rand[0] - i]
        data[rand[0] - i] = tem
    }
    for (let i = rand[0]; i < rand[1]; i++) {
        let tem
        tem = data[i]
        data[i] = data[rand[1] - i]
        data[rand[1] - i] = tem
    }
    for (let i = rand[1]; i < rand[2]; i++) {
        let tem
        tem = data[i]
        data[i] = data[rand[2] - i]
        data[rand[2] - i] = tem
    }
    return data
}

export const sortNumberAsc = (a, b) => {
    return a - b
}

export const mix = (data) => {
    let l = data.length
    let r0 = Math.floor(Math.random() * l)
    let r1 = Math.floor(Math.random() * l)
    let r2 = Math.floor(Math.random() * l)
    let rand = [r0, r1, r2]
    rand.sort(sortNumberAsc)

    return swap(rand, data)
}
export const getUserIdFromToken = (request) => {
    const token =
        request.body.token ||
        request.query.token ||
        request.headers['x-access-token'] ||
        request.cookies.token
    if (!token) {
        return false
    } else {
        const decoded = jwt.decode(token)
        if (decoded) {
            return decoded.id
        }
        return false
    }

}


