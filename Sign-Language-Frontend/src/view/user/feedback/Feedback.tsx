import { ViewCardTable } from "../../../components/card/card_table"
import "./Feedback.css";
import starFilledImage from "../../../assets/star-filled.png";
import starImage from "../../../assets/star.png";
import axios from "axios";
import AdminNav from "../../../components/navigation/admin_nav";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TopNav from "../../../components/navigation/user_nav"
import Footer from "../../../components/footer/footer"
import { useUser } from "../../../components/User-Context/UserContext";
function Feedback(props: any){
    const location = useLocation();

    const [openAside, setOpenAside] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [feedback, setFeedback] = useState<string>("");
    const maxCharacters: number = 300;
    const [emailError, setEmailError] = useState<string>("");
    const [starRating, setStarRating] = useState<number>(0);
    const navigate = useNavigate();

    function onClickSubmitFeedback(navigate: any){
      navigate('/')
  }
    
      const emailIsValid = (email: string): boolean => {
        const emailPattern: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
      };
    
      const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= maxCharacters) {
          setFeedback(e.target.value);
        }
      };
    
      const characterCount: number = feedback.length;
    
      const handleStarClick = (clickedRating: number) => {
        setStarRating(clickedRating);
      };
    
      const isFormValid: boolean =
        emailIsValid(email) && feedback.trim() !== "" && starRating > 0;
    
      const checkEmailAndSubmit = async () => {
        try {
          // Check if the email is registered
          const checkEmailResponse = await axios.post("http://localhost:5000/CheckEmail", {
            email: email,
          });
    
          if (checkEmailResponse.data === "exists") {
            submitFeedbackToDatabase(); 
            navigate('/');
          } else {
            // Email is not registered
            alert("This email is not registered. Please enter a registered email.");
          }
        } catch (error: any) {
            console.error("Error checking email:", error.message);
          
            if (error.response && error.response.status === 400) {
              // Invalid email format
              setEmailError("Please enter a valid email address.");
              alert("Error: " + emailError);
            } 
          }
      };
    
      const submitFeedbackToDatabase = async () => {
        try {
          // Insert feedback into the database
          await axios.post("http://localhost:5000/SubmitFeedback", {
            email: email,
            description: feedback,
            starRating: starRating,
          });
          alert("Feedback submitted successfully!");
        } catch (error: any) {
          console.error("Error submitting feedback:", error.message);
          alert("Error submitting feedback. Please try again.");
        }
      };
    
      const handleSubmit = () => {
        // Check if all required fields are filled out
        if (!email || !feedback || starRating === 0) {
          alert("Please fill out all required fields");
          return;
        }
    
        // Check if the form is valid
        if (isFormValid) {
          // Check email and submit only if the form is valid
          checkEmailAndSubmit();
        } else {
          alert("Please fill out all fields correctly.");
        }
      };
 

      const {userData} = useUser();
    return (<>
        <TopNav
            isLoggedIn={userData?.isLoggedIn}
            setOpenAside={setOpenAside}
            openAside={openAside}
        />
        <div className="feedback-container">
      <div className="feedback-auth-form-container">
        <div className="feedback-Title-label">Feedback Form</div>
        <form className="feedback-login-form">
          <label htmlFor="email">Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
            id="email"
            name="Email"
            className="emailfield"
          />
          {emailError && <div className="error-message">{emailError}</div>}
          <label htmlFor="feedback">Tell us more:</label>
          <div className="feedback-input-container">
            <input
              value={feedback}
              onChange={handleFeedbackChange}
              type="text"
              placeholder="What's your feedback?"
              id="feedback"
              name="Feedback"
              className="feedbackfield"
            />
            <div className="character-counter">
              {characterCount}/{maxCharacters}
            </div>
          </div>
          <div className="star-rating">
            <label>How would you rate us?</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <img
                  key={star}
                  src={star <= starRating ? starFilledImage : starImage}
                  alt={`Star ${star}`}
                  onClick={() => handleStarClick(star)}
                  style={{
                    width: "43px",
                    height: "43px",
                    cursor: "pointer",
                    marginLeft: "40px",
                   
                  }}
                />
              ))}
            </div>
          </div>
          <hr className="border-line" />

          <button type="button" onClick={handleSubmit} className="button-submit">
            SUBMIT
          </button>

          <button onClick={() => navigate('/')} className="button-back">
            BACK
          </button>
          
        </form>
        
      </div>
    </div>
    <Footer/>

    </>)
}

export default Feedback