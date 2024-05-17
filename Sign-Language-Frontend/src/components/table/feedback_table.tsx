/* 
    Props parameter:
    header - the column names that would be use. It must be pass as an array.
    value - its collection of rows where its an array of dictionary. The dictionary pertains to the row

*/

import FeedbackCard from "../card/card-view-feedback";
import DownloadIcon from "../../assets/expert/download.png"

function FeedbackTable(props: any){
    return(
        <div className="row">
            <div className="col">
                <ul>
                {props.feed.map((items: {[key: string]: any}, index_col: number) =>(
                    <li key={index_col}>
                        <FeedbackCard
                            name= {items["name"]}
                            date= {items["date"]}
                            rating={5}
                            msg={items["msg"]}
                        />
                    </li>
                ))}
                </ul>
            </div>
            <div className="col-md-2">
                <button className="btn btn-unstyled container-fluid d-flex px-5 pt-2 ps-2 mt-4 mx-2 float-center" style={{backgroundColor: "#1CC7A4", color:"white", fontWeight:"bold", borderRadius: "15px", width:"90%"}}>
                    <img src={DownloadIcon} style={{height: "35px", marginRight: "30px"}} className="container-fluid"/>
                    <p className="mt-2 float-start" style={{fontSize: "18px", marginBottom:"10px"}}>Download</p>
                </button>    
            </div>
        </div>
    )
}

export default FeedbackTable;