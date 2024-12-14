// NoAsideDashboard.jsx
import { CircularProgress, LineGraphStats } from "../components/card/card_graph";
import { UserDashboardTable } from "../components/card/card_table";
import "../style.scss";

function NoAsideDashboard(props: any) {
    return (
        <>
            <div className="container mt-5">
                <div className="row mb-4">
                    <div className="col-lg-7 mb-4">
                        <UserDashboardTable title="User Dashboard" header={props.titles} value={props.dictionary} viewAllPath="/admin/account/view" />
                    </div>
                    <div className="col-lg-5 justify-content-center align-items-center">
                        <div className="circular-container-no-aside"> 
                            <CircularProgress score={props.score} max={props.max} />
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-lg-12 mb-4">
                        <UserDashboardTable title="User Feedback" header={props.feedbackTitles} value={props.feedbackDictionary} viewAllPath="/admin/user/feedback" />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-lg-6 mb-4">
                        <LineGraphStats title="Active Users This Month" number={props.countUsers} width={props.width} height={props.height} data={props.userdata} />
                    </div>
                    <div className="col-lg-6 mb-4">
                        <LineGraphStats title="Overall Rating" number={props.overallRating.toFixed(1)} width={props.width} height={props.height} data={props.userdata} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default NoAsideDashboard;
