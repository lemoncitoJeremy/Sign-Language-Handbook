import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserNav from "../../components/navigation/user_nav";
import NoAsidePractice from "../../layout/no-aside-practice";
import { useUser } from "../../components/User-Context/UserContext";


function learn(){
    const {userData} = useUser();

    
    

    return(
        <>
            <UserNav
             isLoggedIn={userData?.isLoggedIn}
            />
            <NoAsidePractice/>
        </>
    )
}

export default learn;