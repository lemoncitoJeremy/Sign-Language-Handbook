import { status_check } from "../utilities/color-coding";
import TrashCan from "../../assets/editor/delete.png"

function CardReview(props: any){
    return(
        <>
            <div className="card feedback-card">
                <div className="card-header border-0 request-table-header">
                    <p className="h4 d-inline">{props.name}</p>
                    <p className="h4 float-end d-inline">{props.title}</p>
                </div>
                <div className="card-body p-4">
                    <p className="h4">{status_check(props.status)}</p>
                    <p className="h5 d-flex d-inline date">{props.date}</p>
                    <p className='feedback-message'>
                        {props.msg}
                    </p>
                    <button className="btn btn-unstyled float-end">
                        <img src={TrashCan} style={{color: "red", marginTop: -50, paddingTop: "40px", width: "30px"}}/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default CardReview;