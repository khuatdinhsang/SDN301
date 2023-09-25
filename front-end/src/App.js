import axios from "axios"
import { Fragment } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "./components/Layout/DefaultLayout"
import Page404 from "./pages/404Page"
import { publicRoutes } from "./routes"

axios.defaults.baseURL="http://localhost:3001"

function App(){
    return (
    <BrowserRouter>
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) =>{
                    const Page = route.component;
                    let Layout = DefaultLayout;
                    if(route.layout){
                        Layout = route.layout;
                    }else if(route.layout = null){
                        Layout = Fragment;
                    }
                    return (
                        <Route 
                            path={route.path}
                            element = {
                                <Layout>
                                    <Page/>
                                </Layout>
                            }
                            key={index}
                        />
                    )
                })}
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
        <ToastContainer/>
    </BrowserRouter>
    )
}

export default App