// Icons
import SearchIcon from "../../assets/search@2x.png"
import FilterIcon from "../../assets/filter@2x.png"


function SearchBar(props: any){

    const handleInputChange = (event: any) => {
        const tempArray = [];
        
        /* Automatically Reset the Table */
        if (event.target.value == ""){
            props.setVal(props.orig_value);
            return;
        }

        /* Search on the dictionary and update the table */
        for (let i = 0; i < props.orig_value.length; i++){
            /* Row */
            for (const key in props.orig_value[i]){
                let temp = props.orig_value[i][key];

                /* Incases where the value is a function, lets get the inner text */
                if (typeof(props.orig_value[i][key]) === "object"){
                    temp = props.orig_value[i][key].props.children;
                }

                /* Check if the value matches the target search */
                if (temp.toString().includes(event.target.value)){
                    tempArray.push(props.orig_value[i]);
                    break;
                }
            }
        }
        /* Update the state of the val */
        props.setVal(tempArray);
    }


    return (
        <div className="input-group input-group-sm">
            <img className="input-group-text search-bar" src={SearchIcon}/>
            <input type="text" className="form-control search-bar" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={handleInputChange} placeholder="search"/>
        </div>

    )
}

function FilterBar(props: any){
    const handleInputChange = (event: any) => {
        const tempArray = [];
        
        /* Automatically Reset the Table */
        if (event.target.value == ""){
            props.setVal(props.orig_value);
            return;
        }

        /* Search on the dictionary and update the table */
        for (let i = 0; i < props.orig_value.length; i++){
            /* Row */
            for (const key in props.orig_value[i]){
                let temp = props.orig_value[i][key];

                /* Incases where the value is a function, lets get the inner text */
                if (typeof(props.orig_value[i][key]) === "object"){
                    temp = props.orig_value[i][key].props.children;
                }

                /* Check if the value matches the target search */
                if (temp.toString().includes(event.target.value)){
                    tempArray.push(props.orig_value[i]);
                    break;
                }
            }
        }
        /* Update the state of the val */
        props.setVal(tempArray);
    }


    return (
        <div className="input-group input-group-sm">
            <img className="input-group-text search-bar" src={FilterIcon}/>
            <input type="text" className="form-control search-bar" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={handleInputChange} placeholder="search"/>
        </div>

    )
}

export {SearchBar, FilterBar}   