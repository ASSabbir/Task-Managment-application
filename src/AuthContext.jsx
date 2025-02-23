import { createContext, useEffect, useState } from "react";

export const MainContext=createContext(null)
import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase.config";

const provider = new GoogleAuthProvider();

const AuthContext = ({children}) => {
    // fetch the data 
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    
    



    // register 
    const handelSignup=(email,pass)=>{
        return createUserWithEmailAndPassword(auth,email,pass)
    }
    const handelSignin=(email,pass)=>{
        return signInWithEmailAndPassword(auth, email, pass)
    }
    useEffect(()=>{
        const unsub=onAuthStateChanged(auth,currentUser=>{
            setLoading(false)
            setUser(currentUser)

        })
        return()=>{
            unsub();
        }
    },[])
    const logout=()=>{
        return signOut(auth)
    }
    const handelUpdateUser=(name,url)=>{
       return updateProfile(auth.currentUser, {
            displayName: name, photoURL: url
          })
    }
    // gogle login 
    const googleSign =()=>{
        return signInWithPopup(auth,provider)
    }

   
    const data={
        
        loading,
        handelSignup,
        handelSignin,
        user,
        logout,
        googleSign,
        handelUpdateUser
    }

    return (
        <MainContext.Provider value={data}>
            {children}
        </MainContext.Provider>
    );
};


export default AuthContext;