import { useState } from "react";
import "../../style.scss"
import CardContentStyle from "../card/card_content_style";
import { CardHandTitle } from "../card/card_handbook_page";

function AddPageForm(props: any){
    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()

    const handleTitle = (event: any) => {
        setTitle(event.target.value)
    }

    const handleDesc = (event: any) => {
        setDesc(event.target.value)
    }

    const createCard = () =>{
        const arr = props.cards;
        const size = props.cards[props.cards.length-1].length;
        console.log(size);
        if (size == 4){
            arr.push([]);
        }
        arr[arr.length-1].push(
        <CardHandTitle
            title={title}
            desc={desc}
        />)
        props.setCards(arr);
    }

    return(
        <div className="modal fade" id="addPage">
            <div className="modal-dialog" style={{width: "700rem", margin: "100px 500px"}}>
                <div className="modal-content add-main-content">
                    <div className="modal-header border-0 bg-light border-bottom">
                        <p className="h2 d-inline">Add Content</p>
                        <button type="button" className="btn-close d-inline" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p className="h5">Title</p>
                        <input onChange={handleTitle} type="text" name="test" className="mb-3 border border-grey"/>
                        <p className="h5">
                            Description
                        </p>
                        <textarea onChange={handleDesc} className="form-control handbook-page-desc mb-3 border border-grey" name="test2" style={{height:"150px"}} id="exampleFormControlTextarea1"></textarea>
                        <CardContentStyle/>
                        <button className="btn btn-primary float-end mt-5" onClick={createCard} data-bs-dismiss="modal"> Publish </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPageForm;