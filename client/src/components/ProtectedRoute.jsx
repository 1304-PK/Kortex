import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import { PacmanLoader } from "react-spinners"

const ProtectedRoute = ({children}) => {
    const {session, loading} = useAuth()

    if (loading){
        return <PacmanLoader />
    }
    if (!session){
        return <Navigate to={"/auth/login"} replace />
    }
  return (
    children
  )
}

export default ProtectedRoute