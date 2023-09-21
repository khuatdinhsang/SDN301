
import { useLocation, useNavigate } from "react-router"
import "./SideBar.scss"

function SideBar(){
    const location = useLocation();
    const navigate = useNavigate();

    const containPath = (url, path) =>{
        let result = url.includes(path)
        console.log(result);
    }

    return (
        <div className="sideBar">
            <div className="logoSideBar">
                <h1>Hola<b>Food</b></h1>
            </div>
            <div className="listAction ">
                <div className="generalDashboard">
                    <span>Dashboard</span>
                </div>
                <div className="customerManager" >
                    <span>Customers</span>
                </div>
                <div className="orderManager">
                    <span>Orders</span>
                </div>
                <div className="productManager" onClick={() => navigate("/admin/products")}>
                    <span>Products</span>
                </div>
                <div className="addProduct" onClick={() => navigate("/admin/upload")} >
                    <span>Add Product</span>
                    {containPath(location.pathname, 'upload')}
                </div>
            </div>
            <div className="backHome">
                <span className="back" onClick={() => navigate('/')}>Back to home</span>
            </div>
        </div>
    )
}

export default SideBar