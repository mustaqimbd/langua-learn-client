import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import RegistrationForm from "../pages/RegistrationForm";
import LoginForm from "../pages/LoginForm";
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
    }
])

export default router;