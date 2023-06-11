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
                element: <ClassesManage />
            },
            {
                path: 'manage-users',
                element: <UsersManage />
            },
            {
                path: 'addaclass',
                element: <AddAClass />
            },
            {
                path: 'update-class/:id',
                element: <UpdateClass />
            },
            {
                path: 'my-classes',
                element: <Myclasses />
            }
        ]
    }
])

export default router;