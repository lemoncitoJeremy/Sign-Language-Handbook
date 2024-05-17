import "../../../style.scss";
import { performance_color_coding } from "../../../components/utilities/color-coding";
import AdminNav from "../../../components/navigation/admin_nav";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ViewCardTable } from "../../../components/card/card_table";
import axios from "axios";

interface UserData {
    accountID: number;
    username: string;
    test_scores: number;
    testID: number;
    performance: string;
}

function TestScore(props: any) {
    const [userData, setUserData] = useState<UserData[]>([]);

    useEffect(() => {
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
        "Test ID",
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
                        "Test ID": user.testID,
                        "Performance": performance_color_coding(user.performance.toLowerCase())
                    }))}
                />
            )}
        </>
    );
}

export default TestScore;