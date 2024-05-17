import "../../style.scss"
import axios from "axios"
import Signup from "../../assets/signup.png"
import Signin from "../../assets/signIn.png"
import EmailIcon from "../../assets/mail.png"
import UserIcon from "../../assets/user-1@2x.png"
import PassIcon from "../../assets/password@2x.png"
import RecIcon from "../../assets/recovery.png"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useUser } from '../User-Context/UserContext';

function SignComponent(){
    const navigate = useNavigate();
    
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        role: 'VL',
    });

    const handleInput = (event:any) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }
    const { updateUser } = useUser();

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        
        try {
            const emailCheck = await axios.post("http://localhost:5000/signup/checkEmail", { email: values.email });
            if (emailCheck.data.exists) {
                alert("This email is already registered. Please use a different email.");
            } else {
                await axios.post("http://localhost:5000/signup", values);
                alert('Sign up successful');
               
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit_Login = async (event: any) => {
        event.preventDefault();
    
        try {
            const res = await axios.post("http://localhost:5000/login", values);
            if (res.data.status === "success") {
                const myUserData = res.data.data[0];
                const payload = {
                    accountID: myUserData.accountID,
                    username: myUserData.username,
                    email: myUserData.email,
                    role: myUserData.role,
                };
                alert("Login success! Welcome " + payload.username + payload.accountID);
                updateUser(payload)
                navigate('/editor/practice');
            } else {
                alert(res.data);
            }
        } catch (err) {
            console.log(err);
            alert('An error occurred during login.');
        }
    };

    return(
    <>
        <div className="modal fade" id="modalSignInForm">
            <div className="modal-dialog">
                <div className="modal-content sign-form">

                    <div className="modal-header border-0">
                        <img className="img-fluid sign-logo" src={Signin}/>
                        <h4 className="modal-title sign-title">Sign in</h4>
                        <button type="button" className="btn-close sign-exit" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body border-0 sign-content"> 
                        <form className="sign-form" onSubmit={handleSubmit_Login}>
                            <div className="input-group mb-3">
                                <div className="input-group-text bg-light sign-input-icon border-0">
                                    <img className="img-fluid email-icon" src={EmailIcon}/>
                                </div>
                                <input 
                                    type="text" 
                                    name="username" 
                                    className="form-control border-0 bg-light sign-input" 
                                    onChange={handleInput} 
                                    placeholder="Email Address/Username"
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-text bg-light sign-input-icon border-0">
                                    <img className="img-fluid pass-icon" src={PassIcon}/>
                                </div>
                                <input 
                                    type="password" 
                                    name="password" 
                                    className="form-control border-0 bg-light sign-input" 
                                    onChange={handleInput} 
                                    placeholder="Password"
                                />
                            </div>
                            
                            <button type="submit" className="btn sign-submit"> Sign In </button>
                        </form>
                    </div>

                    <div className="modal-footer border-0 sign-footer">
                        <p className="sign-footer-text">
                            I don't have an account.
                        </p>
                        <a className="btn sign-footer-btn" href="#" id="modalSignInForm">
                            Sign Up 
                            <img className="img-fluid sign-footer-icon" src={Signup}/>
                        </a>
                        
                        <p className="sign-footer-text">
                            I forgot my password.
                        </p>
                        <a className="btn sign-footer-btn" href="#" id="modalSignInForm">
                            Recovery
                            <img className="img-fluid sign-footer-icon" src={RecIcon}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="modalSignUpForm">
            <div className="modal-dialog">
                <div className="modal-content sign-form">

                    <div className="modal-header border-0">
                        <img className="img-fluid sign-logo" src={Signup}/>
                        <h4 className="modal-title sign-title">Sign Up</h4>
                        <button type="button" className="btn-close sign-exit" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body border-0 sign-content"> 
                        <form className="sign-form" onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <div className="input-group-text bg-light sign-input-icon border-0">
                                    <img className="img-fluid email-icon" src={EmailIcon}/>
                                </div>
                                <input 
                                    type="text" 
                                    name="email" 
                                    value={values.email} 
                                    className="form-control border-0 bg-light sign-input" 
                                    onChange={handleInput} 
                                    placeholder="Email Address"
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-text bg-light sign-input-icon border-0">
                                    <img className="img-fluid user-icon" src={UserIcon}/>
                                </div>
                                <input 
                                    type="text" 
                                    name="username" 
                                    value={values.username}  
                                    className="form-control border-0 bg-light sign-input" 
                                    onChange={handleInput} 
                                    placeholder="Username"
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-text bg-light sign-input-icon border-0">
                                    <img className="img-fluid pass-icon" src={PassIcon}/>
                                </div>
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={values.password}  
                                    className="form-control border-0 bg-light sign-input" 
                                    onChange={handleInput} 
                                    placeholder="Password"
                                />
                            </div>
                            <input type="hidden" name="role" value={values.role}/>
                            <button type="submit" className="btn sign-submit"> Sign Up </button>
                        </form>
                    </div>

                    <div className="modal-footer border-0 sign-footer">
                        <p className="sign-footer-text">
                            I already have an account.
                        </p>
                        <a className="btn sign-footer-btn" href="#" id="modalSignInForm">
                            Sign In 
                            <img className="img-fluid sign-footer-icon" src={Signin}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default SignComponent
