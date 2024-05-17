import "../../style.scss"

// Imports

// Icons
import Logo from "../../assets/logo-1@2x.png"
import Home from "../../assets/home@2x.png"
import Dictionary from "../../assets/learn@2x.png"
import Practice from "../../assets/practice@2x.png"
import About from "../../assets/about@2x.png"
import SignUp from "../../assets/signup.png"
import SignIn from "../../assets/logout@2x.png"
import Account from "../../assets/user@2x.png"

// Page Popup
import SignForm from "../../components/form/sign-x-form"
import { useNavigate } from "react-router-dom"

// Pages Event Navigation
// Non Login Homepage
function onClickNavHomepage(navigate: any){
    navigate('/')
}

// User Login Homepage
function onClickNavUserHomepage(navigate: any){

    navigate('/user')
}

function onClickNavLearn(navigate: any){
    navigate('/learn')
}


function onClickNavPractice(navigate: any){
    navigate('/practice')
}


function onClickNavAbout(navigate: any){
    navigate('/about')
}

// Navigation
function TopNav(props: any){
    /* Use to Pass Data from Redirection */
    const navigate = useNavigate()


    return (
        <nav className="container-fluid nv-dark">
            <div className="row">

                {/* Logo Title  */}
                <div className="col d-flex logo-pos">
                    <button type="button" className="d-inline-flex btn btn-unstyled" onClick={() => onClickNavHomepage(props.navigate)}>
                        {/* Image */}
                        <img className="img-fluid logo-size" src={Logo}/> 
                        {/* Title */}
                        <div className="d-flex-column">
                            <p className="container-fluid h4 text-white mt-3">
                                Sign Language Handbook
                            </p>
                            <p className="text-white title">
                                by atomic
                            </p>
                        </div>
                    </button>
                </div>
                
                {/* Icons Content */}
                <div className="col buttons-pos">
                    {props.isLoggedIn ? (
                        <>
                        <button type="button" className="btn">
                            <img className="icon-size" src={Home}/>
                        </button>
                        <button type="button" className="btn">
                            <img className="icon-size" src={Dictionary}/>
                        </button>
                        <button type="button" className="btn">
                            <img className="icon-size" src={Practice}/>
                        </button>
                        <button type="button" className="btn">
                            <img className="icon-size" src={About}/>
                        </button>
                        </>
                    ): (
                        <>
                        <button type="button" className="btn">
                            <img className="icon-size" src={Home}/>
                        </button>
                        <button type="button" className="btn">
                            <img className="icon-size" src={About}/>
                        </button>
                        </>
                    )}
                </div>

                {/* Signin, Signup, Logout, and Account */}
                <div className="col d-flex flex-row-reverse log-pos">
                    <div className="btn-group">
                        {/* Icon already Login */ }
                        {props.isLoggedIn ? (
                            <>
                            <button type="button" className="btn">
                            <img className="img-fluid icon-size" src={Account}/>
                            </button>
                            <button type="button" className="btn" onClick={onClickNavHomepage}>
                                <img className="img-fluid icon-size" src={SignIn}/>
                            </button>      
                            </>
                        ): ( /* Icon for Not Login Yet */
                            <>
                            {/* Login Popup */}
                            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#modalSignInForm">
                                <img className="img-fluid icon-size" src={SignIn}/>
                            </button>

                            {/* Signin Popup */}
                            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#modalSignUpForm">
                                <img className="img-fluid icon-size" src={SignUp}/>
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

export default TopNav   