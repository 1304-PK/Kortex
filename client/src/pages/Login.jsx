import AuthForm from "../components/AuthForm";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()

    const handleSubmit = async (e, username, email, password, setLoading, setError) => {
        e.preventDefault()
        setLoading(true)
        try{
            const {data, error} = await supabase.auth.signInWithPassword({
                email, password
            })
            if (error){
                return setError(error)
            }
            console.log(data.user)
            navigate("/")
        } catch(err){
            setError(err.message)
        } finally{
            setLoading(false)
        }
    }

    return(
        <AuthForm 
        authTitle="Log In"
        passwordPlaceholder="Enter your password"
        btnText="Log In"
        bottomText="Don't have an account?"
        navText="Sign Up"
        navDestination="/auth/signup"
        handleSubmit={handleSubmit}
        />
    )
}

export default Login