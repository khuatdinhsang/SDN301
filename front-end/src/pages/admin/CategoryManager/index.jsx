import './CategoryManager.scss'

function CategoryManager(){
    return(
        <div className='categoryManager'>
            <div className="listCate">
                <div className="listCateHeader">
                    <input 
                        type="text"
                        className="inputSearchCate"
                        placeholder="Search Category"
                    />
                    <button >Add A Category</button>
                </div>
                <div className="tableCate">
                    <div className="tableHeader">
                        <div className="nameHeader">
                            <span>Category Name</span>
                        </div>
                        <div className="createAtHeader">
                            <span>Create At</span>
                        </div>
                        <div className="imageHeader">
                            <span>Image</span>
                        </div>
                        <div className="handleBox">
                        </div>
                    </div>
                    <div className="tableBody">
                        <div className="rowBody">
                            <div className="nameBody">
                                <span>Food</span>
                            </div>
                            <div className="createAtBody">
                                <span>2023</span>
                            </div>
                            <div className="imageBody">
                                <img src="https://cdn.tgdd.vn/2021/05/CookRecipe/Avatar/banh-mi-thit-bo-nuong-thumbnail-1.jpg" alt="" />
                            </div>
                            <div className="handleBoxBody">
                                <button>Change</button>
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
                            <span>Subcategory Name</span>
                        </div>
                        <div className="createAtHeader">
                            <span>Create At</span>
                        </div>
                        <div className="imageHeader">
                            <span>Image</span>
                        </div>
                        <div className="handleBox">
                        </div>
                    </div>
                    <div className="tableBody">
                        <div className="rowBody">
                            <div className="nameBody">
                                <span>Food</span>
                            </div>
                            <div className="createAtBody">
                                <span>2023</span>
                            </div>
                            <div className="imageBody">
                                <img src="https://cdn.tgdd.vn/2021/05/CookRecipe/Avatar/banh-mi-thit-bo-nuong-thumbnail-1.jpg" alt="" />
                            </div>
                            <div className="handleBoxBody">
                                <button>Change</button>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryManager