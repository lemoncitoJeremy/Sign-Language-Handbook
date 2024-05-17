import {CardHandbookList} from "../components/card/card_handbook_page";
import "../style.scss"

function NoAsideHandbook(props: any){
    return(
        <>
        <div className="row">
            <div className="col">
                <CardHandbookList/>
            </div>
        </div>
        </>
    )
}

export default NoAsideHandbook;