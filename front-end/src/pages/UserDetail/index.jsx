import React, { useEffect, useState } from 'react';
import "./UserDetail.scss"
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const UserDetail = () => {
    const [userDetail, setUserDetail] = useState()
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [imageURL, setImageURL] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newDob, setNewDob] = useState('');
    const [newGender, setNewGender] = useState(true);
    const [newImageURL, setNewImageURL] = useState('');
    const [newData, setNewData] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const account = useSelector(state => state.account)

    useEffect(() => {
        if (!userDetail) {
            axios
                .get(`api/user/getDetail`, {
                    headers: {
                        Authorization: `Bearer ${account?.accessToken}`
                    }
                })
                .then(res => {
                    setUserDetail(res.data.data);
                    console.log(res.data.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [userDetail, account]);

    console.log(userDetail);

    const handleSaveChanges = () => {
        const data = {
            email: email,
            phone: phone,
            dateOfBirth: dob,
            gender: gender,
            image: imageURL,
        };


        if (userDetail) {
            axios
                .put(`/api/user/update/`, newData, {
                    headers: {
                        Authorization: `Bearer ${account?.accessToken}`
                    }
                })
                .then(res => {
                    setUserDetail({ ...userDetail, ...newData });
                    setIsEditing(false);
                    toast.success('Saved changes successfully!!!!!!!');
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            console.log('tạo thông tin người dùng đi');
        }
    }

    const convertISODateToYYYYMMDD = (isoDate) => {
        if (!isoDate) {
            return '';
        }

        const dateParts = isoDate.split('T')[0].split('-');
        if (dateParts.length === 3) {
            return dateParts[0] + '-' + dateParts[1] + '-' + dateParts[2];
        } else {
            return '';
        }
    }

    const handleImageChange = (e) => {
        const newImageURL = e.target.value;
        setNewData({ ...newData, image: newImageURL });
        setImageURL(newImageURL);
    };

    const formatISODate = (isoDate) => {
        if (!isoDate) {
            return '';
        }

        const date = new Date(isoDate);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

        return date.toLocaleString('en-US', options);
    }
    return (
        <div>
            <div>
                <div className="userDetail">
                    <div className="row">
                        <div className="column1">
                            <div className="card">
                                <h2>Avatar</h2>
                                <hr className='line1' />
                                <div className="userImage">
                                    <img src={userDetail ? userDetail.image : ''} alt="" />
                                </div>
                                <h4>{userDetail && userDetail.createdAt ? formatISODate(userDetail.createdAt) : ''}</h4>
                            </div>

                        </div>
                        <div className="column2">
                            <div className="card">
                                <div className='head'>
                                    <h2>Information</h2>
                                    {(!userDetail || !userDetail.email) && (
                                        <button onClick={() => { setOpenModal(true) }}>
                                            <AddIcon className='icon' />
                                        </button>
                                    )}
                                </div>

                                <hr className='line2' />
                                {openModal && (
                                    <div className="modalBackground">
                                        <div className={`modalContainer${openModal ? " show" : ""}`}>
                                            <div className="titleCloseBtn">
                                                <button
                                                    onClick={() => {
                                                        setOpenModal(false);
                                                    }}
                                                >
                                                    X
                                                </button>
                                            </div>
                                            <div className="title">
                                                <h1>Create Infomation</h1>
                                            </div>
                                            <div className="body">
                                                <div>
                                                    <input
                                                        type="text"
                                                        className='registerEmail'
                                                        placeholder='Email'
                                                        value={newEmail}
                                                        onChange={(e) => setNewEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        className='registerEmail'
                                                        placeholder='Phone'
                                                        value={newPhone}
                                                        onChange={(e) => setNewPhone(e.target.value)}
                                                    />
                                                </div>
                                                <input
                                                    className="date"
                                                    type="date"
                                                    value={newDob}
                                                    onChange={(e) => setNewDob(e.target.value)}
                                                />
                                                <div className='registerGender'>
                                                    <div className='male'>
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value="true"
                                                            checked={newGender}
                                                            onChange={() => setNewGender(true)}
                                                        />
                                                        Male
                                                    </div>
                                                    <div className='female'>
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value="false"
                                                            checked={!newGender}
                                                            onChange={() => setNewGender(false)}
                                                        />
                                                        Female
                                                    </div>
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        className='registerEmail'
                                                        placeholder='URL Image'
                                                        value={newImageURL}
                                                        onChange={(e) => setNewImageURL(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="footer">
                                                <button

                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        // Tạo đối tượng dữ liệu mới từ các giá trị nhập trong modal
                                                        const data = {
                                                            email: newEmail,
                                                            phone: newPhone,
                                                            dateOfBirth: newDob,
                                                            gender: newGender,
                                                            image: newImageURL,
                                                        };

                                                        // Gọi API để tạo thông tin người dùng
                                                        axios
                                                            .post('/api/user/register', data, {
                                                                headers: {
                                                                    Authorization: `Bearer ${account?.accessToken}`
                                                                }
                                                            })
                                                            .then(res => {
                                                                setUserDetail(res.data.data);
                                                                console.log('User created successfully:', res.data);
                                                                toast.success('Created infomation success!!!');
                                                                setOpenModal(false);
                                                            })
                                                            .catch(error => {
                                                                console.error(error);
                                                            });
                                                    }}
                                                >
                                                    Create
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className='create'>
                                    <div className='emailDetail'>
                                        <label>Email: </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={newData.email || (userDetail ? userDetail.email : '')}
                                                onChange={e => setNewData({ ...newData, email: e.target.value })}
                                            />
                                        ) : (
                                            <span>{userDetail ? userDetail.email : ''}</span>
                                        )}
                                    </div>
                                    <div className='phoneDetail'>
                                        <label>Phone: </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={newData.phone || (userDetail ? userDetail.phone : '')}
                                                onChange={e => setNewData({ ...newData, phone: e.target.value })}
                                            />
                                        ) : (
                                            <span>{userDetail ? userDetail.phone : ''}</span>
                                        )}
                                    </div>
                                    <div className='dobDetail'>
                                        <label>Date of Birth: </label>
                                        {isEditing ? (
                                            <input
                                                type="date"
                                                value={newData.dateOfBirth || (userDetail ? userDetail.dateOfBirth : '')}
                                                onChange={e => setNewData({ ...newData, dateOfBirth: e.target.value })}
                                            />
                                        ) : (
                                            <span>{userDetail ? convertISODateToYYYYMMDD(userDetail.dateOfBirth) : ''}</span>
                                        )}
                                    </div>
                                    <div className='genderDetail'>
                                        <label>Gender: </label>
                                        {isEditing ? (
                                            <div>
                                                <label>
                                                    <input
                                                        id='male'
                                                        type="checkbox"
                                                        checked={newData.gender}
                                                        onChange={() => setNewData({ ...newData, gender: true })}
                                                    />
                                                    Male
                                                </label>
                                                <label>
                                                    <input
                                                        id='female'
                                                        type="checkbox"
                                                        checked={!newData.gender}
                                                        onChange={() => setNewData({ ...newData, gender: false })}
                                                    />
                                                    Female
                                                </label>
                                            </div>
                                        ) : (
                                            <span>{userDetail ? (userDetail.gender ? 'Male' : 'Female') : 'Male'}</span>
                                        )}
                                    </div>

                                    <div className='avatarUser'>
                                        {isEditing && (
                                            <>
                                                <label>Image URL:</label>
                                                <input
                                                    type="text"
                                                    value={imageURL}
                                                    onChange={handleImageChange}
                                                />
                                            </>
                                        )}
                                    </div>
                                    {userDetail ? (
                                        isEditing ? (
                                            <button onClick={handleSaveChanges}>Save Change</button>
                                        ) : (
                                            <button onClick={() => setIsEditing(true)}>Edit</button>
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;