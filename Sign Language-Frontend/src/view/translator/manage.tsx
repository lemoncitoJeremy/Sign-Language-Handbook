import { useNavigate } from "react-router-dom"
import AdminNav from "../../components/navigation/admin_nav"
import { ModelAccuracy } from "../../components/card/card_graph";


function ManageTranslator(){
    const navigate = useNavigate();
    const data = [
        {
          name: '0',
          current: 4000,
          prev: 2400,
          amt: 2400,
        },
        {
          name: '20',
          current: 3000,
          prev: 1398,
          amt: 2210,
        },
        {
          name: '40',
          current: 2000,
          prev: 9800,
          amt: 2290,
        },
        {
          name: '60',
          current: 2780,
          prev: 3908,
          amt: 2000,
        },
        {
          name: '80',
          current: 1890,
          prev: 4800,
          amt: 2181,
        },
        {
          name: '100',
          current: 2390,
          prev: 3800,
          amt: 2500,
        }
      ];

    return(
        <>
            <AdminNav
            navigate={navigate}
            name={"Isiah Jordan"}
            />
            <ModelAccuracy
                width={900}
                height={500}
                data={data}
            />
        </>
    )
}

export default ManageTranslator