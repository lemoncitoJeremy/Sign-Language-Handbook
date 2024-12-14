import { useEffect, useState } from "react";
import AddImage from "../assets/addImage.png";
import _ from "lodash";
import { useUser } from "../components/User-Context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AssessmentInfo {
  question: string;
  correct_ans: string;
  incorrect1: string;
  incorrect2: string;
  incorrect3: string;
  shuffled_answers?: string[]; // optional type
}

function NoAsideTest(props: any) {
  const { userData } = useUser(); // Assuming useUser returns the user context with accountID
  const accountID = userData?.accountID;

  const testID = props.testID;
  console.log(testID);
  const title = props.test_title;
  console.log(title)

  const [changeImg, setChangeImg] = useState(false);
  const [curImg, setImg] = useState(AddImage);

  function handleChange(e: any) {
    console.log(e.target.files);
    setImg(URL.createObjectURL(e.target.files[0]));
    setChangeImg(true);
  }

  const [data, setData] = useState<AssessmentInfo[]>([]);
  const [activeItem, setActiveItem] = useState<Array<string | null>>([]);
  const [viewAssess, setView] = useState<number | undefined>();
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const handleSelectItem = (item: string, questionIndex: number) => {
    setActiveItem((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[questionIndex] = item;
      return updatedItems;
    });
    console.log(item); // Print the selected item in the console
  };

  useEffect(() => {
    fetch(`http://localhost:5000/assessments/questions/${testID}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        // Shuffle answers for each question
        data.forEach((test: any) => {
          const shuffledAnswers = _.shuffle([
            test.correct_ans,
            test.incorrect1,
            test.incorrect2,
            test.incorrect3,
          ]);
          test.shuffled_answers = shuffledAnswers;
        });
        setActiveItem(new Array(data.length).fill(null));
      })
      .catch((err) => console.log(err));
  }, [testID]);

  const handleSubmit = async () => {
    // Calculate score
    let percentageScore = 0;
    let correctAnswers = 0;
    for (let i = 0; i < data.length; i++) {
      if (activeItem[i] === data[i].correct_ans) {
        correctAnswers++;
      }
    }

    percentageScore = Math.round((correctAnswers / data.length) * 100);
    setScore(percentageScore);
    setShowScore(true);

    const finalScore = percentageScore;
    const payload = {
      accountID: accountID,
      testID: testID,
      test_scores: finalScore,
    };

    await axios
      .post("http://localhost:5000/assessments/testResults", payload)
      .then(() => {
        console.log("Submitted Successfully", payload.test_scores, accountID);
      })
      .catch((err) => console.log(err));
  };

 const ScorePopup = () => {
  return (
    <div className="score-popup-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="score-popup" style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
        <h2>Your Score:</h2>
        <div className="Score">
          <p>
            <strong>{score}%</strong>
          </p>
        </div>
        <div className="close-button" style={{ marginTop: '20px' }}>
          <button
            className="btn btn-primary"
            onClick={() => { setShowScore(false); window.location.href = '/editor/practice'; }}
            style={{ fontSize: '18px' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          {/*changeImg ? (
            <div className="d-inline">
              <input type="file" id="upload-image" onChange={handleChange} hidden />
              <label htmlFor="upload-image" className="btn btn-unstyled" style={{ padding: 0 }}>
                <img src={curImg} style={{ width: "5rem", height: "5rem" }} alt="..." />
              </label>
            </div>
          ) : (
            <div className="d-inline" style={{ marginLeft: "140px", marginTop: "10px" }}>
              <input type="file" id="upload-image" onChange={handleChange} hidden />
              <label htmlFor="upload-image" className="btn btn-unstyled " style={{ paddingTop: "150px", paddingLeft: "250px" }}>
                <img src={curImg} className="card-img-top" style={{ width: "10rem", height: "10rem" }} alt="..." />
              </label>
            </div>
          )*/} 
        </div>
        <div className="col">
          <p className="h1" style={{ paddingTop: "100px" }}>{props.testID}</p>
        </div>
        {showScore && <ScorePopup />}
        {data.slice(0, viewAssess).map((test, index) => (
          <div className="test-cards" key={`assessment_${testID}_${index}`}>
            <div className="test-heading">
              <h3>Question {index + 1}</h3>
              <p>{test.question}</p>
            </div>
            <div className="test-body">
              <div className="test-questions">
                <div className="list-group">
                  {test.shuffled_answers?.map((answer, answerIndex) => (
                    <a
                      className={`list-group-item list-group-item-action ${activeItem[index] === answer ? "active" : ""}`}
                      onClick={() => handleSelectItem(answer, index)}
                      key={`assessment_${answer}_${index}`}
                    >
                      {answer}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="CreateAssessment-SubmitButton">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ fontSize: "18px" }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      
    </>
  );
}

export default NoAsideTest;
