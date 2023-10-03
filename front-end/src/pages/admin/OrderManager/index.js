import "../OrderManager/Order.scss";

function OrderManager() {
    return (
        <div className='categoryManager'>
            <div className="listCate">
                <div className="listCateHeader">
                    <input
                        type="text"
                        className="inputSearchCate"
                        placeholder="Search Order"
                    />
                    {/* <button >Add A Category</button> */}
                </div>
                <div className="tableCate">
                    <div className="tableHeader">
                        <div className="nameHeader">
                            <span>Name</span>
                        </div>
                        <div className="phoneHeader">
                            <span>Phone</span>
                        </div>
                        <div className="addressHeader">
                            <span>Address</span>
                        </div>
                        <div className="productHeader">
                            <span>Product</span>
                        </div>
                        <div className="quantityHeader">
                            <span>Quantity</span>
                        </div>
                        <div className="createdAt">
                            <span>Time</span>
                        </div>

                    </div>
                    <div className="tableBody">
                        <div className="rowBody">
                            <div className="nameBody">
                                <span>Vuong</span>
                            </div>
                            <div className="phoneBody">
                                <span>012345678</span>
                            </div>
                            <div className="addressBody">
                                <span>Ha Noi</span>
                            </div>
                            <div className="productBody">
                                <img src="https://cdn.tgdd.vn/2021/05/CookRecipe/Avatar/banh-mi-thit-bo-nuong-thumbnail-1.jpg" alt="" />
                            </div>
                            <div className="quantityBody">
                                <span>2</span>
                            </div>
                            <div className="createAtBody">
                                <span>2023</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="listSubCate">
                <div className="listSubCateHeader">
                    <input
                        type="text"
                        className="inputSearchSubCate"
                        placeholder="Search SubCategory"
                    />
                    <button >Add A Subcategory</button>
                </div>
                <div className="tableSubCate">
                    <div className="tableHeader">
                        <div className="nameHeader">
                            <span>Name</span>
                        </div>
                        <div className="phoneHeader">
                            <span>Phone</span>
                        </div>
                        <div className="addressHeader">
                            <span>Address</span>
                        </div>
                        <div className="productHeader">
                            <span>Product</span>
                        </div>
                        <div className="quantityHeader">
                            <span>Quantity</span>
                        </div>
                        <div className="createdAt">
                            <span>Time</span>
                        </div>

                    </div>
                    <div className="tableBody">
                        <div className="rowBody">
                            <div className="nameBody">
                                <span>Dong</span>
                            </div>
                            <div className="phoneBody">
                                <span>012345678</span>
                            </div>
                            <div className="addressBody">
                                <span>Ha Noi</span>
                            </div>
                            <div className="productBody">
                                <img src="https://cdn.tgdd.vn/2021/05/CookRecipe/Avatar/banh-mi-thit-bo-nuong-thumbnail-1.jpg" alt="" />
                            </div>
                            <div className="quantityBody">
                                <span>2</span>
                            </div>
                            <div className="createAtBody">
                                <span>2023</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderManager;