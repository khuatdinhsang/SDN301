import HeaderOnly from "../components/Layout/HeaderOnly";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const publicRoutes = [
    {path: "/", component: HomePage},
    {path: "/login", component: Login, layout: HeaderOnly},
    {path: "/signUp", component: SignUp, layout: HeaderOnly}
]

const privateRoutes = [

]

export {publicRoutes, privateRoutes}