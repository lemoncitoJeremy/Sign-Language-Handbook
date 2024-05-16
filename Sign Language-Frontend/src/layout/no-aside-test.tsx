import { useState } from "react";
import AddImage from "../assets/addImage.png"


function NoAsideTest(props: any){
    const [changeImg, setChangeImg] = useState(false);
    const [curImg, setImg] = useState(AddImage);

    function handleChange(e: any) {
        console.log(e.target.files);
        setImg(URL.createObjectURL(e.target.files[0]));
        setChangeImg(true);
    }
    
    return(
        <>
            <div className="row">
                <div className="col-lg-6">
                    {changeImg ?(
                        <div className="d-inline">
                        <input type="file" id="upload-image" onChange={handleChange} hidden/>
                        <label htmlFor="upload-image" className="btn btn-unstyled" style={{padding: 0}}> 
                            <img  src={curImg} style={{width: "5rem", height:"5rem"}} alt="..."/>
                        </label>    
                        </div>
                    ): (
                        <div className="d-inline" style={{marginLeft: "140px", marginTop: "10px"}}>
                        <input type="file" id="upload-image" onChange={handleChange} hidden/>
                        <label htmlFor="upload-image" className="btn btn-unstyled " style={{paddingTop: "150px", paddingLeft: "250px"}}> 
                            <img src={curImg} className="card-img-top"  style={{width: "10rem", height:"10rem"}} alt="..."/>
                        </label>    
                        </div>
                    )}
                </div>
                <div className="col">
                    <p className="h1" style={{paddingTop:"200px"}}>Fingerspelling Practice</p>        
                </div>
            </div>
        </>
    )
}

export default NoAsideTest;