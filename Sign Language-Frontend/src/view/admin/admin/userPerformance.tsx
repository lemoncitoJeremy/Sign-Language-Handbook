import { ViewCardTable } from "../../../components/card/card_table"
import "../../../style.scss"
import {performance_color_coding} from "../../../components/utilities/color-coding";
import AdminNav from "../../../components/navigation/admin_nav";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UserPerformance(props: any){
    const location = useLocation()
    const [userData, setUserData] = useState();

    const [openAside, setOpenAside] = useState(false);

    useEffect(() => {
        // Google Analytics
        setUserData(location.state.name);
    }, [location]);
    
    const titles = [
        "UserID", 
        "Username",
        "Average Test Score",
        "Performance"
    ]

    const dictionary = [
        {
        "UserID": 0,
        "Username": "Isiah Jordan",
        "Average Test Score": 999,
        "Performance": performance_color_coding("poor")
        },
        {
        "UserID": 1,
        "Username": "Isiah Jordan",
        "Average Test Score": 999,
        "Performance": performance_color_coding("good")
        },
        {
        "UserID": 2,
        "Username": "Isiah Jordan",
        "Average Test Score": 999,
        "Performance": performance_color_coding("good")
        },
        {
        "UserID": 3,
        "Username": "Isiah Jordan",
        "Average Test Score": 999,
        "Performance":  performance_color_coding("good")
        },
        {
        "UserID": 4,
        "Username": "Isiah Jordan",
        "Average Test Score": 999,
        "Performance":  performance_color_coding("poor")
        },
        {
        "UserID": 5,
        "Username": "Isiah Jordan",
        "Average Test Score": 999,
        "Performance":  performance_color_coding("excellent")
        },
    ];

    return (<>
        <AdminNav
            name={location.state.name}
            setOpenAside={setOpenAside}
            openAside={openAside}
        />
        <ViewCardTable
            title={"User Performance"}
            header={titles}
            value={dictionary}
        />

    </>)
}

export default UserPerformance;