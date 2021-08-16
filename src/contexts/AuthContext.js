import React, {useContext, useEffect, useState} from "react"
import { auth } from "../firebase"


const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function login(){
      return auth.signInAnonymously()  
    }

    function logOut(){
        return auth.signOut();
    }
    
    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user); 
          setLoading(false);
        })

        return unsubscribe
    }, [])

     
    const value = {
        currentUser,
        login,
        logOut
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}