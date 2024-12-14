import TopNav from "../../components/navigation/user_nav"
import Footer from "../../components/footer/footer"
import "../../style.scss"
import HomepageLayout from "../../layout/homepage";
import { useUser } from "../../components/User-Context/UserContext";
function Homepage(){
    const { userData } = useUser();
    return (
        <>
            <TopNav
                isLoggedIn={userData?.isLoggedIn}
            />
            <HomepageLayout/>
            <Footer/>
        </>
    )
}


export default Homepage