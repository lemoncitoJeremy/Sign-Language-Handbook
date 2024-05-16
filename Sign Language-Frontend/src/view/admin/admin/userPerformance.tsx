import { ViewCardTable } from "../../../components/card/card_table"
import "../../../style.scss"
import {performance_color_coding} from "../../../components/utilities/color-coding";
import AdminNav from "../../../components/navigation/admin_nav";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserData {
    accountID: number;
    username: string;
    test_scores: number;
    performance: string;
}

function UserPerformance(props: any){
    const [userData, setUserData] = useState<UserData[]>([]);

    useEffect(() => {
        // Fetch user data from the server when the component mounts
        axios.get('http://localhost:5000/GetTest')
            .then(response => {
                if (response.data.status === 'success') {
                    setUserData(response.data.users); 
                } else {
                    console.error('Error fetching users:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    console.log('userData:', userData); 

    const titles = [
        "UserID",
        "Username",
        "Average Test Score",
        "Performance"
    ];

    return (
        <>
            <AdminNav name={"Isiah Jordan"} />
            {userData.length > 0 && (
                <ViewCardTable
                    title={"User Performance"}
                    header={titles}
                    value={userData.map(user => ({
                        "UserID": user.accountID,
                        "Username": user.username,
                        "Average Test Score": user.test_scores,
                        "Performance": performance_color_coding(user.performance.toLowerCase())
                    }))}
                />
            )}
        </>
    );
}

export default UserPerformance;