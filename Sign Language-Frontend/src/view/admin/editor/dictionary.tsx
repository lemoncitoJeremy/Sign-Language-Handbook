import { useState } from "react";
import AdminNav from "../../../components/navigation/admin_nav";
import NoAsideDictionary from "../../../layout/no-aside-dictionary";
import WithAsideDictionary from "../../../layout/with-aside-dictionary";


function Dictionary(){
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
                <WithAsideDictionary/>
            ):(
                <NoAsideDictionary/>
            )}
        </>
    )
}

export default Dictionary;