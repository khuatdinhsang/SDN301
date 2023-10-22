

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
