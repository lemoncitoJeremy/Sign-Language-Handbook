import CardReview from "../components/card/card_view_request";


function WithAsideRequestPublish(props: any){
    const arr = [
        {"name": "jordan", "title": "test", "status": "Under Review", "date": "2021-09-14", "msg": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +  
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' + 
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' +
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {"name": "Test", "title": "test", "status": "Under Review", "date": "2021-09-14", "msg": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +  
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' + 
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' +
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    ]
    
    return(
        <div className="row" style={{paddingLeft: "300px"}}>
            <div className="col">
                <CardReview
                    name={arr[0].name}
                    date={arr[0].date}
                    msg={arr[0].msg}
                />
            </div>
        </div>
    )
}

export default WithAsideRequestPublish;