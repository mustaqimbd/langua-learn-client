import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import RegistrationForm from "../pages/RegistrationForm";
import LoginForm from "../pages/LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layout/DashboardLayout";
import ClassesManage from "../pages/dashboard/admin/ClassesManage";
import UsersManage from "../pages/dashboard/admin/UsersManage";
import AddAClass from "../pages/dashboard/instructor/AddAClass";
import Myclasses from "../pages/dashboard/instructor/Myclasses";
import UpdateClass from "../pages/dashboard/instructor/UpdateClass";
import Instructors from "../pages/Instructors";
import Classes from "../pages/Classes";
import Admin from "./Admin";
import Instructor from "./Instructor";
import SelectedClasses from "../pages/dashboard/student/SelectedClasses";
import MakePayment from "../pages/dashboard/student/payment/MakePayment";
import Student from "./Student";
import EnrolledClasses from "../pages/dashboard/student/EnrolledClasses";
import PaymentHistory from "../pages/dashboard/student/payment/PaymentHistory";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'instructors',
                element: <Instructors />
            },
            {
                path: 'classes',
                element: <Classes />
            },
            {
                path: 'login',
                element: <LoginForm />
            },
            {
                path: 'registration',
                element: <RegistrationForm />
            }
        ]
    },
    {
        path: 'dashboard',
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            {
                path: 'manage-classes',
                element: <Admin><ClassesManage /></Admin>
            },
            {
                path: 'manage-users',
                element: <Admin><UsersManage /></Admin>
            },
            //instructor routes
            {
                path: 'my-classes',
                element: <Instructor><Myclasses /></Instructor>
            },
            {
                path: 'add-a-class',
                element: <Instructor><AddAClass /></Instructor>
            },
            {
                path: 'update-class/:id',
                element: <Instructor><UpdateClass /></Instructor>
            },
            //students routes
            {
                path: 'selected-classes',
                element: <Student><SelectedClasses /></Student>
            },
            {
                path: 'Enrolled/classes',
                element: <Student><EnrolledClasses /></Student>
            },
            {
                path: 'payment',
                element: <Student><MakePayment /></Student>
            },
            {
                path: 'payment/history',
                element: <Student><PaymentHistory /></Student>
            }
        ]
    }
])

export default router;