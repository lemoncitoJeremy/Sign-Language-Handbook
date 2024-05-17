import AddImage from "../../assets/addImage.png"
import TrashCan from "../../assets/editor/delete.png"
import AddPage from "../../assets/editor/addpage.png"
import Handbook from "../../assets/editor/book.png"
import "../../style.scss"
import React, { useEffect, useState } from "react"
import AddPageForm from "../form/add-page-form"
import axios from "axios"


function CardHandbookList(props: any){
    const [cards, setCards] = useState();

        

    return(
        <div className="container-fluid" style={{width: "100%"}}>
            <div className="card border-0">
                <div className="card-header p-3 border-0">
                    <p className="h2 d-inline "> Manage Handbook</p>
                    <button className="float-end card-handbook-list d-inline" data-bs-toggle="modal" data-bs-target="#addPage"> 
                        <img src={AddPage}/>
                        <p className="d-inline ps-2">
                            Add Page
                        </p>
                    </button>
                </div>
                <AddPageForm
                    cards={cards}
                    setCards={setCards}
                />
                <div className="card-body card-list-body">
                    {}
                </div>
            </div>
        </div>
    )
}

function CardDictionaryList(props: any){
    const alphabets = [
        ["A", "B", "C", "D", "E"],
        ["F", "G", "H", "I", "J"],
        ["K", "N", "M", "O", "P"],
        ["Q","R", 'S', "T", "U"],
        ["V", "W", "Y", "X", "Z"]
    ];
    return (
        <>
            {alphabets.map((items)  => (
                <div className="row">
                    {items.map((letter) => (
                        <div className="col">
                            <button className="btn btn-unstyled">
                                <img src={Handbook} className="dictionary-icon d-inline" alt="..."/>
                                <p className="h2 dictionary-n d-inline">{letter}</p>
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}

function CardHandTitle(props: any){
    const [changeImg, setChangeImg] = useState(false);
    const [curImg, setImg] = useState(AddImage);

    function handleChange(e: any) {
        console.log(e.target.files);
        setImg(URL.createObjectURL(e.target.files[0]));
        setChangeImg(true);
    }
 

    return(
        <div className="card border-0 p-0 handbook-container" style={{width: "18rem", height:"21rem"}}>
                {changeImg ?(
                    <div className="container-fluid image-holder" style={{height: "20rem"}}>
                    <input type="file" id="upload-image" onChange={handleChange} hidden/>
                    <label htmlFor="upload-image" className="btn btn-unstyled" style={{padding: 0}}> 
                        <img  src={curImg} style={{width: "100%", height:"100%"}} alt="..."/>
                    </label>    
                    </div>
                ): (
                    <div className="card-header">
                    <input type="file" id="upload-image" onChange={handleChange} hidden/>
                    <label htmlFor="upload-image" className="btn btn-unstyled container-fluid"> 
                        <img src={curImg} className="card-img-top"  style={{width: "5rem", height:"5rem"}} alt="..."/>
                    </label>    
                    </div>
                )}
            <div className="card-body container-fluid">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.desc}</p>
                <button className="btn btn-unstyled float-end">
                    <img src={TrashCan} style={{color: "red", marginTop: -50, paddingTop: "40px"}}/>
                </button>
            </div>
        </div>
    )
}

export {CardHandbookList, CardDictionaryList, CardHandTitle};
