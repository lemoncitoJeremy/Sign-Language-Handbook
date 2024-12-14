import TopNav from "../../components/navigation/user_nav"
import { useUser } from "../../components/User-Context/UserContext";
function UserHomepage(){
    const {userData} = useUser()
    return (
        <>
            <TopNav
                isLoggedIn={userData?.isLoggedIn}
            />
        </>
    )
}


export default UserHomepage