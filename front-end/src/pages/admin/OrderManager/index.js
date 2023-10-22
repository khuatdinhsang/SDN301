import "../OrderManager/Order.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
function OrderManager() {
    const [orderManage, setOrderManage] = useState([]);
    const account = useSelector(state => state.account);
    useEffect(() => {
        axios
            .get(`/api/order/getAll`, {
                headers: {
                    Authorization: `Bearer ${account?.accessToken}`
                }
            })
            .then((res) => {
                setOrderManage(res.data.data);
                console.log(res.data.data);
            })
            .catch(err => console.log(err));

    }, []);
    return (
        <div className='categoryManager'>
            <div className="listCate">
                <div className="listCateHeader">
                    <input
                        type="text"
                        className="inputSearchCate"
                        placeholder="Search Order"
                    />
                </div>
                <div className="tableCate">
                    <div className="tableHeader">
                        <div className="nameHeader">
                            <span>Name</span>
                        </div>
                        <div className="phoneHeader">
                            <span>Phone</span>
                        </div>
                        <div className="addressHeader">
                            <span>Address</span>
                        </div>
                        <div className="productHeader">
                            <span>Product</span>
                        </div>
                        <div className="quantityHeader">
                            <span>Quantity</span>
                        </div>
                        <div className="quantityHeader">
                            <span>TotalPrice</span>
                        </div>
                        <div className="createdAt">
                            <span>Time</span>
                        </div>

                    </div>
                    <div className="tableBody">
                        {orderManage.map((o, index) => (
                            <div className="rowBody" key={index}>
                                <div className="nameBody">
                                    <span>{o.addressShippingId.customerName}</span>
                                </div>
                                <div className="phoneBody">
                                    <span>{o.addressShippingId.phone}</span>
                                </div>
                                <div className="addressBody">
                                    <span>{o.addressShippingId.address}</span>
                                </div>
                                <div className="productBody">
                                    <img src={o.cart[0]?.image} alt="" />
                                </div>
                                <div className="quantityBody">
                                    <span>{o.cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
                                </div>
                                <div className="quantityBody">
                                    <span>{o.totalPrice.toLocaleString('en-US')} vnd</span>
                                </div>
                                <div className="createAtBody">
                                    <span>{new Date(o.createdAt).toLocaleString()}</span>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderManager;