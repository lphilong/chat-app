import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    //Authentication
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };
    //function enter to submit
    function useKey(key, cb) {
        const callbackRef = useRef(cb);
        useEffect(() => {
            callbackRef.current = cb;
        });
        useEffect(() => {
            function handle(e) {
                if (e.code === key) {
                    //prevent repeated events
                    if (e.repeat) return;
                    callbackRef.current(e);
                }
            }
            document.addEventListener('keydown', handle);
            return () => document.removeEventListener('keydown', handle);
        }, [key]);
    }
    //close when click outside
    function useOutsideClose(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    //function
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }
    //toggle
    const [isActive, setActive] = useState(false);
    const toggleClass = () => {
        setActive(!isActive);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    const value = {
        createUser,
        user,
        logout,
        login,
        useOutsideClose,
        useKey,
        toggleClass,
        isActive,
    };
    return <UserContext.Provider value={value}>{!loading && children}</UserContext.Provider>;
};

export const useAuth = () => {
    return useContext(UserContext);
};
