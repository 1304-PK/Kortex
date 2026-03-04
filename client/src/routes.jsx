import {createBrowserRouter} from "react-router-dom"
import CourseGenerator from "./pages/CourseGenerator"

const router = createBrowserRouter([
    {
        path: "/",
        element: <CourseGenerator />
    }
])

export default router