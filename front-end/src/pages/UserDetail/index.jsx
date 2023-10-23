import React, { useEffect, useState } from "react";
import '../UserDetail/UserDetail.scss';
import { useSelector, useDispatch } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

function UserDetail() {
    const [getDetailUser, setGetDetailUser] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "male",
        image: null,
    });
    const account = useSelector(state => state.account);
    const dispatch = useDispatch();

    const updateUserDetails = () => {
        const formData = new FormData();
        formData.append("email", updatedUser.email);
        formData.append("phone", updatedUser.phone);
        formData.append("dateOfBirth", updatedUser.dateOfBirth);
        formData.append("gender", updatedUser.gender);
        formData.append("image", updatedUser.image);
        axios
            .put(`/api/user/update`, updatedUser, {
                headers: {
                    Authorization: `Bearer ${account?.accessToken}`
                },
                withCredentials: true,
            })
            .then((res) => {
                console.log("User details updated successfully");
                setOpenModal(false);
            })
            .catch(err => {
                console.error("Error updating user details:", err);
            });
    }

    const fetchUserDetails = () => {
        axios
            .get(`/api/user/getDetail`, {
                headers: {
                    Authorization: `Bearer ${account?.accessToken}`
                }
            })
            .then((res) => {
                setGetDetailUser(res.data.data);
                console.log(res.data.data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        if (account) {
            fetchUserDetails();
        } else {
            setGetDetailUser(null);
        }
    }, [account]);
    const formatDate = (dateString) => {
        if (!dateString) {
            return "N/A";
        }

        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }

        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className="user-detail">
            <div className="left-column">
                <div className="user-avatar">
                    <img src={getDetailUser?.image} alt="User Avatar" />
                </div>
                <button className="change-image-button" onClick={() => {
                    const fileInput = document.createElement("input");
                    fileInput.type = "file";
                    fileInput.accept = "image/*";

                    fileInput.addEventListener("change", (event) => {
                        const selectedFile = event.target.files[0];

                        if (selectedFile) {

                            setUpdatedUser({ ...updatedUser, image: selectedFile });
                        }
                    });
                    fileInput.click();
                }}>
                    Change Image
                </button>
            </div>
            <div className="right-column">
                <div className="title">
                    <h2>Account Detail</h2>
                    <EditIcon className="edit" onClick={() => { setOpenModal(true) }} />
                </div>
                <hr />
                <div className="user-info">
                    <div className="info-column">
                        <p>Email <span>{getDetailUser?.email}</span></p>
                        <p>Phone <span>{getDetailUser?.phone}</span></p>
                        <p>Date of Birth <span>{formatDate(getDetailUser?.dateOfBirth)}</span></p>
                        <p>Gender <span>{getDetailUser?.gender ? (getDetailUser.gender ? "Male" : "Female") : "N/A"}</span></p>
                        <p>Address <span>{getDetailUser?.address}</span></p>
                    </div>
                </div>
            </div>
            {openModal && (
                <div className="modalUserDetail">
                    <div className={`modalContainerDetail${openModal ? " show" : ""}`}>
                        <div className="titleCloseBtn">
                            <button
                                onClick={() => {
                                    setOpenModal(false);
                                }}
                            >
                                X
                            </button>
                        </div>
                        <div className="titleEdit">
                            <h1>Edit Information</h1>
                        </div>
                        <div className="bodyEdit">
                            <input
                                className="email"
                                type="text"
                                placeholder="Your email.."
                                value={updatedUser.email}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                            />
                            <input
                                className="phone"
                                type="text"
                                placeholder="Your phone.."
                                value={updatedUser.phone}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
                            />
                            <input
                                className="date"
                                type="date"
                                value={updatedUser.dateOfBirth}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, dateOfBirth: e.target.value })}
                            />
                            <select
                                className="status"
                                id="status"
                                value={updatedUser.gender}
                                onChange={(e) => setUpdatedUser({ ...updatedUser, gender: e.target.value })}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>

                        </div>
                        <div className="footerEdit">
                            <button onClick={() => { setOpenModal(false) }}>
                                Cancel
                            </button>
                            <button
                                onClick={updateUserDetails}

                            >
                                Change
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDetail;
