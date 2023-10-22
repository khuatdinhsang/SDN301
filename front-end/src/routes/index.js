import Dashboard from "../components/Layout/Dashboard";
import HeaderOnly from "../components/Layout/HeaderOnly";
import CategoryManager from "../pages/admin/CategoryManager";
import CustomerManager from "../pages/admin/CustomerManager";
import General from "../pages/admin/General";
import ProductManager from "../pages/admin/ProductManager";
import UploadPage from "../pages/admin/UploadPage";
import CartPage from "../pages/CartPage";
import FoodDetails from "../pages/FoodDetails";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import MenuPage from "../pages/MenuPage";
import Payment from "../pages/Payment";
import SignUp from "../pages/SignUp";
import OrderManager from "../pages/admin/OrderManager";
import UpdateProduct from "../pages/admin/ProductManager/UpdateProduct";

const publicRoutes = [
    {path: "/", component: HomePage},
    {path: "/login", component: Login, layout: HeaderOnly},
    {path: "/signUp", component: SignUp, layout: HeaderOnly},
    {path: "/menu", component: MenuPage},
    {path: "/menu/foodDetail/:slug", component: FoodDetails},
    {path: "/cart", component: CartPage},
    {path: "/payment", component: Payment},
    {path: "/admin/upload", component:UploadPage, layout: Dashboard},
    {path: "/admin/productsManager", component: ProductManager, layout: Dashboard},
    {path: "/admin/general", component: General, layout: Dashboard},
    {path: "/admin/customerManager", component: CustomerManager, layout: Dashboard},
    {path: "/admin/categoriesManager", component: CategoryManager, layout: Dashboard}
]

const privateRoutes = [

]

export {publicRoutes, privateRoutes}