import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminNav from "../../../components/navigation/admin_nav";
import NoAsideTest from "../../../layout/no-aside-test";
import WithAsideTest from "../../../layout/with-aside-test";

function Test(){
    const location = useLocation()
    const [userData, setUserData] = useState();

    const [openAside, setOpenAside] = useState(false);
    
    useEffect(() => {
        // Google Analytics
        //setUserData(location.state.name);
    }, [location]);

    return(
        <>
            <AdminNav
                name={"Jordan"}
                role={"editor"}
                setOpenAside={setOpenAside}
                openAside={openAside}
            />
            <div className="content-fluid">
                {openAside ? (
                    <WithAsideTest/>
                ):(
                    <NoAsideTest
                    />
                )}
            </div>
        </>
    )
}

export default Test;