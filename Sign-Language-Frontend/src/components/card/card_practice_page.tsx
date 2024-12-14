import { useState } from "react";
import AddImage from "../../assets/addImage.png"
import Score from "../../assets/editor/score.png"
import Retake from "../../assets/editor/retake.png"
import NoAsideTest from "../../layout/no-aside-test";
import { useNavigate } from "react-router-dom";
function PracticeCard(props: any){
    const [changeImg, setChangeImg] = useState(false);
    const [curImg, setImg] = useState(AddImage);

    function handleChange(e: any) {
        console.log(e.target.files);
        setImg(URL.createObjectURL(e.target.files[0]));
        setChangeImg(true);
    }
    
    const navigate = useNavigate()
    const [showAnswertest, setShowAnswertest] = useState(false);
  const [selectedtestID, setSelectedtestID] = useState<any>(null);


   /**modified button submit to get the testID of the test selected to load the test with the corresponding testID */
    const handleSubmit = async (testID: number) => {
        setShowAnswertest(true);
        setSelectedtestID(testID);
        
      };

    return(

<>
<div className="container-fluid" style={{width: "100%"}}>
    {showAnswertest ? (
                    <NoAsideTest testID={selectedtestID} /> // Render NoAsideTest component if showAnswertest is true
                ) : (
                    <div className="card practice-container mx-0"> 
                    <div className="card-body bg-light d-flex align-items-center">
                        <div className="mx-3"> 
                            <input type="file" id="upload-image" onChange={handleChange} hidden/>
                            <label htmlFor="upload-image" className="btn btn-unstyled" style={{padding: 0}}> 
                                <img  src={curImg} style={{width: "5rem", height:"5rem"}} alt="..."/>
                            </label>    
                        </div>
                        <div className="d-inline-flex flex-grow-1 justify-content-between">
                            <div>
                                <p className="h4">{props.name}</p>
                                <p className="">{props.desc}</p>
                            </div>
                            <div className="score_retake_container" style={{paddingTop:'1%'}} >
                                <div className="score_retake d-flex">
                                    <button className="btn btn-unstyled px-4" style={{ backgroundColor: "#CDCBCE"}} >
                                        <img src={Score} className="d-inline me-2" alt="Score Icon" />
                                        <span style={{ color: "white", fontWeight: "bold"}}>{props.test_score}</span>
                                    </button>
                                    <button className="btn btn-unstyled ms-3" style={{ backgroundColor: "lightgreen" }} onClick={() => handleSubmit(props.testID) } >
                                        <img src={Retake} className="d-inline me-2" alt="Retake Icon" />
                                        <span style={{ color: "white", fontWeight: "bold" }}>take</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            )}
        </div>
    </>
        
    )
}

export {PracticeCard};
