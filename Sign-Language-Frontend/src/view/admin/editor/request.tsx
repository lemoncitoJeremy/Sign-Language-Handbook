import { useState } from "react";
import AdminNav from "../../../components/navigation/admin_nav"
import NoAsideRequestPublish from "../../../layout/no-aside-request-publish";
import WithAsideRequestPublish from "../../../layout/with-aside-request-publish";


function RequestPublish(){
    const [openAside, setOpenAside] = useState(false);
    
    return(
        <>
            <AdminNav
                name={"Isiah Jordan"}
                role={"editor"}
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