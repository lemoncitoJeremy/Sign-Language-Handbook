import { useLocation, useNavigate } from "react-router-dom";
import AdminNav from "../../components/navigation/admin_nav";
import { UserDashboardTable } from "../../components/card/card_table";
import "../../style.scss"
import {performance_color_coding} from "../../components/utilities/color-coding";
import { useEffect, useState } from "react";
import { CircularProgress } from "../../components/card/card_graph";
import NoAsideDashboard from "../../layout/no-aside-dashboard";
import WithAsideDashboard from "../../layout/with-aside-dashboard";



function Dashboard(props: any){
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
            "Username": "Isiah Jordan",
        "UserID": 2,
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

    const usergraph = [
        {
            "Month": "aug",
            "UserCount": 10,
        },
        {
            "Month": "sep",
            "UserCount": 40,
        },
        {
            "Month": "oct",
            "UserCount": 20,
        }
    ]

    return(
        <div className="content-fluid">
            {userData == null ? (
                <>
                 <div className="center-spinner">
                    <div className="spinner-border text-primary size-spinner" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                </>
            ):(
                <>
                    <AdminNav
                    name={location.state.name}
                    role={"admin"}
                    setOpenAside={setOpenAside}
                    openAside={openAside}
                    />
                    {openAside ? (
                        <WithAsideDashboard
                            titles={titles}
                            dictionary={dictionary}
                            score={50}
                            max={100}
                        />
                    ):(
                        <NoAsideDashboard
                            titles={titles}
                            dictionary={dictionary}
                            score={50}
                            max={100}
                            width={600}
                            height={400}
                            userdata={usergraph}
                        />
                    )}
                </>
            )}
            
        </div>
    )
}

export default Dashboard;