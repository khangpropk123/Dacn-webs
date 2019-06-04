import Home from "./views/Home"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import Dashboard from "./components/Dashboard"
import Panel from "./components/Panel"
import AddQuestion from "./views/AddQuestion"
import Error from './views/Error'
import QuestionsManager from "./views/QuestionsManager"
import UploadQuestion from './components/upload/UploadQuestion'
import UploadStudentList from './components/upload/UploadStudentList'
import DownLoadStudentList from './components/download/DownLoadStudentList'
import ExamPaper from "./components/ExamPaper"

const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/dashboard',
        component: Panel,
        exact: true,
    },
    {
        path: '/dashboard/panel',
        component: Panel,
    },
    {
        path: '/dashboard/add-question',
        component: AddQuestion,
    },
    {
        path: '/dashboard/question-manager',
        component: QuestionsManager,
    },
    {
        path: '/dashboard/upload/question',
        component: UploadQuestion,
    },
    {
        path: '/dashboard/upload/student-list/upload',
        component: UploadStudentList,
    },
    {
        path: '/dashboard/upload/student-list/download',
        component: DownLoadStudentList,
    },
    {
        path:'exampaper',
        component: ExamPaper,
    },
    // {
    //     path: '/:wtf',
    //     component: Error,
    //     exact:true,
    // },
]
export default routes

