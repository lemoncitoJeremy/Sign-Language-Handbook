import DataTable from "../table/table";
import "../../style.scss"
import { FilterBar, SearchBar } from "../search/search";
import { useState } from "react";
import FeedbackTable from "../table/feedback_table";


function UserDashboardTable(props: any){
    return (
        <div className="card user-dash">
            <div className="card-header user-dash-header border-0">
                <p className="h3">
                    User Dashboard
                </p>
                <a className="btn btn-unstyled view-all-btn">
                    View All
                </a>
            </div>
            <div className="card-body user-dash-body">
                <DataTable
                    header={props.header}
                    value={props.value}
                />
            </div>
            <div className="card-footer user-dash-footer border-0"></div>
        </div>
    )
}

function ViewCardTable(props: any){
    // The table that would be use and modify
    const [value, setValue] = useState(props.value);

    // Used for saving the original table so that the data would not be lost since
    // Value is being modify constantly
    const [orig_value, setOrigVal] = useState(props.value);


    return (
        <div className="card logs-header">
            <div className="card-header border-0">
                <div className="row">
                    <div className="col">
                        <p className="h3">
                            {props.title}
                        </p>
                    </div>
                    <div className="col col-sm-2">
                        <SearchBar
                            orig_value={orig_value}
                            value={value}
                            setVal={setValue}

                        />
                    </div>
                    <div className="col col-sm-2">
                        <FilterBar
                            orig_value={orig_value}
                            value={value}
                            setVal={setValue}
                        />
                    </div>
                </div>
            </div>
            <div className="card-body logs-body">
                <DataTable
                    header={props.header}
                    value={value}
                />
            </div>
            <div className="card-footer user-dash-footer border-0"></div>
        </div>
    )
}

function FeedbackCardTable(props: any){
    // The table that would be use and modify
    const [value, setValue] = useState(props.value);

    // Used for saving the original table so that the data would not be lost since
    // Value is being modify constantly
    const [orig_value, setOrigVal] = useState(props.value);

    return(
    <div className="card logs-header">
        <div className="card-header border-0">
            <div className="row">
                <div className="col">
                    <p className="h3">
                        {props.title}
                    </p>
                </div>
                <div className="col col-sm-2">
                    <SearchBar
                        orig_value={orig_value}
                        value={value}
                        setVal={setValue}

                    />
                </div>
                <div className="col col-sm-2">
                    <FilterBar
                        orig_value={orig_value}
                        value={value}
                        setVal={setValue}
                    />
                </div>
            </div>
        </div>
        <div className="card-body logs-body">
            <FeedbackTable
                feed={value}
            />           
        </div>
        <div className="card-footer user-dash-footer border-0"></div>
    </div>)
}

export {UserDashboardTable, ViewCardTable, FeedbackCardTable}