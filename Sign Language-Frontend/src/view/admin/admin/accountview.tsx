import "../../../style.scss"
import {performance_color_coding} from "../../../components/utilities/color-coding";
import AdminNav from "../../../components/navigation/admin_nav";
import { ViewCardTable } from "../../../components/card/card_table";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function AccountView(props: any){

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
        "Email",
        "Date Created",
        "Role",
        "Action"
    ]

    const dictionary = [
        {
        "UserID": 0,
        "Username": "Isiah Jordan",
        "Email": "Jordi@gmail.com",
        "Date Created": "2024-01-01",
        "Role": "Admin",
        "Action": (
            <div>
                <button className="btn btn-unstyled">
                    Edit
                </button>
                <button className="btn btn-unstyled">
                    Delete
                </button>
            </div>
        )
        },
        {
        "UserID": 1,
        "Username": "Isiah Jordan",
        "Email": "Jordi@gmail.com",
        "Date Created": "2024-01-01",
        "Role": "Admin",
        "Action": (
            <div>
                <button className="btn btn-unstyled">
                    Edit
                </button>
                <button className="btn btn-unstyled">
                    Delete
                </button>
            </div>
        )
        },
        {
        "UserID": 2,
        "Username": "Isiah Jordan",
        "Email": "Jordi@gmail.com",
        "Date Created": "2024-01-01",
        "Role": "Admin",
        "Action": (
            <div>
                <button className="btn btn-unstyled">
                    Edit
                </button>
                <button className="btn btn-unstyled">
                    Delete
                </button>
            </div>
        )
        },
        {
        "UserID": 3,
        "Username": "Isiah Jordan",
        "Email": "Jordi@gmail.com",
        "Date Created": "2024-01-01",
        "Role": "Admin",
        "Action": (
            <div>
                <button className="btn btn-unstyled">
                    Edit
                </button>
                <button className="btn btn-unstyled">
                    Delete
                </button>
            </div>
        )
        },
        {
        "UserID": 4,
        "Username": "Isiah Jordan",
        "Average Test Score": 999,
        "Email": "Jordi@gmail.com",
        "Date Created": "2024-01-01",
        "Role": "Admin",
        "Action": (
            <div>
                <button className="btn btn-unstyled">
                    Edit
                </button>
                <button className="btn btn-unstyled">
                    Delete
                </button>
            </div>
        )
        },
        {
        "UserID": 5,
        "Username": "Isiah Jordan",
        "Email": "Jordi@gmail.com",
        "Date Created": "2024-01-01",
        "Role": "Admin",
        "Action": (
            <div>
                <button className="btn btn-unstyled">
                    Edit
                </button>
                <button>
                    Delete
                </button>
            </div>
        )
        },
    ];

    return (<>
        <AdminNav
            name={location.state.name}
            setOpenAside={setOpenAside}
            openAside={openAside}
        />
        <ViewCardTable
            title={"Account View"}
            header={titles}
            value={dictionary}
        />
        </>
    )
}

export default AccountView;