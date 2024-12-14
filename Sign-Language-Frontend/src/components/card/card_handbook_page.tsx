import AddImage from "../../assets/addImage.png"
import TrashCan from "../../assets/editor/delete.png"
import AddPage from "../../assets/editor/addpage.png"
import Handbook from "../../assets/editor/book.png"
import "../../style.scss"
import React, { useEffect, useState } from "react"
import AddPageForm from "../form/add-page-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"


function CardHandbookList(props: any){
    const [cards, setCards] = useState([<CardHandTitle/>]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/GetHandbookPage")
            .then((response) => {
                const data = response.data["data"];
                const arr = [];
                for (let i = 0; i < data.length; i++){
                    arr.push(
                        <CardHandTitle
                            id={data[i].handbookID}
                            title={data[i].subject_title}
                            desc={data[i].subject_description}
                        />
                    )
                }
                setCards(arr);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []); 

    return(
        <div className="container-fluid p-5" style={{width: "100%"}}>
            <div className="card border-0">
                <div className="card-header p-3 border-0">
                    <p className="h2 d-inline "> Manage Handbook </p>
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
                    <div className="row">
                    {cards.map((items: any, index_col: number) => (
                        <div className="col" key={index_col}>
                            {items}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function CardHandSign(props: any){
    const [curImg, setImg] = useState(AddImage);
    const [imgName, setImgName] = useState<string>('');
    const [title, setTitle] =  useState(props.title);
    const [desc, setDesc] = useState(props.desc);
    const [message, setMessage] = useState<string>(props.desc);

    const handleTrash = (e: any) =>{
        fetch("http://localhost:5000/DeleteContent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: props.id, handbook: props.handbookID}),
        })
            .then((response) => {
                if (response.ok) {
                } else {
                    
                }
            })
            .catch((error) => console.error("Delete error:", error.message));

        window.location.reload()
    }


    const handleChange = async (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            setImg(URL.createObjectURL(e.target.files[0]));
            setImgName(e.target.files[0].name);
            e.preventDefault();
            if (!curImg) {
                setMessage('Please select a file to upload');
                return;
            }
        
            const formData = new FormData();
            formData.append('file', curImg);
            formData.append('id', props.id);
        
            try {
                const res = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                });
                setMessage('File uploaded successfully');
                console.log(res.data); // handle success
            } catch (err) {
                console.error(err); // handle error
            }
            setMessage('File upload failed');
        }   
    };

    function onChangeTitle(e: any){
        setTitle(e.target.value);
    }

    function onKeyTitle(e: any){

        if (e.key == 'Enter'){
            axios.post('http://localhost:5000/SetTitleDic', {id: props.id, title: title})
            .then(response => {
                console.log('Data saved successfully');
              })
              .catch(error => {
                console.error('Error saving data:', error);
              });
        }
    }

    function onChangeDesc(e: any){
        setDesc(e.target.value);
    }

    function onKeyDesc(e: any){
        if (e.key == 'Enter'){
            axios.post('http://localhost:5000/SetDescDic', {id: props.id, desc: desc})
            .then(response => {
                console.log('Data saved successfully');
              })
              .catch(error => {
                console.error('Error saving data:', error);
              });
        }
    }


    return(
        <div className="container-fluid card-hand-content mt-4" style={{width: "70%"}}>
            <div className="row">
                <div className="col-md-4 pt-2 pb-2">
                    <input type="file" id={`upload-image-${props.id}`} onChange={handleChange} hidden />
                    <label htmlFor={`upload-image-${props.id}`} className="btn btn-unstyled" style={{ padding: 0 }}>
                        <img src={curImg} style={{ width: "15rem", height: "10rem" }} alt="..." />
                    </label>
                </div>
                <div className="col mb-4 mt-4">
                    <input type="text" className="h4 pt-2 border-0" onChange={onChangeTitle} onKeyDown={onKeyTitle} value={title}/> 
                    <input type="text" className="desc border-0" onChange={onChangeDesc} onKeyDown={onKeyDesc} value={desc}/> 
                </div>
                <div className="col mt-4">
                    <button className="btn btn-unstyled float-end" onClick={handleTrash}>
                        <img src={TrashCan} style={{ color: "red", marginTop: -50, paddingTop: "40px" }} alt="Delete" />
                    </button>   
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
    const [curImg, setImg] = useState<string>('');
    const [imgName, setImgName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate()

    useEffect(() => {
            // Fetch the image path from the server
        const fetchImagePath = async () => {
            try {
                const response = await fetch('http://localhost:5000/GetImageHandbook', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: props.id}), // Pass the handbook ID here
                });
            
                const data = await response.json();
                if (response.ok) {
                    const data = await response.json();
                    setImg(data.path);
                } else {
                    console.error('Error fetching the image path:', data.error);
                }
                } catch (error) {
                console.error('Error fetching the image path:', error);
            }
        }
        fetchImagePath();
    }, []);

    const handleChange = async (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setImg(URL.createObjectURL(selectedFile));
            setImgName(selectedFile.name);
      
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('id', props.id);
      
            try {
              const res = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              setMessage('File uploaded successfully');
              console.log(res.data); // handle success
            } catch (err) {
              setMessage('File upload failed');
              console.error(err); // handle error
            }
        }
    };

    const navigatePage = (e: any) => {  
        navigate("/editor/handbook/content", {state: {id:props.id}})
    }

    const handleTrash = (e: any) =>{
        fetch("http://localhost:5000/DeleteHandbook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: props.id}),
        })
            .then((response) => {
                if (response.ok) {
                } else {
                    
                }
            })
            .catch((error) => console.error("Delete error:", error.message));

        window.location.reload()
    }

    return (
        <div className="card border-0 p-0 mb-4 handbook-container" style={{ width: "18rem", height: "21rem" }}>
            {curImg == '' ? (
                <div className="container-fluid image-holder" style={{ height: "20rem" }}>
                    <input type="file" id={`upload-image-${props.id}`} onChange={handleChange} hidden />
                    <label htmlFor={`upload-image-${props.id}`} className="btn btn-unstyled" style={{ padding: 0 }}>
                    <img src={AddImage}  style={{ width: "100%", height: "100%" }} alt="" /> 
                    </label>
                </div>
            ):(
                <div className="container-fluid image-holder" style={{ height: "20rem" }}>
                    <input type="file" id={`upload-image-${props.id}`} onChange={handleChange} hidden />
                    <label htmlFor={`upload-image-${props.id}`} className="btn btn-unstyled" style={{ padding: 0 }}>
                    <img src={curImg}  style={{ width: "100%", height: "100%" }} alt="" /> 
                    </label>
                </div>
            )}
        <div className="card-body container-fluid">
            <button className="card-title btn btn-unstyled" onClick={navigatePage} style={{fontWeight:"bold", fontSize:"20px", paddingLeft:"0px"}}>
                {props.title}
            </button>
            <div className="card-text">{props.desc}</div>
            <button className="btn btn-unstyled float-end" onClick={handleTrash}>
            <img src={TrashCan} style={{ color: "red", marginTop: -50, paddingTop: "40px" }} alt="Delete" />
            </button>
        </div>
        </div>
    );
    }

function DictionaryCard(props: any){
    const [curImg, setImg] = useState(AddImage);

    useEffect(() => {
        if (props.image != null) {
        setImg(props.image);
        }
    }, [props.image]);

    const handleChange = async (e: any) => {
        
    }

    const handleTrash = () =>{

    }

    return (
        <div className="card border-0 p-0 handbook-container" style={{ width: "18rem", height: "17rem" }}>
        <div className="container-fluid image-holder" style={{ height: "20rem" }}>
            <input type="file" id={`upload-image-${props.id}`} onChange={handleChange} hidden />
            <label htmlFor={`upload-image-${props.id}`} className="btn btn-unstyled" style={{ padding: 0 }}>
            <img src={curImg} style={{ width: "100%", height: "100%" }} alt="" />
            </label>
        </div>
        <div className="card-body container-fluid">
            <h5 className="card-title">
                {props.title}
            </h5>
            <button className="btn btn-unstyled float-end">
            <img src={TrashCan} onClick={handleTrash} style={{ color: "red", marginTop: -50, paddingTop: "40px" }} alt="Delete" />
            </button>
        </div>
        </div>
    );

}

export {CardHandbookList, CardDictionaryList, CardHandTitle, CardHandSign, DictionaryCard};
