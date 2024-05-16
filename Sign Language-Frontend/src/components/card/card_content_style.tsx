

function CardContentStyle(){
    return(
    <>
        <div className="card mt-5">
            <div className="card-header">
                <p className="h4 d-inline">Choose Your Style</p>
                <div className="dropdown d-inline">
                    <button className="btn btn-unstyled dropdown-toggle float-end" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Container Style
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
            </div>
            <div className="card-body">
            </div>
        </div>
    </>)
}

export default CardContentStyle