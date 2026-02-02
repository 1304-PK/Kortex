import {createBrowserRouter} from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import GeneratePath from "./pages/GeneratePath"

const router = createBrowserRouter([
    {
        path: "/auth/signup",
        element: <Signup />
    },
    {
        path: "/auth/login",
        element: <Login />
    },
    {
        path: "/",
        element: <GeneratePath />
    }
])

export default router