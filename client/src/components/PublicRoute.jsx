import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import { PacmanLoader } from "react-spinners"

const PublicRoute = ({children}) => {
    const {session, loading} = useAuth()

    if (loading){
        return <PacmanLoader />
    }
    if (session){
        return <Navigate to="/" replace/>
    }
  return children
}

export default PublicRoute