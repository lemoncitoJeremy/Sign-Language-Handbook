import { useState } from "react";
import AdminNav from "../../../components/navigation/admin_nav"
import NoAsideRequestPublish from "../../../layout/no-aside-request-publish";
import WithAsideRequestPublish from "../../../layout/with-aside-request-publish";
import { useUser } from "../../../components/User-Context/UserContext";

function RequestPublish(){
    const [openAside, setOpenAside] = useState(false);
    const {userData} = useUser()
    return(
        <>
            <AdminNav
                name={userData?.username}
                role={userData?.role}
                setOpenAside={setOpenAside}
                openAside={openAside}
            />
            {openAside ? (
                <WithAsideRequestPublish/>
            ):(
                <NoAsideRequestPublish/>
            )}
        </>
    )
}

export default RequestPublish