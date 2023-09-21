import Dashboard from "../components/Layout/Dashboard";
import HeaderOnly from "../components/Layout/HeaderOnly";
import ProductManager from "../pages/admin/ProductManager";
import UploadPage from "../pages/admin/UploadPage";
import CartPage from "../pages/CartPage";
import FoodDetails from "../pages/FoodDetails";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import MenuPage from "../pages/MenuPage";
import SignUp from "../pages/SignUp";

const publicRoutes = [
    {path: "/", component: HomePage},
    {path: "/login", component: Login, layout: HeaderOnly},
    {path: "/signUp", component: SignUp, layout: HeaderOnly},
    {path: "/menu", component: MenuPage},
    {path: "/menu/foodDetail", component: FoodDetails},
    {path: "/admin/upload", component:UploadPage, layout: Dashboard},
    {path: "/admin/products", component: ProductManager, layout: Dashboard},
    {path: "/cart", component: CartPage}
]

const privateRoutes = [

]

export {publicRoutes, privateRoutes}