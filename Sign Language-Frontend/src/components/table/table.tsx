/* 
    Props parameter:
    header - the column names that would be use. It must be pass as an array.
    value - its collection of rows where its an array of dictionary. The dictionary pertains to the row

*/

function DataTable(props: any){
    return(
        <div className="table-responsive-sm">
            <table className="table">
                <thead>
                    <tr>
                        {props.header.map((name: string, index: number) => (
                            <th key={index} className="h5">
                                {name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.value.map((items: {[key: string]: any}, index_col: number) => (
                        <tr key={index_col}>
                            {props.header.map((name: string, index_row: number) => (
                                <td className="pt-3 pb-3" key={index_row}>{items[name]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable;