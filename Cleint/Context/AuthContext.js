import React,{createContext, useState} from "react";


export const AuthContext=createContext();

export const AuthProvider =({children})=>{
    const [isLoading,setIsLoading]=useState(false)
    const [currentUser,setCurrentUser]=useState(true)
    const [globalError,setGlobalError]=useState(null);



    signInStart=()=>{
        setIsLoading(true);
    }
    signInFailure=(error)=>{
        console.log('err',error)
        setIsLoading(false);
        setGlobalError(error)
        setCurrentUser(null);
    }
    signInSuccess=(value)=>{
        console.log(value);
        setIsLoading(false);
        setCurrentUser(value);
      
        
    }
    return (
        <AuthContext.Provider value={{currentUser,isLoading,setCurrentUser,globalError,signInStart,signInFailure,signInSuccess}}>
            {children}
        </AuthContext.Provider>
    )

}