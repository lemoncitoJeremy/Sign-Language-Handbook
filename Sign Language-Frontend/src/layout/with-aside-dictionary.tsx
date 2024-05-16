import { CardDictionaryList, CardHandbookList } from "../components/card/card_handbook_page";


function WithAsideDictionary(props: any){
    return(
        <div className="row dictionary">
            <div className="col">
                <CardDictionaryList/>
            </div>
        </div>
    )
}

export default WithAsideDictionary;