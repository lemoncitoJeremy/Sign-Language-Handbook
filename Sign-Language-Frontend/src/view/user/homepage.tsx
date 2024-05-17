import TopNav from "../../components/navigation/user_nav"

function UserHomepage(){
    return (
        <>
            <TopNav
                isLoggedIn={true}
            />
        </>
    )
}


export default UserHomepage