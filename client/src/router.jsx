import {createBrowserRouter} from "react-router-dom"
import PublicRoute from "./components/PublicRoute"
import ProtectedRoute from "./components/ProtectedRoute"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import GeneratePath from "./pages/GeneratePath"

const router = createBrowserRouter([
    {
        path: "/auth/signup",
        element: (
            <PublicRoute>
                <Signup />
            </PublicRoute>
        )
    },
    {
        path: "/auth/login",
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        )
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <GeneratePath />
            </ProtectedRoute>
        )
    }
])

export default router