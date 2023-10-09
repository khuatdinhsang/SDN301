import { useState } from "react";
import "./CustomerManager.scss";

function CustomerManager() {
  const [userSearch, setUserSearch] = useState("");
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
                <b>24</b> from 22
              </span>
            </div>
          </div>
          <div className="activeMembers">
            <h5 className="activeMembersTitle">Active Members</h5>
            <div className="activeMemebersBox">
              <span>
                <b>24</b> from 22
              </span>
            </div>
          </div>
          <div className="newUser">
            <h5 className="newUserTitle">New User</h5>
            <div className="newUserBox">
              <span>
                <b>14</b>
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
            onChange={() => setUserSearch()}
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
              <span>Address</span>
            </div>
            <div className="statusHeader">
              <span>Status</span>
            </div>
            <div className="roleHeader">
              <span>Role</span>
            </div>
            <div className="handleBox"></div>
          </div>
          <div className="tableBody">
            <div className="rowBody">
              <div className="nameBody">
                <span>VuongNguyen</span>
              </div>
              <div className="addressBody">
                <span>FPT University</span>
              </div>
              <div className="statusBody">
                <span>Active</span>
              </div>
              <div className="roleBody">
                <span>Admin</span>
              </div>
              <div className="handleBoxBody">
                <button>Change</button>
              </div>
            </div>
            <div className="rowBody">
              <div className="nameBody">
                <span>VuongNguyen</span>
              </div>
              <div className="addressBody">
                <span>FPT University</span>
              </div>
              <div className="statusBody">
                <span>Active</span>
              </div>
              <div className="roleBody">
                <span>Admin</span>
              </div>
              <div className="handleBoxBody">
                <button>Change</button>
              </div>
            </div>
            <div className="rowBody">
              <div className="nameBody">
                <span>VuongNguyen</span>
              </div>
              <div className="addressBody">
                <span>FPT University</span>
              </div>
              <div className="statusBody">
                <span>Active</span>
              </div>
              <div className="roleBody">
                <span>Admin</span>
              </div>
              <div className="handleBoxBody">
                <button>Change</button>
              </div>
            </div>
            <div className="rowBody">
              <div className="nameBody">
                <span>VuongNguyen</span>
              </div>
              <div className="addressBody">
                <span>FPT University</span>
              </div>
              <div className="statusBody">
                <span>Active</span>
              </div>
              <div className="roleBody">
                <span>Admin</span>
              </div>
              <div className="handleBoxBody">
                <button>Change</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerManager;
