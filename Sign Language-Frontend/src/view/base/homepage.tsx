import TopNav from "../../components/navigation/user_nav"
import Footer from "../../components/footer/footer"

import "../../style.scss"
import HomepageLayout from "../../layout/homepage";

function Homepage(){

    return (
        <>
            <TopNav
                isLoggedIn={false}
            />
            <HomepageLayout/>
            <Footer/>
        </>
    )
}


export default Homepage