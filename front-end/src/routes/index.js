const publicRoutes = [
    { path: "/", component: HomePage },
    { path: "/login", component: Login, layout: HeaderOnly },
    { path: "/signUp", component: SignUp, layout: HeaderOnly },
    { path: "/menu", component: MenuPage },
    { path: "/menu/foodDetail/:slug", component: FoodDetails },
    { path: "/cart", component: CartPage },
    { path: "/payment", component: Payment },
    { path: "/admin/chat", component: ChatStaff, layout: Dashboard },
    { path: "/admin/upload", component: UploadPage, layout: Dashboard },
    { path: "/admin/productsManager", component: ProductManager, layout: Dashboard },
    { path: "/admin/general", component: General, layout: Dashboard },
    { path: "/admin/customerManager", component: CustomerManager, layout: Dashboard },
    { path: "/admin/categoriesManager", component: CategoryManager, layout: Dashboard },
    { path: "/admin/OrderManager", component: OrderManager, layout: Dashboard },
    { path: "/admin/updateProduct/:slug", component: UpdateProduct, layout: Dashboard },
    { path: "/UserDetail/:username", component: UserDetail, layout: HeaderOnly }
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }
