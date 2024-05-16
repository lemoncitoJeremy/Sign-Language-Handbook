import "../../style.scss"
import AddImage from "../../assets/addImage.png"
import Check from "../../assets/editor/check.png"
import Wrong from "../../assets/editor/wrong.png"


function ProblemTable(props: any){
    return(
        <div className="card mx-5 ms-5 w-50" style={{height:"24rem"}}>
            <div className="card-header">
                <p style={{textAlign: "center"}}> What type of objects you find difficult to lift due to weight</p>
            </div>
            <div className="card-body p-3">
                <div className="row questions">
                    <div className="col">
                        <p className="h4"> Heavy </p>
                    </div>
                    <div className="col">
                        <button className="btn btn-unstyled">
                            <img src={AddImage} alt="" />
                        </button>
                    </div>
                    <div className="col">
                        <button className="btn btn-unstyled">
                            <img src={Check} className="mx-4" alt="" />
                        </button>
                        <button className="btn btn-unstyled">
                            <img src={Wrong} alt="" />
                        </button>
                    </div>
                </div>
                <div className="row questions">
                    <div className="col">
                        <p className="h4"> Tall </p>
                    </div>
                    <div className="col">
                        <button className="btn btn-unstyled">
                            <img src={AddImage} alt="" />
                        </button>
                    </div>
                    <div className="col">
                        <button className="btn btn-unstyled">
                            <img src={Check} className="mx-4" alt="" />
                        </button>
                        <button className="btn btn-unstyled">
                            <img src={Wrong} alt="" />
                        </button>
                    </div>
                </div>
                <div className="row questions">
                    <div className="col">
                        <p className="h4"> Curve </p>
                    </div>
                    <div className="col">
                        <button className="btn btn-unstyled">
                            <img src={AddImage} alt="" />
                        </button>
                    </div>
                    <div className="col">
                        <button className="btn btn-unstyled">
                            <img src={Check} className="mx-4" alt="" />
                        </button>
                        <button className="btn btn-unstyled">
                            <img src={Wrong} alt="" />
                        </button>
                    </div>
                </div>
                <div className="row questions">
                    <div className="col">
                        <p className="h4"> Short </p>
                    </div>
                    <div className="col">
                        <button className="btn btn-unstyled">
                            <img src={AddImage} alt="" />
                        </button>
                    </div>
                    <div className="col">
                        <button className="btn btn-unstyled">
                            <img src={Check} className="mx-4" alt="" />
                        </button>
                        <button className="btn btn-unstyled">
                            <img src={Wrong} alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProblemTable;