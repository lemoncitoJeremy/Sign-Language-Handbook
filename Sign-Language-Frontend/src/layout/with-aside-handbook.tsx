import {CardHandbookList} from "../components/card/card_handbook_page";


function WithAsideHandbook(props: any){
    return(
        <div className="content">
            <div className="row">
                <div className="col">
                    <CardHandbookList/>
                </div>
            </div>
        </div>
    )
}

export default WithAsideHandbook;