import { useNavigate } from "react-router";
import "./MenuPage.scss"

function MenuPage(){
    let price =50000;
    const navigate = useNavigate()
    return (
        <div className="menuPage">
            <div className="cardList">
                <div className="card" onClick={() => {navigate("/menu/foodDetail")}}>
                    <img src="https://i.pinimg.com/736x/30/da/50/30da50228346d0976ff6f87e7eb5db29--dwarf-planet-royalty-free-image.jpg" alt="" />
                    <span className="foodName">Pizza Mozzarella</span>
                    <p className="foodPrice">{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                    <button className="addBtn">Add</button>
                </div>
                <div className="card"  onClick={() => {navigate("/menu/foodDetail")}}>
                    <img src="https://i.pinimg.com/originals/46/72/70/467270305df7265e02415e6c24234bd7.jpg" alt="" />
                    <span className="foodName">Hamburger</span>
                    <p className="foodPrice">{price.toLocaleString('vi', 
                    {style : 'currency',
                    currency : 'VND'})}
                    </p>
                    <button className="addBtn">Add</button>
                </div>
                <div className="card"  onClick={() => {navigate("/menu/foodDetail")}}>
                    <img src="https://i.pinimg.com/1200x/3a/24/5c/3a245c183940e49e02b6780a24380060.jpg" alt="" />
                    <span className="foodName">Pho</span>
                    <p className="foodPrice">{price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}</p>
                    <button className="addBtn">Add</button>
                </div>
                <div className="card"  onClick={() => {navigate("/menu/foodDetail")}}>
                    <img src="https://i.pinimg.com/1200x/48/9c/39/489c3910a3e65a3c8eacfbec586cb0f9.jpg" alt="" />
                    <span className="foodName">Sashimi</span>
                    <p className="foodPrice">{price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}</p>
                    <button className="addBtn">Add</button>
                </div>
                <div className="card"  onClick={() => {navigate("/menu/foodDetail")}}>
                    <img src="https://i.pinimg.com/736x/30/da/50/30da50228346d0976ff6f87e7eb5db29--dwarf-planet-royalty-free-image.jpg" alt="" />
                    <span className="foodName">Pizza Mozzarella</span>
                    <p className="foodPrice">{price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}</p>
                    <button className="addBtn">Add</button>
                </div>
                <div className="card" onClick={() => {navigate("/menu/foodDetail")}}>
                    <img src="https://i.pinimg.com/originals/46/72/70/467270305df7265e02415e6c24234bd7.jpg" alt="" />
                    <span className="foodName">Hamburger</span>
                    <p className="foodPrice">{price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}</p>
                    <button className="addBtn">Add</button>
                </div>
                <div className="card" onClick={() => {navigate("/menu/foodDetail")}}>
                    <img src="https://i.pinimg.com/1200x/3a/24/5c/3a245c183940e49e02b6780a24380060.jpg" alt="" />
                    <span className="foodName">Pho</span>
                    <p className="foodPrice">{price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}</p>
                    <button className="addBtn">Add</button>
                </div>
                <div className="card" onClick={() => {navigate("/menu/foodDetail")}}>
                    <img src="https://i.pinimg.com/1200x/48/9c/39/489c3910a3e65a3c8eacfbec586cb0f9.jpg" alt="" />
                    <span className="foodName">Sashimi</span>
                    <p className="foodPrice">{price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}</p>
                    <button className="addBtn">Add</button>
                </div>
                <div className="card" onClick={() => {navigate("/menu/foodDetail")}}>
                    <img src="https://i.pinimg.com/736x/30/da/50/30da50228346d0976ff6f87e7eb5db29--dwarf-planet-royalty-free-image.jpg" alt="" />
                    <span className="foodName">Pizza Mozzarella</span>
                    <p className="foodPrice">{price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}</p>
                    <button className="addBtn">Add</button>
                </div>
                <div className="card" onClick={() => {navigate("/menu/foodDetail")}}>
                    <img src="https://i.pinimg.com/originals/46/72/70/467270305df7265e02415e6c24234bd7.jpg" alt="" />
                    <span className="foodName">Hamburger</span>
                    <p className="foodPrice">{price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}</p>
                    <button className="addBtn">Add</button>
                </div>
                <div className="card" onClick={() => {navigate("/menu/foodDetail")}}>
                    <img src="https://i.pinimg.com/1200x/3a/24/5c/3a245c183940e49e02b6780a24380060.jpg" alt="" />
                    <span className="foodName">Pho</span>
                    <p className="foodPrice">{price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}</p>
                    <button className="addBtn">Add</button>
                </div>
                <div className="card" onClick={() => {navigate("/menu/foodDetail")}}>
                    <img src="https://i.pinimg.com/1200x/48/9c/39/489c3910a3e65a3c8eacfbec586cb0f9.jpg" alt="" />
                    <span className="foodName">Sashimi</span>
                    <p className="foodPrice">{price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}</p>
                    <button className="addBtn">Add</button>
                </div>
            </div>
        </div>
    )
}

export default MenuPage