import { CardDictionaryList, CardHandbookList } from "../components/card/card_handbook_page";
import { FeedbackCardTable } from "../components/card/card_table";


function WithAsideFeedback(props: any){
    const arr = [
        {"name": "jordan", "rating": 5, "date": "2021-09-14", "msg": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +  
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' + 
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' +
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {"name": "Test", "rating": 5, "date": "2021-09-14", "msg": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +  
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' + 
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' +
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    ]
    
    return(
        <div className="row" style={{paddingLeft: "300px"}}>
            <div className="col">
                <FeedbackCardTable
                    value={arr}
                />
            </div>
        </div>
    )
}

export default WithAsideFeedback;