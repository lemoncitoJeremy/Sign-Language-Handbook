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
        isLoggedIn: true
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
                    isLoggedIn: true,
                };
                alert("Login success! Welcome " + payload.username + payload.accountID);
                console.log('payload:', payload)
                
                updateUser(payload)
                navigate('/');
            } else {
                alert(res.data);
            }
        } catch (err) {
            console.log(err);
            alert('An error occurred during login.');
        }
    };

    //Input Email For Recovery -------------------------------------------------
    const [email, setEmail] = useState('');
    const [emailFormatError, setEmailFormatError] = useState(false);
    const [emailNotFoundError, setEmailNotFoundError] = useState(false);
    
    const [proceed,setProceed] = useState(false);
    const handleSubmitRecovery = async (e : any) => {
        e.preventDefault();
    
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailFormatError(true);
            alert('Please enter a valid email address.');
            return;
        }
    
        try {
            // Check if the email is registered
            const checkEmailResponse = await axios.post('http://localhost:5000/CheckEmail', { EmailAcc: email });
    
            if (checkEmailResponse.data === 'exists') {
                // Email is registered, proceed with OTP sending
                const otpResponse = await axios.post('http://localhost:5000/sendOTP', { email: email });
    
                if (otpResponse.data.status === 'success') {
                    // OTP sent successfully, set state to show OtpVerification
                    //setShowOtpVerification(true);
                    //set show modal OTP form here
                    setProceed(true)
                    alert('OTP is sent to your email')
                } else {
                    // Handle OTP sending failure
                    alert('Error sending OTP. Please try again.');
                }
            } else {
                // Email is not registered
                setEmailNotFoundError(true);
                alert('This email is not registered. Please enter a registered email.');
            }
        } catch (error) {
            console.error('Error during email and OTP verification:', error);
            alert('Error during email and OTP verification. Please try again.');
        }
    };


    //Input Received OTP for recovery

    const [Verification_Code, setVerification_Code] = useState('');
    const [isOtpCorrect, setIsOtpCorrect] = useState(false);
    const [showResetPassword, setshowResetPassword] = useState(false);
    
    const [I_proceed,I_setProceed] = useState(false);
    
    
    const handleSubmitOTP = async (e: any) => {
        e.preventDefault();

        if (Verification_Code.trim() === '') {
            // Don't proceed if the OTP is not entered
            return;
        }

        try {
            // Check if the entered OTP is correct
            const response = await axios.post('http://localhost:5000/VerifyOTP', {
                email: email,  // Access the email prop
                otp: Verification_Code,
            });

            console.log('VerifyOTP Response:', response.data);

            if (response.data === 'success') {
                // OTP verification successful
                setshowResetPassword(true);
                I_setProceed(true);
                alert("OTP successfully verified")
            } else {
                // OTP verification failed
                setIsOtpCorrect(false);
            }
        } catch (error) {
            console.error('Error during OTP verification:', error);
        }
    };

    const isFormValid = Verification_Code.trim() !== '';

    //---------------------------RESET PASSWORD-=----------------------

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [resetError, setResetError] = useState('');
    const [loading, setLoading] = useState(false);

    const validatePassword = () => {
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError('');
        }
    };

    const validateConfirmPassword = () => {
        if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSubmitReset = async (e : any ) => {
        e.preventDefault();
    
        // Validate password and confirm password
        validatePassword();
        validateConfirmPassword();
    
        // Check if there are any validation errors
        if (passwordError || confirmPasswordError) {
            console.log('Form has errors. Please fix them before submitting.');
            return;
        }
    
        setLoading(true);
    
        try {
            // Send user data and new password to the server for password reset
            const resetPasswordResponse = await axios.post('http://localhost:5000/ResetPassword', {
                EmailAcc: email,
                NewPassword: password,
            });
    
            console.log('Reset Password Response:', resetPasswordResponse.data);
    
            if (resetPasswordResponse.data.status === 'success') {
                // Password reset successful
                console.log('Password reset successful');
                // Redirect to the login page
                console.log(email);
                alert("Password changed successfully");
                navigate("/")
            } else {
                // Password reset failed
                console.log('Password reset failed');
                alert('Password reset failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during password reset:', error);
            alert('Error during password reset. Please try again later.');
        } finally {
            setLoading(false);
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
                        <a className="btn sign-footer-btn" href="#" data-bs-toggle="modal" data-bs-target="#modalSignUpForm">
                            Sign Up 
                            <img className="img-fluid sign-footer-icon" src={Signup}/>
                        </a>
                        
                        <p className="sign-footer-text">
                            I forgot my password.
                        </p>
                        <a type="button" className="btn" data-bs-toggle="modal" data-bs-target="#modalRecoveryForm">
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


        <div className="modal fade" id="modalRecoveryForm">
            <div className="modal-dialog">
                <div className="modal-content sign-form">

                    <div className="modal-header border-0">
                        <img className="img-fluid sign-logo" src={Signin}/>
                        <h5 className="modal-title sign-title">Recover Account</h5>
                        <button type="button" className="btn-close sign-exit" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body border-0 sign-content"> 
                        <form className="sign-form" onSubmit={handleSubmitRecovery}>
                            <div className="input-group mb-3">
                                <div className="input-group-text bg-light sign-input-icon border-0">
                                    <img className="img-fluid email-icon" src={EmailIcon}/>
                                </div>
                                <input 
                                    type="text" 
                                    name="username" 
                                    className="form-control border-0 bg-light sign-input" 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="Email Address"
                                />
                            </div>
                            <button type="submit" className="btn sign-submit" style={{display:'flex',justifyContent:'center',alignItems:'center'}}> Send OTP </button>
                        </form>
                        {proceed && (
                                <button type="submit" className="btn sign-submit" data-bs-toggle="modal" data-bs-target="#modalVerifyOTPForm">
                                Proceed
                                </button>
                            )}
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="modalVerifyOTPForm">
            <div className="modal-dialog">
                <div className="modal-content sign-form">

                    <div className="modal-header border-0">
                        <img className="img-fluid sign-logo" src={Signin}/>
                        <h5 className="modal-title sign-title">OTP Verification</h5>
                        <button type="button" className="btn-close sign-exit" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body border-0 sign-content"> 
                        <form className="sign-form" onSubmit={handleSubmitOTP}>
                            <div className="input-group mb-3">
                                <div className="input-group-text bg-light sign-input-icon border-0">
                                    <img className="img-fluid email-icon" src={EmailIcon}/>
                                </div>
                                <input 
                                    type="text" 
                                    name="username" 
                                    className="form-control border-0 bg-light sign-input" 
                                    onChange={(e) => setVerification_Code(e.target.value)} 
                                    placeholder="Enter OTP"
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="btn sign-submit" 
                                disabled={!isFormValid} 
                                style={{display:'flex',justifyContent:'center',alignItems:'center'}}
                            > 
                                Verify OTP 
                            </button>
                            {I_proceed && (
                                <button 
                                    type="button" 
                                    className="btn sign-submit" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#modalResetForm"
                                >
                                    Proceed
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <div className="modal fade" id="modalResetForm">
            <div className="modal-dialog">
                <div className="modal-content sign-form">

                    <div className="modal-header border-0">
                        <img className="img-fluid sign-logo" src={Signin}/>
                        <h5 className="modal-title sign-title">Reset Password</h5>
                        <button type="button" className="btn-close sign-exit" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body border-0 sign-content"> 
                        <form className="sign-form" onSubmit={handleSubmitReset}>
                            <div className="input-group mb-3">
                                <div className="input-group-text bg-light sign-input-icon border-0">
                                    <img className="img-fluid email-icon" src={EmailIcon}/>
                                </div>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={validatePassword}
                                    type={showPassword ? "text" : "text"}
                                    placeholder="Enter 6 Characters or more"
                                    id="password"
                                    name="Password"
                                    className="form-control"
                                />
                                {passwordError && <div className="error-message">{passwordError}</div>}
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-text bg-light sign-input-icon border-0">
                                    <img className="img-fluid email-icon" src={EmailIcon}/>
                                </div>
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onBlur={validateConfirmPassword}
                                    type="password "
                                    placeholder="Enter 6 Characters or more"
                                    id="confirmPassword"
                                    name="ConfirmPassword"
                                    className="form-control"
                                />
                                {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
                            </div>
                            {resetError && <div className="error-message">{resetError}</div>}
                            <button className="btn sign-submit" type="submit" disabled={loading}>
                            {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default SignComponent
