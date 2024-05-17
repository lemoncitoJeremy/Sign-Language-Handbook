import { useEffect, useState } from "react";
import AdminNav from "../../../components/navigation/admin_nav";
import { useLocation } from "react-router-dom";
import NoAsideHandbook from "../../../layout/no-aside-handbook";
import WithAsideHandbook from "../../../layout/with-aside-handbook";


function Handbook(){
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
                    <WithAsideHandbook/>
                ):(
                    <NoAsideHandbook/>
                )}
            </div>
        </>
    )
}

export default Handbook;