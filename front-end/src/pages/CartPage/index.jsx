import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { decreaseItem, increaseItem, removeItem } from "../../actions/cartAction";
import "./CartPage.scss"

function CartPage(){
    // const [voucher, setVoucher] = useState('')
    const [itemCover, setItemCover] = useState({})

    const cartList = useSelector((state) => state.cart)
    const [total, setTotal] = useState(0)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    useEffect(() => {
        let totalPrice = 0;
        cartList.forEach(cart => {
            totalPrice += cart.price * cart.total;
        });
        setTotal(totalPrice)
    }, [cartList])

    const handleIncrease = (item) => {
        const newItem = item;
        const action = increaseItem(newItem);
        dispatch(action);
        toast.success(`${item?.name} is increase 1 product!`)
    }

    const handleDecrease = (item) => {
        if(item.total > 1  ){
            const newItem = item;
            const action = decreaseItem(newItem);
            dispatch(action);
            toast.success(`${newItem?.name} is decrease 1 product!`)
        }else{
            toast.warning(`Can not decrease the quantity of ${item?.name}`)
        }
    }

    const deleteItem = (item) => {
        const newItem = item;
        setItemCover(newItem);
        const action = removeItem(newItem);
        dispatch(action);
        toast.success(`Delete ${newItem.name} successfully!`)
    }   

    const price = 50000;
    return(
        <div className="cartPage">
            <h3 className="cartPageTitle">Shopping Cart</h3>
            <div className="overallCart">
                <span>{cartList?.length} items in the bag</span>    
            </div> 
            <div className="listItems">
                {cartList.map((cart) => {
                    return (
                        <div className="itemBox">
                            <div className="leftBox">
                                <img 
                                    src={cart?.image} 
                                    alt="" 
                                    onClick={() => navigate(`/menu/foodDetail/${cart?._id}`)}
                                    style={{"cursor": "pointer"}} />
                                <div className="detailItem">
                                    <h4 className="itemTitle">{cart?.name}</h4>
                                    <p className="itemDescription">{cart?.description}</p>
                                    <label>{cart?.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</label>
                                </div>
                            </div>
                            <div className="productTotalPrice">
                                <label>{cart?.totalPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</label>
                            </div>
                            <div className="totalItem">
                                 <div className="countItem">
                                     <button
                                        className="btnTotal"
                                        onClick={() => handleDecrease(cart)}
                                    >
                                        -
                                    </button>
                                    <span className="numberItem">{cart?.total}</span>
                                     <button
                                        className="btnTotal"
                                        onClick={() => handleIncrease(cart)}
                                    >
                                        +
                                    </button>
                                 </div>
                                <span className="deleteItem" onClick={() => deleteItem(cart)}>Delete</span>
                            </div>
                        </div>
                    )
                } )}
            </div>
            <div className="bill">
                <div className="voucher">
                    <p className="voucherQuestion">Have A Promo Code?</p>
                    <div className="submitVoucher">
                        <input 
                            type="text" 
                            // value={voucher}
                            // onChange={(e) => setVoucher(e.target.value)}
                            className="inputVoucher"
                        />
                        <button className="sendVoucher">Submit</button>
                    </div>
                </div>
                <div className="totalPrice">
                    <div className="subtotal">
                        <div className="leftSub">
                            <span className="subtotalTitle">Subtotal: </span>
                        </div>
                        <div className="rightSub">
                            <p className="subtotalPrice"> {total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                        </div>
                    </div>
                    <div className="discount">
                        <div className="leftDis">
                            <span className="discountTitle">Discount: </span>
                        </div>
                        <div className="rightDis">
                            <p className="discountNumber">{(price-50000).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                        </div>
                    </div>
                    <div className="total">
                        <div className="leftTotal">
                            <span className="totalTitle">Total: </span>
                        </div>
                        <div className="rightTotal">
                            <p className="totalPrice">{total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                        </div>
                    </div>
                    <div className="paying">
                        <button onClick={() => navigate("/payment")}>Paying</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage