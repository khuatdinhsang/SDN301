import React from "react";
import "./style.scss"

const HomePage = () => {
  return (<React.Fragment>
    <div className="content">
      <div className="content-left">
        <div className="info">
          <h2>Order Your Best <br/>Food anytime</h2>
          <p>Hey, Our delicious food is waiting for you, <br/>
            We are always near to you with fresh item of food</p>
        </div>
        <button>Explore Food</button>
      </div>
      <div className="content-right">
        <img src="https://khothietke.net/wp-content/uploads/2021/05/PNGKhothietke.net-03304.png" alt="" />
      </div>
    </div>
   
  </React.Fragment>);
};

export default HomePage;
