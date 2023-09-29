
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './Payment.scss'

function Payment(){
    const navigate = useNavigate()
    const cartList = useSelector(state => state.cart)
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
            <input  />
            </div>
            <div className="paymentInput">
            <label>
                Address: <span style={{ color: "#f9004d" }}>*</span>
            </label>
            <input  />
            </div>
            
            <div className="paymentInput">
            <label>
                Phone Number: <span style={{ color: "#f9004d" }}>*</span>
            </label>
            <input
            
                type="number"
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
                        {cart.totalPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "VND",
                        })}
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
               
                VNĐ
                </span>
            </div>
            <hr />
            <div className="totalPrice">
                <h5>Shipping</h5>
                <span style={{ color: "#ccc" }}>0 Đ</span>
            </div>
            <hr />
            <div className="totalPrice">
                <h5>Tổng</h5>
                <span>
               
                </span>
            </div>
            <hr />
            {/* <div className="typePayment">
                <div className="banking">
                <div className="bankingTitle">
                    <input
                    type={"radio"}
                    name="pay"
                    id="banking"
                    checked
                    />
                    <label
                    htmlFor="banking"
                    style={{
                        marginBottom: "0",
                        marginLeft: "10px",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "20px",
                    }}
                    >
                    {" "}
                    Chuyển khoản ngân hàng
                    </label>
                </div>
                <h4>
                    Quý khách chuyển tiền vui lòng ghi nội dung thanh toán ” Tên
                    nick Facebook” Sau đó gửi ảnh chụp thanh toán thành công và gửi
                    vê Fanpage Vương Nguyễn https://www.facebook.com/vuongnguyen282.
                    Chúng tôi sẽ liên hệ lại và xác nhận đơn hàng
                    <br />
                </h4>
                <span>STK: 10087209504</span>
                <span>Người Thụ Hưởng: Nguyễn Văn Vương</span>
                </div>
                <hr />
                <div className="money">
                <div className="bankingTitle">
                    <input
                    type={"radio"}
                    name="pay"
                    id="banking1"
                    />
                    <label
                    htmlFor="banking1"
                    style={{
                        marginBottom: "0",
                        marginLeft: "10px",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "20px",
                    }}
                    >
                    Thanh toán khi nhận hàng
                    </label>
                </div>
                </div>
            </div> */}
            <div className="confirmPayment">
                <button onClick={() => handlePayment()}>ĐẶT HÀNG</button>
            </div>
            </div>
        </div>
        </div>
    )
    
}

export default Payment