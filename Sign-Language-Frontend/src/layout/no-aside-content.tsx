import { useEffect, useState } from "react";
import AddImage from "../assets/addImage.png"
import { CardHandSign } from "../components/card/card_handbook_page";
import { SearchBar } from "../components/search/search";
import Add  from "../assets/editor/add.png"
import axios from "axios";
import { resolvePath, useLocation } from "react-router-dom";

function NoAsideContent(){
    let loc = useLocation()
    const [changeImg, setChangeImg] = useState(false);
    const [curImg, setImg] = useState(AddImage);
    const [title, setTitle] = useState("Enter Title");
    const [section, setSec] = useState("Enter Category")
    const [desc, setDesc] = useState("Enter Description")
    const [cards, setCard] = useState<any>([])


    useEffect(() => {

        const fetchInfo = async () => {
          try {
            const response = await axios.post('http://localhost:5000/GetContent', {id: loc.state.id});
            const res = response.data.data[0]
            setTitle(res.content_title);
            setDesc(res.content_description);
            
    
            
            
            // Handle successful response
          } catch (error) {
            console.error('Error:', error);
            // Handle error
          }
        };

        const fetchData = async () => {
            try{
                const response = await axios.post('http://localhost:5000/GetCardContent', {id: loc.state.id});
                const res = response.data.data;
                console.log(res);

                const arr = [];
                for (let i = 0; i < res.length; i++){
                    arr.push(
                        <CardHandSign
                            id={res[i].signlanguageID}
                            handbookID={loc.state.id}
                            title={res[i].name}
                            desc={res[i].sign_description}
                        />
                    )
                }
                
                setCard(arr);

            }catch (error) {
                console.error('Error:', error);
                // Handle error
              }
        }
    
        fetchInfo();
        fetchData();
    
        // Cleanup function (optional)
        // This function will be called when the component unmounts or before the effect runs again
        // Cleanup code here, if needed
        return () => {
        };
      }, []); // Empty dependency array means this effect runs only once when the component mounts
    
    function handleChange(e: any) {
        console.log(e.target.files);
        setImg(URL.createObjectURL(e.target.files[0]));

    }

    function onChangeTitle(e: any){
        setTitle(e.target.value);
    }

    function onKeyTitle(e: any){

        if (e.key == 'Enter'){
            axios.post('http://localhost:5000/SetTitleContent', {id: loc.state.id, title: title})
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
            axios.post('http://localhost:5000/SetDescContent', {id: loc.state.id, desc: desc})
            .then(response => {
                console.log('Data saved successfully');
              })
              .catch(error => {
                console.error('Error saving data:', error);
              });
        }
    }


    async function onChangeSec(e: any){
        setSec(e.target.value);
      
    }

    async function Submit(e: any){
        try {   
            const response = await axios.post('http://localhost:5000/SearchRequest', {id: loc.state.id});
            if (response.data.data.length == 0){
                const response2 = await axios.post('http://localhost:5000/PushRequest', {id: loc.state.id, accountID: 1})
            }
    
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    }

    async function AddCard(e: any){
        try {
            console.log("test");
            const response = await axios.post('http://localhost:5000/AddCardContent');
            const response2 = await axios.post('http://localhost:5000/AddCardToContent', {id: loc.state.id, handID: response.data.id})
    
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }

    };
    
    return(
        <div className="container-fluid">
        <div className="home-content">
            <div className="row p-4" style={{backgroundColor: "#ECECEC"}}>
                <div className="col">
                    <p className="h3">
                        Manage Handbook {">"} Content
                    </p>
                </div>
                <div className="col">
                    <button className="btn btn-primary pt-2 float-end" onClick={Submit}>
                        Submit
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col home-info">
                    <input type="text" onChange={onChangeTitle} onKeyDown={onKeyTitle} className="h1 border-0" value={title} style={{width:"15rem", paddingTop: "70px"}}/> 
                    <textarea className="container form-control handbook-page-desc border-0" onKeyDown={onKeyDesc} onChange={onChangeDesc} style={{height: "25rem", fontSize: "20px"}} value={desc}> 
                    </textarea>
                </div>  
                <div className="col home-info">
                <input type="file" id={`upload-image-${loc.state.id}`} onChange={handleChange} hidden />
                <label htmlFor={`upload-image-${loc.state.id}`} className="btn btn-unstyled" style={{ width: "30rem", paddingTop: "1px", height: "20rem", marginTop:"100px"}}>
                    <img src={curImg}  style={{ width: "100%", height: "100%" }} alt="" /> 
                </label>
                
                </div>
            </div>
            <div className="row home-info" style={{border: "10px solid #f8f9fa", borderRadius:"20px", padding: "0px", marginTop: "-100px"}}>
                <SearchBar
                />
            </div>
            <div className="row home-info">
                <input type="text" className="h1 border-0 mb-4"  onChange={onChangeSec} onKeyDown={onChangeDesc} value={section}/>
            </div>
            <div className="row">
                {cards.map((items: any, index_row: Number)=>(
                    items
                ))}
            </div>
            <div className="row w-100">
                <button className="btn btn-unstyled" onClick={AddCard}>
                    <img src={Add} className="mt-5 img-flui"/>
                </button>
            </div>
        </div>
        </div>
    )
}

export default NoAsideContent;