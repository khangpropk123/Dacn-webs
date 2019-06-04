import axios from 'axios'

const DOMAIN = 'http://192.168.0.25:8888'
export const generateExam = (payload) => {
    return axios.post(`/gen`,
        {
            ...payload
        },
        {
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            return res.data
        })
        .catch(error => {
            throw new Error(error)
        })
}

export const verifyToken = () => {
    return axios.get('/web-api/verify-token',
        {
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        })
}

export const login = ({username, password}) => {
    return axios.post('/web-api/login', {
        username,
        password
    }, {
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => {
            const {ok} = res.data
            if (ok) {
                return res.data
            }
            return false
        })
        .catch(error => error)
}


export const getAllQuestion = () => {
    return axios.get('/web-api/get-all-question')
        .then(res => res)
        .catch(error => error)
}
export const getAllClassId = () => {
    return axios.post('/web-api/get-all-class-id')
        .then(res => res)
        .catch(error =>error)
}

export const addNewSubject = subject => {
    return axios.post('/web-api/add-subject', {name: subject}, {
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response)
        .catch(error => error)
}
export const getAllSubject = () => {
    return axios.get(`/web-api/get-all-subjects`)
        .then(res => res)
        .catch(error => {
            throw  new Error(error)
        })
}

export const addQuestion = (payload) => {
    return axios.post('/web-api/add-question', {...payload}, {
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(res => res)
        .catch(error => error)
}
export const addExam = (payload) => {
    return axios.post('/web-api/exams', payload, {
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(res => res)
        .catch(error => error)
}