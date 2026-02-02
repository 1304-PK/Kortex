import AuthForm from "../components/AuthForm";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate()

    const handleSubmit = async (e, email, password, setLoading, setError) => {
        e.preventDefault()
        if (password.includes(' ')){
            return setError("Password cannot contain spaces")
        }
        if (password.length<6){
            return setError("Password cannot be less than 6 characters")
        }

        setLoading(true)
        setError('')
        try{
            const {data, error} = await supabase.auth.signUp({
                email, password
            })
            if (error){
                return setError(error)
            }
            console.log(data.user)
            navigate("/")
        } catch(err){
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return(
        <AuthForm 
        authTitle="Sign Up"
        passwordPlaceholder="Create a password"
        btnText="Create Account"
        bottomText="Already have an account?"
        navText="Log In"
        navDestination="/auth/login"
        handleSubmit={handleSubmit}
        />
    )
}

export default Signup