import { CircularProgress, LineGraphStats } from "../components/card/card_graph";
import { CardDictionaryList } from "../components/card/card_handbook_page";
import { UserDashboardTable } from "../components/card/card_table";
import "../style.scss"

function NoAsideDictionary(props: any){
    return(
        <>
            <div className="row ms-4 mt-5">
                <div className="col">
                    <CardDictionaryList/>
                </div>
            </div>
        </>
    )
}

export default NoAsideDictionary;