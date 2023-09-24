import { useState } from "react";
import "./CartPage.scss"

function CartPage(){
    const [voucher, setVoucher] = useState('')
    const price = 50000;
    return(
        <div className="cartPage">
            <h3 className="cartPageTitle">Shopping Cart</h3>
            <div className="overallCart">
                <span>3 items in the bag</span>    
            </div> 
            <div className="listItems">
                <div className="itemBox">
                    <div className="leftBox">
                        <img src="https://kaverisias.com/kv-app/uploads/2018/01/catalog-default-img.gif" alt="" />
                        <div className="detailItem">
                            <h4 className="itemTitle">Product Item 1</h4>
                            <p className="itemDescription">Description for product item number 1</p>
                            <label>{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</label>
                        </div>
                    </div>
                    <div className="totalItem">
                        <input type="number" className="numberItem" value={1}/>
                        <span className="deleteItem">Delete</span>
                    </div>
                </div>
                 <div className="itemBox">
                    <div className="leftBox">
                        <img src="https://kaverisias.com/kv-app/uploads/2018/01/catalog-default-img.gif" alt="" />
                        <div className="detailItem">
                            <h4 className="itemTitle">Product Item 1</h4>
                            <p className="itemDescription">Description for product item number 1</p>
                            <label>{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</label>
                        </div>
                    </div>
                    <div className="totalItem">
                        <input type="number" className="numberItem" value={1}/>
                        <span className="deleteItem">Delete</span>
                    </div>
                </div>
            </div>
            <div className="bill">
                <div className="voucher">
                    <p className="voucherQuestion">Have A Promo Code?</p>
                    <div className="submitVoucher">
                        <input 
                            type="text" 
                            value={voucher}
                            onChange={(e) => setVoucher(e.target.value)}
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
                            <p className="subtotalPrice">{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
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
                            <p className="totalPrice">{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                        </div>
                    </div>
                    <div className="paying">
                        <button>Paying</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage