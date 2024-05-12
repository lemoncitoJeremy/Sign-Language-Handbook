import AddImage from "../../assets/addImage.png"



function CardHandTitle(props: any){

    return(
        <div className="card" style={{width: "18rem"}}>
            <div className="card-header">
                <button className="btn btn-unstyled container-fluid"> 
                    <img src={AddImage} className="card-img-top" alt="..."/>
                </button>
            </div>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}

export default CardHandTitle;