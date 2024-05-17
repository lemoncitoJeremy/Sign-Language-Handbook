import Logo from "../../assets/logo-1@2x.png"
import Request from "../../assets/editor/request.png"
import Change from "../../assets/editor/change-trans.png"
import Handbook from "../../assets/editor/handbook.png"
import Practice from "../../assets/editor/practice.png"
import Archive from "../../assets/editor/archive.png"
import { Link } from "react-router-dom"


function EditorSideBar(props: any){
    return(
        <div className="d-flex flex-column bd-highlight mb-3 side-admin-bar">
            {/* Logo */}
            <div className="d-inline-flex">
                <img className="img-fluid logo-admin-size" src={Logo}/>
                <p className="container-fluid h1 text-white mt-3 logo-title-admin">
                    Atomic
                </p>                            
            </div>
            {/* Name of Admin */}
            <div className="container-fluid">
                <p className="h4 role-title-nav">
                    {props.name}
                </p>
            </div>
            {/* Privilege */}
            <div className="list-group">
                <div className="d-inline-flex admin-icons list-group-item border-0">                        
                    <img className="img-fluid" style={{height:"50%", width:"15%", margin:"9px 3px 5px 0px"}} src={Request}/>
                    <div className="d-flex-column list-of-name">
                        <button type="button" className="btn btn-btn-unstyled admin-name-icons">Request Publish</button>
                    </div>
                </div>
                <div className="d-inline-flex admin-icons list-group-item border-0">                        
                    <img className="img-fluid" src={Change} style={{height:"70%", width:"15%", margin:"5px 3px 5px 0px"}}/>
                    <div className="d-flex-column list-of-name">
                        <p className="admin-name-icons">Change Translator Model</p>
                    </div>
                </div>
                <div className="d-inline-flex admin-icons list-group-item border-0">                        
                    <img className="img-fluid" src={Handbook} style={{height:"60%", width:"15%", margin:"5px 3px 5px 0px"}}/>
                    <div className="d-flex-column list-of-name">
                       <a className="admin-name-icons" href='/editor/practice' style={{ textDecoration: 'none' }}>Manage Handbook</a>
                       
                    </div>
                </div>
                <div className="d-inline-flex admin-icons list-group-item border-0">                        
                    <img className="img-fluid" src={Practice} style={{height:"60%", width:"15%", margin:"5px 3px 5px 0px"}}/>
                    <div className="d-flex-column list-of-name">
                        <a className="admin-name-icons" href='/editor/practice' style={{ textDecoration: 'none' }}>Manage Practice</a><br/>
                        <a className="admin-name-sub-icons" href='/editor/practice/create_practice' style={{ textDecoration: 'none' }}>create practice</a>
                    </div>
                </div>
                <div className="d-inline-flex admin-icons list-group-item border-0">                        
                    <img className="img-fluid" src={Archive} style={{height:"27%", width:"15%", margin:"5px 3px 5px 0px"}}/>
                    <div className="d-flex-column list-of-name">
                        <p className="admin-name-icons">Archive</p>
                        <p className="admin-name-sub-icons">Handbook</p>
                        <p className="admin-name-sub-icons">Practice</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditorSideBar;