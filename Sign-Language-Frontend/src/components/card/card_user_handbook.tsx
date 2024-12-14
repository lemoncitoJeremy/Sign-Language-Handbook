import axios from "axios";
import { useEffect, useState } from "react";
import AddImage from "../../assets/addImage.png";
import "../../style.scss"
import { useLocation, useNavigate } from "react-router-dom";
import { SearchBar } from "../search/search";
import TopNav from "../navigation/user_nav";

function CardUserHandSign(props: any){
    const [curImg, setImg] = useState(AddImage);
    const [imgName, setImgName] = useState<string>('');
    const [title, setTitle] =  useState(props.title);
    const [desc, setDesc] = useState(props.desc);
    const [message, setMessage] = useState<string>(props.desc);



    return(
        <div className="container-fluid card-hand-content mt-4" style={{width: "70%"}}>
            <div className="row">
                <div className="col-md-4 pt-2 pb-2">
                    <img src={curImg} style={{ width: "15rem", height: "10rem" }} alt="..." />
                </div>
                <div className="col mb-4 mt-4">
                    <input type="text" className="h4 pt-2 border-0" value={title}/> 
                    <input type="text" className="desc border-0"  value={desc}/> 
                </div>
                <div className="col mt-4">
 
                </div>
            </div>
        </div>
    )    
}

function UserHandbookContent(){
    let loc = useLocation()
    const [changeImg, setChangeImg] = useState(false);
    const [curImg, setImg] = useState(AddImage);
    const [title, setTitle] = useState("Enter Title");
    const [section, setSec] = useState("Enter Category")
    const [desc, setDesc] = useState("Enter Description")
    
    const [cards, setCard] = useState<any>([])
    const [orig_value, setOrigVal] = useState<any>([]);

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
                const search = []
                for (let i = 0; i < res.length; i++){
                    arr.push(
                        <CardUserHandSign
                            id={res[i].signlanguageID}
                            handbookID={loc.state.id}
                            title={res[i].name}
                            desc={res[i].sign_description}
                        />
                    )
                }
                
                setCard(arr);
                setOrigVal(arr);

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
    

    return(
        <>
            <TopNav
            isLoggedIn={true}
            />
            <div className="container-fluid">
            <div className="home-content">
                <div className="row p-4" style={{backgroundColor: "#ECECEC"}}>
                    <div className="col">
                        <p className="h3">
                            Handbook {">"} Content
                        </p>
                    </div>
                    <div className="col">
                    </div>
                </div>
                <div className="row">
                    <div className="col home-info">
                        <input type="text" className="h1 border-0" value={title} style={{width:"15rem", paddingTop: "70px"}}/> 
                        <textarea className="container form-control handbook-page-desc border-0" style={{height: "25rem", fontSize: "20px"}} value={desc}> 
                        </textarea>
                    </div>  
                    <div className="col home-info">
                    <input type="file" id={`upload-image-${loc.state.id}`}  hidden />
            
                    <img src={curImg}  style={{ width: "50%", height: "45%" }} alt="" /> 
                    
                    </div>
                </div>
                <div className="row home-info" style={{border: "10px solid #f8f9fa", borderRadius:"20px", padding: "0px", marginTop: "-100px"}}>
                    <SearchBar
                        orig_value={cards}
                        value={orig_value}
                        setVal={setOrigVal}
                    />
                </div>
                <div className="row home-info">
                    <input type="text" className="h1 border-0 mb-4"  value={"Content"}/>
                </div>
                <div className="row">
                    {cards.map((items: any, index_row: Number)=>(
                        items
                    ))}
                </div>
                <div className="row w-100">
                </div>
            </div>
            </div>
        </>
    )
}

function CardUserHandTitle(props: any){
    const [curImg, setImg] = useState<string>('');
    const [imgName, setImgName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

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
        navigate("/handbook/content", {state: {id:props.id}})
    }

    return (
        <div className="card border-0 p-0 mb-4 handbook-container" style={{ width: "18rem", height: "21rem" }}>
            {curImg == '' ? (
                <div className="container-fluid image-holder" style={{ height: "20rem" }}>
                    <img src={AddImage}  style={{ width: "50%", height: "50%", marginLeft:"25%", marginTop:"25%" }} alt="" /> 
                </div>
            ):(
                <div className="container-fluid image-holder" style={{ height: "20rem" }}>
                    <img src={curImg}  style={{ width: "100%", height: "100%" }} alt="" /> 
                </div>
            )}
        <div className="card-body container-fluid">
            <button className="card-title btn btn-unstyled" onClick={navigatePage} style={{fontWeight:"bold", fontSize:"20px", paddingLeft:"0px"}}>
                {props.title}
            </button>
            <div className="card-text">{props.desc}</div>

        </div>
        </div>
    );
}


function CardUserHandbookList(props: any){
    const [cards, setCards] = useState([<CardUserHandTitle/>]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/GetHandbookPage")
            .then((response) => {
                const data = response.data["data"];
                const arr = [];
                for (let i = 0; i < data.length; i++){
                    arr.push(
                        <CardUserHandTitle
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
        <>
        <TopNav
            isLoggedIn={true}
        />
        <div className="container-fluid p-5" style={{width: "100%"}}>
            <div className="card border-0">
                <div className="card-header p-3 border-0">
                    <p className="h2 d-inline "> Handbook List </p>
                </div>
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
        </>
    )
}

export {CardUserHandSign, CardUserHandbookList, UserHandbookContent, CardUserHandTitle}

