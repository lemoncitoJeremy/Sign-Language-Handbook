import "../../style.scss"

// Important Modules
import { Axios } from "axios"

// Icons

import Signup from "../../assets/signup.png"
import Signin from "../../assets/signIn.png"
import EmailIcon from "../../assets/mail.png"
import UserIcon from "../../assets/user-1@2x.png"
import PassIcon from "../../assets/password@2x.png"
import RecIcon from "../../assets/recovery.png"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


function SignComponent(){
    /* Save the Form to History to be Accessible to All Pages after Redirect */
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [pass, setPassword] = useState();

    const navigate_to_homepage = () => {
        console.log(name)
        navigate("/dashboard", { state:
            {itemId: 1, name: name}
        })
    };

    const userInputChange = (event: { target: { value: any } }) => {
        setName(event.target.value);
    };


    return(
    <>
        <div className="modal fade" id="modalSignInForm">
            <div className="modal-dialog">
                <div className="modal-content sign-form">

                    {/* Modal Header */}
                    <div className="modal-header border-0">
                        <img className="img-fluid sign-logo" src={Signin}/>
                        <h4 className="modal-title sign-title">Sign in</h4>
                        <button type="button" className="btn-close sign-exit" data-bs-dismiss="modal"></button>
                    </div>

                    {/* Modal body */}
                    <div className="modal-body border-0 sign-content"> 
                        <form className="sign-form" onSubmit={navigate_to_homepage}>
                            <div className="input-group mb-3">
                                <div className="input-group-text bg-light sign-input-icon border-0">
                                    <img className="img-fluid email-icon" src={EmailIcon}/>
                                </div>
                                <input type="text" name="name" className="form-control border-0 bg-light sign-input" onChange={userInputChange} placeholder="Email Address/Username"/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-text bg-light sign-input-icon border-0">
                                    <img className="img-fluid pass-icon" src={PassIcon}/>
                                </div>
                                <input type="password" name="password" className="form-control border-0 bg-light sign-input" placeholder="Password"/>
                            </div>
                            
                            <input type="submit" className="btn sign-submit" value="Sign In" data-bs-dismiss="modal"/>
                        </form>
                    </div>

                    {/* Modal footer */}
                    <div className="modal-footer border-0 sign-footer">
                        <p className="sign-footer-text">
                            I don't have an account {"."}
                        </p>
                        <a className="btn sign-footer-btn" href="#" id="modalSignInForm">
                            Sign Up 
                            <img className="img-fluid sign-footer-icon" src={Signup}/>
                        </a>
                        
                        <p className="sign-footer-text">
                            I forgot my password {"."}
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

                    {/* Modal Header */}
                    <div className="modal-header border-0">
                        <img className="img-fluid sign-logo" src={Signup}/>
                        <h4 className="modal-title sign-title">Sign Up</h4>
                        <button type="button" className="btn-close sign-exit" data-bs-dismiss="modal"></button>
                    </div>

                    {/* Modal body */}
                    <div className="modal-body border-0 sign-content"> 
                            <form className="sign-form">
                                <div className="input-group mb-3">
                                    <div className="input-group-text bg-light sign-input-icon border-0">
                                        <img className="img-fluid email-icon" src={EmailIcon}/>
                                    </div>
                                    <input type="text" className="form-control border-0 bg-light sign-input" placeholder="Email Address"/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-text bg-light sign-input-icon border-0">
                                        <img className="img-fluid user-icon" src={UserIcon}/>
                                    </div>
                                    <input type="text" className="form-control border-0 bg-light sign-input" placeholder="Username"/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-text bg-light sign-input-icon border-0">
                                        <img className="img-fluid pass-icon" src={PassIcon}/>
                                    </div>
                                    <input type="password" className="form-control border-0 bg-light sign-input" placeholder="Password"/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-text bg-light sign-input-icon border-0">
                                        <img className="img-fluid pass-icon" src={PassIcon}/>
                                    </div>
                                    <input type="password" className="form-control border-0 bg-light sign-input" placeholder="Confirm Password"/>
                                </div>
                                <button type="button" className="btn sign-submit"> Sign Up </button>
                            </form>
                    </div>


                    {/* Modal footer */}
                    <div className="modal-footer border-0 sign-footer">
                        <p className="sign-footer-text">
                            I already have an account {"."}
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