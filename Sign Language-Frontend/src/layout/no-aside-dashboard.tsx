import { CircularProgress, LineGraphStats } from "../components/card/card_graph";
import { UserDashboardTable } from "../components/card/card_table";
import "../style.scss"

function NoAsideDashboard(props: any){
    return(
        <>
        <div className="row ms-4 mt-5">
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
        <div className="row">
            <div className="col mt-5 ms-4">
                <LineGraphStats
                    title="Active Users This Month"
                    number="289"
                    width={props.width}
                    height={props.height}
                    data={props.userdata}
                />
            </div>
            <div className="col">
                
            </div>
            <div className="col">
                
            </div>
        </div>
        </>
    )
}

export default NoAsideDashboard;