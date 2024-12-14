import "../../style.scss";
import Logo from "../../assets/logo-1@2x.png";
import Home from "../../assets/home@2x.png";
import Dictionary from "../../assets/learn@2x.png";
import Practice from "../../assets/practice@2x.png";
import About from "../../assets/about@2x.png";
import SignUp from "../../assets/signup.png";
import SignIn from "../../assets/signIn.png";
import SignOut from "../../assets/logout@2x.png";
import Account from "../../assets/user@2x.png";
import SignForm from "../../components/form/sign-x-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../components/User-Context/UserContext";



function TopNav(props : any) {
    const navigate = useNavigate();
    const { updateUser, userData } = useUser();

    const handleLogout = () => {
        const updatedUserData = {
            ...userData,
            isLoggedIn: false,
            // Check for undefined properties and convert them to string
            accountID: '',
            username: '',
            email: '',
            role: ''
        };
        updateUser(updatedUserData);
        console.log('loggedOut',updatedUserData)
        navigate('/');
    };

    return (
        <nav className="container-fluid nv-dark">
            <div className="row">
                {/* Logo Title  */}
                <div className="col d-flex logo-pos">
                    <button type="button" className="d-inline-flex btn btn-unstyled" onClick={()=>{navigate('/')}}>
                        {/* Image */}
                        <img className="img-fluid logo-size" src={Logo} alt="Logo"/> 
                        {/* Title */}
                        <div className="d-flex-column">
                            <p className="container-fluid h4 text-white mt-3">
                                Sign Language Handbook
                            </p>
                            <p className="text-white title">
                                by atomics
                            </p>
                        </div>
                    </button>
                </div>
                
                {/* Icons Content */}
                <div className="col buttons-pos">
                    {props?.isLoggedIn ? (
                        <>
                            <button type="button" className="btn" onClick={() => navigate('/')}>
                                <img className="icon-size" src={Home} alt="Home"/>
                            </button>
                            <button type="button" className="btn" onClick={() => navigate('/handbook')}>
                                <img className="icon-size" src={Dictionary} alt="Dictionary"/>
                            </button>
                            <button type="button" className="btn" onClick={() => navigate('/practice')}>
                                <img className="icon-size" src={Practice} alt="Practice"/>
                            </button>
                            <button type="button" className="btn" onClick={() => navigate('/feedback')}>
                                <img className="icon-size" src={About} alt="About"/>
                            </button>
                        </>
                    ) : (
                        <>
                            <button type="button" className="btn">
                                <img className="icon-size" src={Home} alt="Home"/>
                            </button>
                            <button type="button" className="btn" onClick={() => navigate('/feedback')}>
                                <img className="icon-size" src={About} alt="About"/>
                            </button>
                        </>
                    )}
                </div>

                {/* Signin, Signup, Logout, and Account */}
                <div className="col d-flex flex-row-reverse log-pos">
                    <div className="btn-group">
                        {props?.isLoggedIn ? (
                            <>
                               
                                <button type="button" className="btn" onClick={handleLogout}>
                                    <img className="img-fluid icon-size" src={SignOut} alt="Logout"/>
                                </button>
                            </>
                        ) : (
                            <>
                                <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#modalSignInForm">
                                    <img className="img-fluid icon-size" src={SignIn} alt="Sign In"/>
                                </button>
                                <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#modalSignUpForm">
                                    <img className="img-fluid icon-size" src={SignUp} alt="Sign Up"/>
                                </button>
                                <SignForm/>    
                            </>
                        )}
                    </div>
                </div>
                
            </div>
        </nav>
    )
}

export default TopNav;
