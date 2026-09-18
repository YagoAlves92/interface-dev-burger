import { createContext, useContext, useState, useEffect } from "react";


const UserContext = createContext({});

export const UserProvider = ({children}) => {
    const [userInfo , setUserInfo] = useState({})

    const putUserData = (userInfo) => {
        setUserInfo(userInfo)

        localStorage.setItem('devbuger:userData' , JSON.stringify(userInfo))
    }

    const logout = () => {
        setUserInfo({})
        localStorage.removeItem('devbuger:userData');
    }

    useEffect(()=>{
        const userInfoLocalStorage = localStorage.getItem('devbuger:userData')

        if (userInfo){
            setUserInfo(JSON.parse(userInfoLocalStorage))
        }
    },[]);

    return(
        <UserContext.Provider value={{userInfo, putUserData, logout}}>{children}</UserContext.Provider>
    )
}

export const useUser = ()=> {
    const context = useContext(UserContext);

    if(!context){
        throw new Error('useUser must be a valid context');
    }

    return context;
}
