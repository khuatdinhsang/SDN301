
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './Payment.scss'

function Payment(){
    const navigate = useNavigate()
    const cartList = useSelector(state => state.cart)

    const [totalPrice, setTotalPrice] = useState(0)
    const [customerName, setCustomerName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState()
    
    useEffect(() => {
        let total = 0;
        cartList?.forEach((item) => {
            total += item?.price * item?.total;
        })
        setTotalPrice(total)
    },[cartList])

    const handlePayment = () => {
        
    }

    return (
         <div className="paymentContent">
        <div className="leftPayment">
            <h2>Order Detail</h2>
            <div className="paymentInput">
            <label>
                Customer Name: <span style={{ color: "#f9004d" }}>*</span>
            </label>
            <input 
                value={customerName}
                onChange={(e) => {
                    setCustomerName(e.target.value)
                }}
                placeholder="Enter your name"
            />
            </div>
            <div className="paymentInput">
            <label>
                Address: <span style={{ color: "#f9004d" }}>*</span>
            </label>
            <input  
                value={address}
                onChange={(e) => {
                    setAddress(e.target.value)
                }}
                placeholder="Enter your address"
            />
            </div>
            
            <div className="paymentInput">
            <label>
                Phone Number: <span style={{ color: "#f9004d" }}>*</span>
            </label>
            <input
                value={phoneNumber}
                onChange={(e) => {
                    setPhoneNumber(e.target.value)
                }}
                placeholder="Enter your phone number"
            />
            </div>
            <button className='backToCart' onClick={() => navigate("/cart")}>Back to Cart</button>
        </div>

        <div className="rightPayment">
            <h2 style={{"color": "#ff511c"}}>YOUR ORDER</h2>
            <div className="paymentDetail">
                <div className="titleDetail">
                    <label>PRODUCT</label>
                    <label>PRICE</label>
                </div>
                <hr />
                <div className="paymentPrice">
                    {cartList.map((cart) => {
                    return (
                        <div className="detailPrice">
                        <h5>
                            {cart.name} x {cart.total}
                        </h5>
                        <span style={{ textAlign: "right" }}>
                            {cart.totalPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                            VNĐ
                        </span>
                        </div>
                    );
                    })}
                </div>
                <hr />
                <div className="totalPrice">
                    <h5>SUBTOTAL</h5>
                    <span>
                    {totalPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                    </span>
                </div>
                <hr />
                <div className="totalPrice">
                    <h5>Shipping</h5>
                    <span style={{ color: "#ccc" }}>{(totalPrice-totalPrice).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                </div>
                <hr />
                <div className="totalPrice">
                    <h5>Tổng</h5>
                    <span>
                
                    </span>
                </div>
                <hr />
               
                <div className="confirmPayment">
                    <button onClick={() => handlePayment()}>ĐẶT HÀNG</button>
                </div>
                </div>
            </div>
        </div>
    )
    
}

export default Payment