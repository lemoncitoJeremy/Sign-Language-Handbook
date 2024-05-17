import "../../style.scss"

// Imports

// Icons
import Logo from "../../assets/logo-1@2x.png"
import Home from "../../assets/home@2x.png"
import Dictionary from "../../assets/learn@2x.png"
import Practice from "../../assets/practice@2x.png"
import About from "../../assets/about@2x.png"
import SignIn from "../../assets/logout@2x.png"
import Account from "../../assets/user@2x.png"
import SideBar from "../../assets/sidebar@2x.png"

// Page Popup
import AdminSideBar from "../aside/admin"
import EditorSideBar from "../aside/editor"

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
function AdminNav(props: any){
    
    // Open the Side bar
    const openSideTab = () => {
        props.setOpenAside(!props.openAside);

    }

    return (
        <div className="row g-0">
            {/* SideBar if not click no sidebar would appear,
                if click sidebar will appear */}
            {props.openAside ? (
                <>
                    <div className="col col-md-2 min-vh-100 aside"> 
                    {/* min-vh-100 takes the sidebar and match it with the window size */}
                    {/* Overview of the Features

                        Logo
                        Name of the Admin
                        Privilege

                    */}
                    
                    {
                        props.role == "admin" ?(
                            <AdminSideBar
                              name={props.name}
                            />
                        ):(
                            <EditorSideBar
                                name={props.name}
                            />
                        )
                    }
                </div>
                    <div className="col">
                    <nav className="container-fluid nv-dark admin-nav-cont">
                        <div className="row">
                            <div className="col col-md-1 p-3">
                                {/* Sidebar */}
                                <button type="button" className= "btn" onClick={openSideTab}>
                                    <img className="img-fluid sidebar-logo" src={SideBar}/>
                                </button>
                            </div>
                            <div className="col logo-pos">
                                {/* Logo Title  */}
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
                            </div>

                            {/* Signin, Signup, Logout, and Account */}
                            <div className="col d-flex flex-row-reverse log-pos">
                                <div className="btn-group">
                                    <button type="button" className="btn">
                                    <img className="img-fluid icon-size" src={Account}/>
                                    </button>
                                    <button type="button" className="btn" onClick={onClickNavHomepage}>
                                        <img className="img-fluid icon-size" src={SignIn}/>
                                    </button>      
                        
                                </div>
                            </div>
                            
                        </div>
                    </nav>
                </div>
                </>
            ):(
                    <div className="col">
                    <nav className="container-fluid nv-dark">
                        <div className="row">
                            <div className="col col-md-1 p-3">
                                {/* Sidebar */}
                                <button type="button" className= "btn" onClick={openSideTab}>
                                    <img className="img-fluid sidebar-logo" src={SideBar}/>
                                </button>
                            </div>
                            <div className="col logo-pos">
                                {/* Logo Title  */}
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
                            </div>

                            {/* Signin, Signup, Logout, and Account */}
                            <div className="col d-flex flex-row-reverse log-pos">
                                <div className="btn-group">
                                    <button type="button" className="btn">
                                    <img className="img-fluid icon-size" src={Account}/>
                                    </button>
                                    <button type="button" className="btn" onClick={onClickNavHomepage}>
                                        <img className="img-fluid icon-size" src={SignIn}/>
                                    </button>      
                        
                                </div>
                            </div>
                            
                        </div>
                    </nav>
                </div>
            )}
        </div>
    )
}

export default AdminNav