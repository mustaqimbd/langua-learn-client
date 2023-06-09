import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
export const AuthContext = createContext(null)
const auth = getAuth(app)
import { GoogleAuthProvider } from "firebase/auth";


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
    }
    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            console.log(user);
            setUser(user)
            setLoading(false)
        })
        return () => unsubscribe();
    }, [])

    const authInfo = {
        user,
        createUser,
        updateUserProfile,
        googleSignIn,
        loginUser,
        logOut,
        loading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;