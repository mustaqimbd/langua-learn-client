import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import RegistrationForm from "../pages/RegistrationForm";
import LoginForm from "../pages/LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layout/DashboardLayout";
import ClassesManage from "../pages/dashboard/ClassesManage";
import UsersManage from "../pages/dashboard/UsersManage";



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
            }
        ]
    }
])

export default router;