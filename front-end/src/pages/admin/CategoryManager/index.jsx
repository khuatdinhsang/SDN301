// import './CategoryManager.scss'

// function CategoryManager(){
//     return(
//         <div className='categoryManager'>
//             <div className="listCate">
//                 <div className="listCateHeader">
//                     <input 
//                         type="text"
//                         className="inputSearchCate"
//                         placeholder="Search Category"
//                     />
//                     <button >Add A Category</button>
//                 </div>
//                 <div className="tableCate">
//                     <div className="tableHeader">
//                         <div className="nameHeader">
//                             <span>Category Name</span>
//                         </div>
//                         <div className="createAtHeader">
//                             <span>Create At</span>
//                         </div>
//                         <div className="imageHeader">
//                             <span>Image</span>
//                         </div>
//                         <div className="handleBox">
//                         </div>
//                     </div>
//                     <div className="tableBody">
//                         <div className="rowBody">
//                             <div className="nameBody">
//                                 <span>Food</span>
//                             </div>
//                             <div className="createAtBody">
//                                 <span>2023</span>
//                             </div>
//                             <div className="imageBody">
//                                 <img src="https://cdn.tgdd.vn/2021/05/CookRecipe/Avatar/banh-mi-thit-bo-nuong-thumbnail-1.jpg" alt="" />
//                             </div>
//                             <div className="handleBoxBody">
//                                 <button>Change</button>
//                             </div>
//                         </div>
                       
//                     </div>
//                 </div>
//             </div>
//             <div className="listSubCate">
//                 <div className="listSubCateHeader">
//                     <input 
//                         type="text"
//                         className="inputSearchSubCate"
//                         placeholder="Search SubCategory"
//                     />
//                     <button >Add A Subcategory</button>
//                 </div>
//                 <div className="tableSubCate">
//                     <div className="tableHeader">
//                         <div className="nameHeader">
//                             <span>Subcategory Name</span>
//                         </div>
//                         <div className="createAtHeader">
//                             <span>Create At</span>
//                         </div>
//                         <div className="imageHeader">
//                             <span>Image</span>
//                         </div>
//                         <div className="handleBox">
//                         </div>
//                     </div>
//                     <div className="tableBody">
//                         <div className="rowBody">
//                             <div className="nameBody">
//                                 <span>Food</span>
//                             </div>
//                             <div className="createAtBody">
//                                 <span>2023</span>
//                             </div>
//                             <div className="imageBody">
//                                 <img src="https://cdn.tgdd.vn/2021/05/CookRecipe/Avatar/banh-mi-thit-bo-nuong-thumbnail-1.jpg" alt="" />
//                             </div>
//                             <div className="handleBoxBody">
//                                 <button>Change</button>
//                             </div>
//                         </div>
                       
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CategoryManager

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Loading from '../../Loading';
import './CategoryManager.scss';

function CategoryManager() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loadCategories, setLoadCategories] = useState(false);

  useEffect(() => {
    axios
      .get('/api/categories/getAll') // Thay YOUR_API_ENDPOINT bằng địa chỉ URL của API danh mục của bạn
      .then((res) => {
        setCategories(res.data.data);
        setLoadCategories(true);
      });
  }, []);

  const handleUpdate = (id) => {
    navigate(`/admin/updateCategory/${id}`);
  }

  return (
    <div className="categoryManager">
      <h3 className="categoryManagerTitle">Category Manager</h3>
      {loadCategories ? (
        <div className="listCategories">
          <div className="addCategory" onClick={() => navigate('/admin/createCategory')}>
            <img className="defaultImg" src="https://thegirlonbloor.com/wp-content/uploads/2021/07/Summer-Drinks-14-500x500.jpg" alt="" /> {/* Thay URL_DEFAULT_IMAGE bằng URL hình ảnh mặc định */}
            <span>Add Category</span>
          </div>
          {categories?.map((category) => {
            return (
              <div className="cardCategory" onClick={() => handleUpdate(category?._id)}>
                <img className="categoryImg" src={category?.image} alt="" />
                <span>{category?.name}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default CategoryManager;
