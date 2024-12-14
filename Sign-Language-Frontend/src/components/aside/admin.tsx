import Logo from "../../assets/logo-1@2x.png"
import DashboardIcon from "../../assets/dashboard.png"
import ManageUser from "../../assets/user-2@2x.png"


function AdminSideBar(props: any){
    return(
        <div className="d-flex flex-column bd-highlight mb-3 side-admin-bar" >
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
                    <img className="img-fluid" style={{height:"25%", width:"30%", margin:"9px 3px 5px 0px"}} src={DashboardIcon}/>
                    <div className="d-flex-column list-of-name">
                        <button type="button" className="btn btn-btn-unstyled admin-name-icons">Dashboard</button>
                        <button type="button" className="btn btn-btn-unstyled admin-name-sub-icons">User Performance</button>
                        <button type="button" className="btn btn-btn-unstyled admin-name-sub-icons">User Test Score</button>
                        <button type="button" className="btn btn-btn-unstyled admin-name-sub-icons">User Feedbacks</button>
                    </div>
                </div>
                <div className="d-inline-flex admin-icons list-group-item border-0">                        
                    <img className="img-fluid" src={ManageUser} style={{height:"30%", width:"15%", margin:"5px 3px 5px 0px"}}/>
                    <div className="d-flex-column list-of-name">
                        <p className="admin-name-icons">Account View</p>
                        <p className="admin-name-sub-icons">Logs</p>
                        <p className="admin-name-sub-icons">Archive</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSideBar;