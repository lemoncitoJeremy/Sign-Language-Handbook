import { useState } from "react";
import AddImage from "../assets/addImage.png"

function NoAsideContent(props: any){
    const [changeImg, setChangeImg] = useState(false);
    const [curImg, setImg] = useState(AddImage);


    function handleChange(e: any) {
        console.log(e.target.files);
        setImg(URL.createObjectURL(e.target.files[0]));
        setChangeImg(true);
    }
    
    return(
        <div className="container-fluid">
        <div className="home-content">
            <div className="row">
                <div className="col home-info">
                    <p className="h1 home-title"> Unlock a World of <br/>Communication:<br/> Welcome</p>
                    <p className="home-desc">Welcome to the Sign Language Handbook - 
                    your gateway to mastering sign language with ease! 
                    Our innovative features, including real-time hand gesture translation 
                    through camera analysis and interactive quizzes, make learning sign 
                    language engaging and fun. Explore our comprehensive content, 
                    from detailed descriptions of hand gestures to customizable language settings. 
                    Whether you're a beginner or an experienced signer, 
                    our website is your ultimate companion on your sign language journey. 
                    Join us today and start communicating in a whole new way!</p>
                </div>  
                <div className="col home-info">
                {changeImg ?(
                    <button className="btn btn-unstyled" style={{width: "40rem", paddingTop: "1px", height: "30rem", marginTop:"100px"}}>
                        <input type="file" id="upload-image" onChange={handleChange} hidden/>
                        <label htmlFor="upload-image" className="btn btn-unstyled" style={{padding: 0}}> 
                        <img src={curImg} className="img-fluid" style={{width: "40rem"}}/>
                        </label>
                    </button>):(
                        <button className="btn btn-unstyled" style={{width: "40rem", paddingTop: "1px", height: "30rem", marginTop:"100px"}}>
                            <input type="file" id="upload-image" onChange={handleChange} hidden/>
                            <label htmlFor="upload-image" className="btn btn-unstyled" style={{padding: 0}}> 
                            <img src={curImg} className="img-fluid" style={{width: "10rem"}}/>
                            </label>
                        </button>
                    )
                }
                </div>
            </div>
            <div className="row">
            </div>

        </div>
        </div>
    )
}

export default NoAsideContent;