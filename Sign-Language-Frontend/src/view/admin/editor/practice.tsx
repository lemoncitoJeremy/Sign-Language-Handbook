import { useState } from "react";
import AdminNav from "../../../components/navigation/admin_nav";
import WithAsidePractice from "../../../layout/with-aside-practice";
import NoAsidePractice from "../../../layout/no-aside-practice";


function Practice(){
    const [openAside, setOpenAside] = useState(false);
    
    return(
        <>
            <AdminNav
                name={"Jeremy Lemoncito"}
                role={"editor"}
                setOpenAside={setOpenAside}
                openAside={openAside}
            />
            {openAside ? (
                <WithAsidePractice/>
            ):(

                /**called all of the created tests */
                <NoAsidePractice/>
                
            )}
        </>
    )
}

export default Practice;