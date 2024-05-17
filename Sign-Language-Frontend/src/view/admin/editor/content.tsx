import { useState } from "react";
import "../../../style.scss"
import AdminNav from "../../../components/navigation/admin_nav";
import NoAsideContent from "../../../layout/no-aside-content";

function HandbookContent(){

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
        <NoAsideContent/>
    ) : (
        <NoAsideContent/>
    )}
    </>)
}

function DictionaryContent(){
    return(
    <>
    </>)
}

export {HandbookContent, DictionaryContent};