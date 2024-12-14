// Dashboard.jsx
import { useLocation, useNavigate } from "react-router-dom";
import AdminNav from "../../components/navigation/admin_nav";
import { useEffect, useState } from "react";
import axios from "axios";
import WithAsideDashboard from "../../layout/with-aside-dashboard";
import NoAsideDashboard from "../../layout/no-aside-dashboard";
import { performance_color_coding } from "../../components/utilities/color-coding";
import { useUser } from "../../components/User-Context/UserContext";

interface UserData {
    accountID: number;
    username: string;
    test_scores: number;
    performance: string;
    last_login: string;
}

interface FeedbackData {
    FeedbackID: number;
    Email: string;
    Description: string;
    StarRating: number;
}

function Dashboard(props: any) {
    const location = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData[]>([]);
    const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);
    const [openAside, setOpenAside] = useState(false);

    const { userData: currentUser } = useUser();

    useEffect(() => {
        Promise.all([
            axios.get("http://localhost:5000/GetTest"),
            axios.get("http://localhost:5000/GetUsers"),
            axios.get("http://localhost:5000/GetFeedback")
        ]).then(([testResponse, usersResponse, feedbackResponse]) => {
            if (testResponse.data.status === "success" && usersResponse.data.status === "success" && feedbackResponse.data.status === "success") {
                const aggregatedUserData = aggregateTestScores(testResponse.data.users);
                const updatedUserData = aggregatedUserData.map((user) => {
                    const foundUser = usersResponse.data.users.find((u: any) => u.accountID === user.accountID);
                    if (foundUser) {
                        return { ...user, last_login: foundUser.last_login };
                    }
                    return user;
                });
                setUserData(updatedUserData);
                setFeedbackData(feedbackResponse.data.feedback);
            } else {
                console.error("Error fetching data");
            }
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);

    const aggregateTestScores = (users: UserData[]): UserData[] => {
        const aggregatedUserData: { [key: number]: { user: UserData; count: number } } = {};
        users.forEach((user) => {
            if (aggregatedUserData[user.accountID]) {
                aggregatedUserData[user.accountID].user.test_scores += user.test_scores;
                aggregatedUserData[user.accountID].count++;
            } else {
                aggregatedUserData[user.accountID] = { user: { ...user }, count: 1 };
            }
        });
        Object.values(aggregatedUserData).forEach((userData) => {
            userData.user.test_scores /= userData.count;
        });
        return Object.values(aggregatedUserData).map((data) => data.user);
    };

    const titles = ["UserID", "Username", "Average Test Score", "Performance"];
    const feedbackTitles = ["FeedbackID", "Email", "Description", "StarRating"];

    const totalAverageScore = userData.reduce((total, user) => total + user.test_scores, 0) / userData.length;

    const totalStarRating = feedbackData.reduce((total, feedback) => total + feedback.StarRating, 0);
    const overallRating = feedbackData.length > 0 ? totalStarRating / feedbackData.length : 0;

    const dictionary = userData.map((user) => ({
        UserID: user.accountID,
        Username: user.username,
        "Average Test Score": user.test_scores,
        Performance: performance_color_coding(user.test_scores < 70 ? 'poor' : user.test_scores < 90 ? 'good' : 'excellent'),
    }));

    const feedbackDictionary = feedbackData.map((feedback) => ({
        FeedbackID: feedback.FeedbackID,
        Email: feedback.Email,
        Description: feedback.Description,
        StarRating: feedback.StarRating
    }));

    const allMonths = Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(i);
        return date.toLocaleString("en-us", { month: "short" });
    });
    const currentMonth = new Date().toLocaleString("en-us", { month: "short" });

    const usergraph = allMonths.map((month) => {
        const usersInMonth = userData.filter((user) => {
            const lastLoginDate = new Date(user.last_login);
            return lastLoginDate.toLocaleString("en-us", { month: "short" }) === month;
        });
        return { Month: month, UserCount: usersInMonth.length };
    });

    const currentMonthTotal = usergraph.find((entry) => entry.Month === currentMonth)?.UserCount || 0;

    const onViewAllFeedback = () => {
        navigate("/admin/user/feedback");
    };

    return (
        <div className="content-fluid">
            {userData.length === 0 && feedbackData.length === 0 ? (
                <div className="center-spinner">
                    <div className="spinner-border text-primary size-spinner" role="status">
                    </div>
                </div>
            ) : (
                <>
                    <AdminNav name={currentUser?.username} setOpenAside={setOpenAside} openAside={openAside} />
                    {openAside ? (
                        <WithAsideDashboard
                            titles={titles}
                            dictionary={dictionary}
                            feedbackTitles={feedbackTitles}
                            feedbackDictionary={feedbackDictionary}
                            onViewAllFeedback={onViewAllFeedback}
                            score={totalAverageScore}
                            max={100}
                            width={500}
                            height={200}
                            userdata={usergraph}
                            countUsers={currentMonthTotal}
                            overallRating={overallRating}
                        />
                    ) : (
                        <NoAsideDashboard
                            titles={titles}
                            dictionary={dictionary}
                            feedbackTitles={feedbackTitles}
                            feedbackDictionary={feedbackDictionary}
                            onViewAllFeedback={onViewAllFeedback}
                            score={totalAverageScore}
                            max={100}
                            width={600}
                            height={300}
                            userdata={usergraph}
                            countUsers={currentMonthTotal}
                            overallRating={overallRating}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Dashboard;
