import { useState } from "react";
import AddImage from "../../assets/addImage.png"
import Score from "../../assets/editor/score.png"
import Retake from "../../assets/editor/retake.png"

function PracticeCard(props: any){
    const [changeImg, setChangeImg] = useState(false);
    const [curImg, setImg] = useState(AddImage);


    function handleChange(e: any) {
        console.log(e.target.files);
        setImg(URL.createObjectURL(e.target.files[0]));
        setChangeImg(true);
    }
    
    return(
        <div className="card practice-container mx-5">
            <div className="card-body bg-light d-flex">
                {changeImg ?(
                    <div className="d-inline mx-5">
                    <input type="file" id="upload-image" onChange={handleChange} hidden/>
                    <label htmlFor="upload-image" className="btn btn-unstyled" style={{padding: 0}}> 
                        <img  src={curImg} style={{width: "5rem", height:"5rem"}} alt="..."/>
                    </label>    
                    </div>
                ): (
                    <div className="d-inline mx-5">
                    <input type="file" id="upload-image" onChange={handleChange} hidden/>
                    <label htmlFor="upload-image" className="btn btn-unstyled container-fluid  d-inline"> 
                        <img src={curImg} className="card-img-top"  style={{width: "5rem", height:"5rem"}} alt="..."/>
                    </label>    
                    </div>
                )}
                <div className="d-inline">
                    <p className="h4">{props.name}</p>
                    <p className="">{props.desc}</p>
                </div>
                <div className="" style={{ paddingLeft:"35%"}}>
                    <button className="btn btn-unstyled px-4 ps-4 ms-5" style={{backgroundColor:"#CDCBCE"}}>
                        <img src={Score} className="d-inline"/>
                        <p className="d-inline ms-2" style={{color: "white", fontWeight: "bold"}}>{props.score}</p>
                    </button>
                    <button className="btn btn-unstyled ms-3" style={{backgroundColor:"#B6B4B7"}}>
                        <img src={Retake} className="d-inline"/>
                        <p className="d-inline ms-2" style={{color: "white", fontWeight: "bold"}}>Retake</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export {PracticeCard};
