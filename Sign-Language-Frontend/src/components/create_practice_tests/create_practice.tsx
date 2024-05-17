
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAssessment.css";
import AdminNav from "../navigation/admin_nav";
import WithAsidePractice from "../../layout/with-aside-practice";
import NoAsidePractice from "../../layout/no-aside-practice";
import AddImage from "../../assets/addImage.png"
const create_practice = () => {

interface ValuesType {
  title: string;
  test_subject: string;
  Description: string;
  [key: string]: string; // This allows any string key with a string value
}


const [changeImg, setChangeImg] = useState(false);
const [curImg, setImg] = useState(AddImage);


function handleChange(e: any) {
    console.log(e.target.files);
    setImg(URL.createObjectURL(e.target.files[0]));
    setChangeImg(true);
}



//get data
const [values, setValues] = useState<ValuesType>({
  title:"",
  test_subject: "",
  Description: "",
  Question: "",
  Correct_Ans: "",
  Incorrect1: "",
  Incorrect2: "",
  Incorrect3: "",
});
const navigate = useNavigate();

const handleInput = (event: any) => {
  setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
};

const handleSubmit =async (event: any) => {
  event.preventDefault();

    const payload = {
      title: values.title,
      test_subject: values.test_subject,
      Description: values.Description,
      questions: questionContent,
    };

    console.log(payload);

    await axios
      .post("http://localhost:5000/createAssessment", payload)
      .then(() => {
        
        alert("created successfully");
        console.log(payload)
      })
      .catch((err) => console.log(err));

      await axios
      .post("http://localhost:5000/createAssessment/insert", payload)
      .then(() => {
        navigate("/editor/practice");
      })
      .catch((err) => console.log(err));
    
};

const [numQuestions, setNumQuestions] = useState(1);
const addQuestion = () => {
  setNumQuestions(numQuestions + 1);
};

const question: any = [];
const questionContent: any = [];
for (let i = 0; i < numQuestions; i++) {
  questionContent.push({
    Question: values[`Question_${i}`],
    Correct_Ans: values[`Correct_Ans_${i}`],
    Incorrect1: values[`Incorrect1_${i}`],
    Incorrect2: values[`Incorrect2_${i}`],
    Incorrect3: values[`Incorrect3_${i}`],
  });

  question.push(
    <>
    <h1>------------------------------------------------</h1>
    <div className="myQuestions" key={i}>
      <div className="mb-3">
        <h2 className="form-label" style={{ paddingBottom: "1%" }}>
          Question {i + 1}
        </h2>
        <textarea
          className="form-control"
          name={`Question_${i}`}
          value={values[`Question_${i}`]}
          onChange={handleInput}
        ></textarea>
      </div>

      <div className="Cont1">
        <div className="Correct mb-3">
          <label className="form-label">
            <strong>Correct Answer : </strong>
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
                type="text"
                className="form-control"
                name={`Correct_Ans_${i}`}
                value={values[`Correct_Ans_${i}`]}
                onChange={handleInput}
                style={{ outline: "auto", outlineColor:"lightgreen" }}
            />
            {changeImg ? (
                <div className="d-inline mx-5">
                    <input type="file" id={`correct_Image_${i}`} onChange={handleChange} hidden/>
                    <label htmlFor={`correct_Image_${i}`} className="btn btn-unstyled" style={{padding: 0}}> 
                        <img  src={curImg} style={{width: "5rem", height:"5rem"}} alt="..."/>
                    </label>    
                </div>
            ) : (
                <div className="d-inline mx-5">
                    <input type="file" id={`correct_Image_${i}`} onChange={handleChange} hidden/>
                    <label htmlFor={`correct_Image_${i}`} className="btn btn-unstyled container-fluid  d-inline"> 
                        <img src={curImg} className="card-img-top"  style={{width: "5rem", height:"5rem"}} alt="..."/>
                    </label>    
                </div>
            )}
        </div>
        </div>
        <div className="Incorrect1 mb-3">
          <label className="form-label">
            <strong>Incorrect Answer #1 :</strong>
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            className="form-control"
            name={`Incorrect1_${i}`}
            value={values[`Incorrect1_${i}`]}
            onChange={handleInput}
            style={{ outline: "auto", outlineColor:"red" }}
          />
           {changeImg ? (
                <div className="d-inline mx-5">
                    <input type="file" id={`incorrect_image1_${i}`} onChange={handleChange} hidden/>
                    <label htmlFor={`incorrect_image1_${i}`} className="btn btn-unstyled" style={{padding: 0}}> 
                        <img  src={curImg} style={{width: "5rem", height:"5rem"}} alt="..."/>
                    </label>    
                </div>
            ) : (
                <div className="d-inline mx-5">
                    <input type="file" id={`incorrect_image1_${i}`} onChange={handleChange} hidden/>
                    <label htmlFor={`incorrect_image1_${i}`} className="btn btn-unstyled container-fluid  d-inline"> 
                        <img src={curImg} className="card-img-top"  style={{width: "5rem", height:"5rem"}} alt="..."/>
                    </label>    
                </div>
            )}
        </div>
        </div>
      </div>
      <div className="Cont2">
        <div className="Incorrect2 mb-3">
          <label className="form-label">
            <strong>Incorrect Answer #2 :</strong>
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            className="form-control"
            name={`Incorrect2_${i}`}
            value={values[`Incorrect2_${i}`]}
            onChange={handleInput}
            style={{ outline: "auto", outlineColor:"red" }}
          />
          {changeImg ? (
                <div className="d-inline mx-5">
                    <input type="file" id={`incorrect_image2_${i}`} onChange={handleChange} hidden/>
                    <label htmlFor={`incorrect_image2_${i}`} className="btn btn-unstyled" style={{padding: 0}}> 
                        <img  src={curImg} style={{width: "5rem", height:"5rem"}} alt="..."/>
                    </label>    
                </div>
            ) : (
                <div className="d-inline mx-5">
                    <input type="file" id={`incorrect_image2_${i}`} onChange={handleChange} hidden/>
                    <label htmlFor={`incorrect_image2_${i}`} className="btn btn-unstyled container-fluid  d-inline"> 
                        <img src={curImg} className="card-img-top"  style={{width: "5rem", height:"5rem"}} alt="..."/>
                    </label>    
                </div>
            )}
        </div>
        </div>
        <div className="Incorrect3 mb-3">
          <label className="form-label">
            <strong>Incorrect Answer #3 :</strong>
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            className="form-control"
            name={`Incorrect3_${i}`}
            value={values[`Incorrect3_${i}`]}
            onChange={handleInput}
            style={{ outline: "auto", outlineColor:"red" }}
          />
          {changeImg ? (
                <div className="d-inline mx-5">
                    <input type="file" id={`incorrect_image3_${i}`} onChange={handleChange} hidden/>
                    <label htmlFor={`incorrect_image3_${i}`} className="btn btn-unstyled" style={{padding: 0}}> 
                        <img  src={curImg} style={{width: "5rem", height:"5rem"}} alt="..."/>
                    </label>    
                </div>
            ) : (
                <div className="d-inline mx-5">
                    <input type="file" id={`incorrect_image3_${i}`} onChange={handleChange} hidden/>
                    <label htmlFor={`incorrect_image3_${i}`} className="btn btn-unstyled container-fluid  d-inline"> 
                        <img src={curImg} className="card-img-top"  style={{width: "5rem", height:"5rem"}} alt="..."/>
                    </label>    
                </div>
            )}
        </div>
        </div>
      </div>
    </div>
    </>
  );
}



const [openAside, setOpenAside] = useState(false);


  return (
    <div>
        <div>
        <AdminNav
                name={"Jeremy Lemoncito"}
                role={"editor"}
                setOpenAside={setOpenAside}
                openAside={openAside}
            />
            {openAside ? (
                <WithAsidePractice/>
            ):(
    
            <div className="CreateAssessment-form-layout">
              <h1>Test form</h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "15px",
                }}
              >
                <p style={{ paddingTop: "1%", paddingRight: "1%" }}>
                  Add more questions
                </p>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    fontSize: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={addQuestion}
                >
                  +
                </button>
              </div>
              <form onSubmit={handleSubmit}>
              <div className="title mb-3">
                  <label className="form-label">
                    <strong>Title</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={values.title}
                    onChange={handleInput}
                  />
                
                </div>

                <div className="subject mb-3">
                  <label className="form-label">
                    <strong>Subject</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="test_subject"
                    value={values.test_subject}
                    onChange={handleInput}
                  />
                
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Description</strong>
                  </label>
                  <textarea
                    className="form-control"
                    name="Description"
                    value={values.Description}
                    onChange={handleInput}
                  ></textarea>
                  
                </div>

                <div className="Create-Questions">{question}</div>

                <div className="CreateAssessment-SubmitButton">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ fontSize: "18px" }}
                  >
                    Request Publish
                  </button>
                </div>
              </form>
            </div>
            )}
    </div>
    </div>
  )
}

export default create_practice