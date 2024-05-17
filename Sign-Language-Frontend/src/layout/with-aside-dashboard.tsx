import { CircularProgress } from "../components/card/card_graph";
import { UserDashboardTable } from "../components/card/card_table";


function WithAsideDashboard(props: any){
    return(
        <div className="content">
            <div className="row">
                <div className="col-lg-7">
                    <UserDashboardTable
                        header={props.titles}
                        value={props.dictionary}
                    />
                </div>
                <div className="col">
                    <CircularProgress
                        score={props.score}
                        max={props.max}
                    />           
                </div>
            </div>
        </div>
    )
}

export default WithAsideDashboard;