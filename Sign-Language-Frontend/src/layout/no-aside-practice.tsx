import { useState, useEffect } from "react";
import { PracticeCard } from "../components/card/card_practice_page";
import ProblemTable from "../components/table/problem_table";


function NoAsidePractice(props: any){
    interface assessmentInfo {
        testID: number;
        test_subject: string;
        test_title: string;
        test_description: string;
        
      }

      //get data from local host
    const [data, setData] = useState<assessmentInfo[]>([]);
    useEffect(() => {
    fetch("http://localhost:5000/assessments")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

    const [viewAssess, setView] = useState();
    setView;

    const [showAnswerAssessment, setShowAnswerAssessment] = useState(false);
    const [selectedtestID, setSelectedAssessmentID] = useState<any>(null);

    /*for knowing what questions will be loaded according to its test ID*/
    const handleSubmit = async (testID: number) => {
        setShowAnswerAssessment(true);
        setSelectedAssessmentID(testID);
    };
    /**eto dapat yung list ng tests, Dito maglload lahat ng created tests */
    return(
        <>
       
        <div className="row ms-4 mt-5">
        {data.slice(0, viewAssess).map((tests, index) => (
            <div className="row" key={index}>
                <PracticeCard
                    testID = {tests.testID}
                    name={tests.test_title}
                    desc={tests.test_description}
                    score={0}
                />
            </div>
             ))}
        </div>
        
        </>
        

        
    )
}

export default NoAsidePractice;