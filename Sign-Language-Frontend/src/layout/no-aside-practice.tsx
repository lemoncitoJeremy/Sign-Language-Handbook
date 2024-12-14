import { useState, useEffect } from "react";
import { PracticeCard } from "../components/card/card_practice_page";
import { useUser } from "../components/User-Context/UserContext"
import { useNavigate } from "react-router-dom";

function NoAsidePractice(props: any) {
    const { userData } = useUser();
    const accountID = userData?.accountID;
    console.log("Account ID:", accountID);
    const navigate = useNavigate()
    interface AssessmentInfo {
        testID: number;
        test_subject: string;
        test_title: string;
        test_description: string;
    }

    interface UserScores {
        testID: number;
        test_score: number;
    }

    const [data, setData] = useState<AssessmentInfo[]>([]);
    const [userScores, setUserScores] = useState<UserScores[]>([]);
    console.log('what',userScores[0]);
    const score = JSON.stringify(userScores[0])
    console.log(score)
    useEffect(() => {
        // Fetch assessment data
        fetch("http://localhost:5000/assessments/")
            .then((res) => res.json())
            .then((data) => {
                console.log("Assessment data:", data);
                setData(data);
            })
            .catch((err) => console.error(err));

        // Fetch user scores if accountID is available
        if (accountID) {
            fetch(`http://localhost:5000/assessments/maxScore/${accountID}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("User scores:", data);
                    setUserScores(data);
                })
                .catch((err) => console.error(err));
        }
    }, [accountID]);

    return (
        <div className="row ms-4 mt-5">
            {data.map((test, index) => {
                // Find the corresponding user score for the current test
                const userScore = userScores.find(score => score.testID === test.testID)?.test_score;
                return (
                    <div className="row" key={index}>
                        <PracticeCard
                            testID={test.testID}
                            name={test.test_title}
                            desc={test.test_description}
                            test_score={score} // Pass the user's score or 'N/A' if not found
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default NoAsidePractice;
