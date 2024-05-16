import "../../../style.scss"
import {performance_color_coding} from "../../../components/utilities/color-coding";
import AdminNav from "../../../components/navigation/admin_nav";
import { ViewCardTable } from "../../../components/card/card_table";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SignForm from "../../../components/form/sign-x-form"
import { useNavigate, Link } from "react-router-dom"

interface UserData {
    accountID: number;
    username: string;
    email: string;
    datecreated: string;
    role: string;
}

function AccountView(props: any) {
    const [userData, setUserData] = useState<UserData[]>([]);
    const [openAside, setOpenAside] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:5000/GetUsers")
            .then((response) => {
                if (response.data.status === "success") {
                    setUserData(response.data.users);
                } else {
                    console.error("Error fetching users:", response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []); // Empty dependency array to ensure this runs only once

    const handleDeleteAccountClick = (accountID: number) => {
        console.log(accountID);

        const confirmDelete = window.confirm("Are you sure you want to delete this user?");

        if (confirmDelete) {
            fetch("http://localhost:5000/DeleteUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ accountID: accountID }),
            })
                .then((response) => {
                    if (response.ok) {
                        // No need to manually update state here
                    } else {
                        console.error("Delete error:", response.statusText);
                    }
                })
                .catch((error) => console.error("Delete error:", error.message));
        }
    };

    const titles = ["UserID", "Username", "Email", "Date Created", "Role", "Action"];
    return (
        <>
            <AdminNav name={"Isiah Jordan"} setOpenAside={setOpenAside} openAside={openAside} />
            {userData.length > 0 && (
                <ViewCardTable
                    title={"Account View"}
                    header={titles}
                    value={userData.map((user) => ({
                        UserID: user.accountID,
                        Username: user.username,
                        Email: user.email,
                        "Date Created": user.datecreated,
                        Role: user.role,
                        Action: (
                            <div>
                                <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#modalEditForm" onClick={() => (user.accountID)}>
                                    Edit
                                </button>
                                <button type="button" className="btn" onClick={() => handleDeleteAccountClick(user.accountID)}>
                                    Delete
                                </button>
                                <SignForm />
                            </div>
                        ),
                    }))}
                />
            )}
        </>
    );
}

export default AccountView;