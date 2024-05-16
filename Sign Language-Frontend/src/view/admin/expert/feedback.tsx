import { useState } from "react";
import AdminNav from "../../../components/navigation/admin_nav"
import WithAsideFeedback from "../../../layout/with-aside-feedback";
import NoAsideFeedback from "../../../layout/no-aside-feedback";


function Feedback(){
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
                <WithAsideFeedback/>
            ):(
                <NoAsideFeedback/>
            )}
        </>
    )
}

export default Feedback;