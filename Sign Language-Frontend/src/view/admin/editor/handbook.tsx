import { useEffect, useState } from "react";
import AdminNav from "../../../components/navigation/admin_nav";
import { useLocation } from "react-router-dom";
import CardHandTitle from "../../../components/card/card_handbook_title";


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
                setOpenAside={setOpenAside}
                openAside={openAside}
            />
            <div className="content-fluid">
                <CardHandTitle/>
            </div>
        </>
    )
}

export default Handbook;