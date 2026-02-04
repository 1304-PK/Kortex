import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

   useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return(
    <AuthContext.Provider value={{session, loading}}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context){
        throw new Error("useAuth must be used inside AuthProvider")
    }
    return context
}

export {useAuth, AuthProvider}