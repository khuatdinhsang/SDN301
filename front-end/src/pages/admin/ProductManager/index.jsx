import { useNavigate } from "react-router"
import "./ProductManager.scss"


function ProductManager(){
    const navigate = useNavigate()
    const price = 50000

    return (
        <div className="productsManager">
            <h3 className="productsManagerTitle">Products Manager</h3>
            <div className="listProducts">
                <div className="addProduct" onClick={() => navigate("/admin/upload")}>
                    <img className="defaultImg" src="https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg" alt="" />
                    <span>Add Product</span>
                </div>
                <div className="cardProduct">
                    <img className="productImg" src="https://i.pinimg.com/736x/30/da/50/30da50228346d0976ff6f87e7eb5db29--dwarf-planet-royalty-free-image.jpg" alt="" />
                    <span >Pizza Mozzarella</span>
                    <p className="productPrice">{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                </div>
                <div className="cardProduct">
                    <img className="productImg" src="https://i.pinimg.com/736x/30/da/50/30da50228346d0976ff6f87e7eb5db29--dwarf-planet-royalty-free-image.jpg" alt="" />
                    <span >Pizza Mozzarella</span>
                    <p className="productPrice">{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                </div>
                <div className="cardProduct">
                    <img className="productImg" src="https://i.pinimg.com/736x/30/da/50/30da50228346d0976ff6f87e7eb5db29--dwarf-planet-royalty-free-image.jpg" alt="" />
                    <span >Pizza Mozzarella</span>
                    <p className="productPrice">{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                </div>
                <div className="cardProduct">
                    <img className="productImg" src="https://i.pinimg.com/736x/30/da/50/30da50228346d0976ff6f87e7eb5db29--dwarf-planet-royalty-free-image.jpg" alt="" />
                    <span >Pizza Mozzarella</span>
                    <p className="productPrice">{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                </div>
                <div className="cardProduct">
                    <img className="productImg" src="https://i.pinimg.com/736x/30/da/50/30da50228346d0976ff6f87e7eb5db29--dwarf-planet-royalty-free-image.jpg" alt="" />
                    <span >Pizza Mozzarella</span>
                    <p className="productPrice">{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                </div>
                <div className="cardProduct">
                    <img className="productImg" src="https://i.pinimg.com/736x/30/da/50/30da50228346d0976ff6f87e7eb5db29--dwarf-planet-royalty-free-image.jpg" alt="" />
                    <span >Pizza Mozzarella</span>
                    <p className="productPrice">{price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                </div>
                
            </div>
        </div>
    )
}

export default ProductManager