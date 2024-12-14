import { useEffect, useState } from "react";
import CardReview from "../components/card/card_view_request";
import "../style.scss"
import axios from "axios";

function NoAsideRequestPublish(props: any){
    const [data, setData] = useState<any>([]);

    useEffect(() => {

        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/GetRequest');
            const res = response.data.data;
            
            console.log(res);
            setData(res);   
    
            
            
            // Handle successful response
          } catch (error) {
            console.error('Error:', error);
            // Handle error
          }
        };
    
        fetchData();
    
        // Cleanup function (optional)
        // This function will be called when the component unmounts or before the effect runs again
        // Cleanup code here, if needed
        return () => {
        };
      }, []); // Empty dependency array means this effect runs only once when the component mounts



    return(
        <>
            {data.map((items: any, index_row: number) => (
                <div className="row p-5 m" key={index_row}>
                    <CardReview
                    name={items.name}
                    date={items.date}
                    status={items.status}
                    title={items.title}
                    msg={items.msg}
                />
                </div>
            ))}
        </>
    )
}

export default NoAsideRequestPublish;