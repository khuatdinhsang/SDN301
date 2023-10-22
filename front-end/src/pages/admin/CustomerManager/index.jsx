import { useState, useEffect } from "react";
import "./CustomerManager.scss";
import { useSelector } from "react-redux";
import axios from 'axios';

function CustomerManager() {
  const [userSearch, setUserSearch] = useState("");
  const [accountManage, setAccountManage] = useState([]);
  const [totalAccount, setTotalAccount] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("active");
  const [selectedAccount, setSelectedAccount] = useState();
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [newUsersCount, setNewUsersCount] = useState(0);
  const account = useSelector(state => state.account);

  useEffect(() => {
    axios
      .get('/api/account/getAll', {
        headers: {
          Authorization: `Bearer ${account?.accessToken}`
        }
      })
      .then((res) => {
        setAccountManage(res.data.data);
        const totalAccounts = res.data.totalAccount;
        setTotalAccount(totalAccounts);
        const activeUsers = accountManage.filter((user) => user.isActive);
        setActiveUsersCount(activeUsers.length);
      })
      .catch(err => console.log(err));

  }, [accountManage]);

  useEffect(() => {
    const currentDate = new Date();
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(currentDate.getDate() - 2);

    const newUsers = accountManage.filter((user) => {
      const userCreatedAt = new Date(user.createdAt);
      return userCreatedAt >= twoDaysAgo && userCreatedAt <= currentDate;
    });

    setNewUsersCount(newUsers.length);
  }, [accountManage]);

  const filteredAccounts = accountManage.filter((a) =>
    a.username.toLowerCase().includes(userSearch.toLowerCase())
  );

  const resetFields = () => {
    setSelectedStatus("active");
    setSelectedAccount(null);
    setSelectedReason("");
    setSelectedDate("");
  };
  return (
    <div className="customerManager">
      <div className="portfolio">
        <div className="portfolioTitle">
          <span>Portfolio Performance</span>
        </div>
        <hr />
        <div className="portfolioBox">
          <div className="totalUsers">
            <h5 className="totalUsersTitle">Total Users</h5>
            <div className="totalUsersBox">
              <span>
                <b>{totalAccount}</b>
              </span>
            </div>
          </div>
          <div className="activeMembers">
            <h5 className="activeMembersTitle">Active Members</h5>
            <div className="activeMembersBox">
              <span>
                <b>{activeUsersCount}</b>
              </span>
            </div>
          </div>
          <div className="newUser">
            <h5 className="newUserTitle">New User</h5>
            <div className="newUserBox">
              <span>
                <b>{newUsersCount}</b>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="listUsers">
        <div className="listUsersHeader">
          <input
            type="text"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="inputSearchUser"
            placeholder="Search Users"
          />
        </div>
        <div className="tableUser">
          <div className="tableHeader">
            <div className="nameHeader">
              <span>Name</span>
            </div>
            <div className="addressHeader">
              <span>Status</span>
            </div>
            <div className="statusHeader">
              <span>Role</span>
            </div>
            <div className="roleHeader">
              <span>Created at</span>
            </div>
            <div className="roleHeader">
              <span>DeActive at</span>
            </div>
            <div className="roleHeader">
              <span>Reason</span>
            </div>
            <div className="handleBox"></div>
          </div>
          <div className={`overlay${openModal ? " show" : ""}`}></div>
          <div className="tableBody">
            {filteredAccounts.map((a, index) => {
              const formattedDate = new Date(a.createdAt).toLocaleString();
              const formattedDeActiveAt = a.deActiveAt ? new Date(a.deActiveAt).toLocaleDateString() : "N/A";
              return (
                <div className="rowBody" key={index}>
                  <div className="nameBody">
                    <span>{a.username}</span>
                  </div>
                  <div className="statusBody">
                    <span>{a.isActive ? "active" : "deactive"}</span>
                  </div>
                  <div className="roleBody">
                    <span>{a.role.roleName}</span>
                  </div>
                  <div className="addressBody">
                    <span>{formattedDate}</span>
                  </div>
                  <div className="addressBody">
                    <span>{formattedDeActiveAt}</span>
                  </div>
                  <div className="addressBody">
                    <span>{a.deActiveReason}</span>
                  </div>
                  <div className="handleBoxBody">
                    <button onClick={() => { setSelectedAccount(a); setOpenModal(true) }}>Change</button>
                  </div>
                </div>
              )
            })}
          </div>
          {openModal && (
            <div className="modalBackground">
              <div className={`modalContainer${openModal ? " show" : ""}`}>
                <div className="titleCloseBtn">
                  <button
                    onClick={() => {
                      resetFields();
                      setOpenModal(false);
                    }}
                  >
                    X
                  </button>
                </div>
                <div className="title">
                  <h1>Change status</h1>
                </div>
                <div className="body">
                  <select
                    className="status"
                    id="status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="deactive">Deactive</option>
                  </select>
                  <input
                    className="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                  <textarea
                    className="reason"
                    type="text"
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                </div>
                <div className="footer">
                  <button
                    onClick={() => {
                      setOpenModal(false);
                    }}
                    id="cancelBtn"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (selectedStatus === "active") {
                        axios
                          .put(`/api/account/inActive/${selectedAccount._id}`, null, {
                            headers: {
                              Authorization: `Bearer ${account?.accessToken}`
                            },
                            withCredentials: true,
                          })
                          .then((res) => {
                            setOpenModal(false);
                            console.log(res);
                            console.log(selectedAccount._id);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      } else if (selectedStatus === "deactive") {
                        axios.put(`/api/account/deActive/${selectedAccount._id}`, {
                          deActiveReason: selectedReason,
                          deActiveAt: selectedDate,
                        }, {
                          headers: {
                            Authorization: `Bearer ${account?.accessToken}`
                          },
                          withCredentials: true,
                        })
                          .then((res) => {
                            setOpenModal(false);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }
                      resetFields();
                    }}

                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerManager;
