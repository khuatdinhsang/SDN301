import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Loading from "../../Loading"
import "./ProductManager.scss"


function ProductManager(){
    const navigate = useNavigate()
 const [search, setSearch] = useState('')
    const [optionDisplay, setOptionDisplay] = useState('')
    const [optionDisplay1, setOptionDisplay1] = useState('')
    const [category, setCategory] = useState([])
    const [subcategory, setSubcategory] = useState([])
    const [listProduct, setListProduct] = useState([])
    const [loadProduct, setLoadProduct] = useState(false)
    const [loading, setLoading] = useState(false)



    useEffect(() =>{
        axios
        .get('/api/product/getAll')
        .then(res => {
            setListProduct(res.data.data)
            setLoadProduct(true)
        })
    },[])

    useEffect(() => {
        if(optionDisplay === "" || search === ""){
            axios
            .get('/api/product/getAll')
            .then(res => {
                setListProduct(res.data.data)
                setLoadProduct(true)
            })
        }
    },[optionDisplay, search])


     useEffect(() =>{
        window.scrollTo(0,0)

         axios
        .get('/api/category/getAll')
        .then((res) =>{
            setCategory(res.data.data)
            setLoading(true)
        })
        .catch(err => console.log(err))
    
        axios
        .get('/api/product/getAll')
        .then(res => {
            setListProduct(res.data.data)
            setLoading(true)
            // console.log(res.data.data);
        })
        .catch(err => console.log(err))

    },[])

    useEffect(() =>{
        setLoading(false);
        if(optionDisplay===''){
            axios
            .get('/api/product/getAll')
            .then(res => {
                setListProduct(res.data.data)
                setLoading(true)
            })
            .catch(err => console.log(err))
            setOptionDisplay1('')
            setSearch('')
        }else{
            const categoryId = { categoryId: optionDisplay}
            axios
            .put('/api/product/getByCategoryId',categoryId)
            .then(res => {
                setListProduct(res.data.data)
                setLoading(true)
                // console.log(res.data.data);
            })
            .catch(err => console.log(err))

            axios
            .put('/api/subCategory/getByCategoryId', categoryId)
            .then((res) =>{
                setSubcategory(res.data.data)
                setLoading(true)
            })
            .catch(err => console.log(err))

        }
        }, [optionDisplay])

        useEffect(() => {
            setLoading(false);
            if(optionDisplay1 !== ''){
                const categoryId1 = { subCategoryId: optionDisplay1}
                axios
                .put('/api/product/getBySubcategoryId',categoryId1)
                .then(res => {
                    setListProduct(res.data.data)
                    setLoading(true)
                })
                .catch(err => console.log(err))
            }else{
                const categoryId = { categoryId: optionDisplay}
                axios
                .put('/api/product/getByCategoryId',categoryId)
                .then(res => {
                    setListProduct(res.data.data)
                    setLoading(true)
                    // console.log(res.data.data);
                })
                .catch(err => console.log(err))
            }
        },[optionDisplay1])

        useEffect(() =>{
            setLoading(false);
            if(search===''){
                if(optionDisplay !== ''){
                    if(optionDisplay1 !== ''){
                        const categoryId1 = { subCategoryId: optionDisplay1}
                        axios
                        .put('/api/product/getBySubcategoryId',categoryId1)
                        .then(res => {
                            setListProduct(res.data.data)
                            setLoading(true)
                        })
                        .catch(err => console.log(err))
                    }else{
                        const categoryId = { categoryId: optionDisplay}
                        axios
                        .put('/api/product/getByCategoryId',categoryId)
                        .then(res => {
                            setListProduct(res.data.data)
                            setLoading(true)
                            // console.log(res.data.data);
                        })
                        .catch(err => console.log(err))
                    }
                }else{
                    axios
                    .get('/api/product/getAll')
                    .then(res => {
                        setListProduct(res.data.data)
                        setLoading(true)
                    })
                    .catch(err => console.log(err))
                }
            }else{
                if(optionDisplay!==''){
                    const cate = {
                        categoryId: optionDisplay
                    }
                    axios
                    .put('/api/product/getByCategoryId',cate)
                    .then(res => {
                        const listProduct = res.data.data; 
                        const newList = listProduct.filter(product => {
                            return product?.name.includes(search)
                        })
                        setListProduct(newList)
                        setLoading(true)
                    })
                    // console.log(newList);
                }else{
                    axios
                    .get(`/api/product/getAll?page=3&limit=10`)
                    .then(res => {
                        const listProduct = res.data.data;
                        var newListProduct = listProduct.filter(product => {
                            return product?.name.includes(search)
                        })
                        setListProduct(newListProduct)
                        setLoading(true)
                    })
                    .catch(err => console.log(err))
                }
            }
        },[search])

    const handleUpdate = (id) => {
        navigate(`/admin/updateProduct/${id}`)
    }

    return (
        <div className="productsManager">
             
            <h3 className="productsManagerTitle">Products Manager</h3>
            <div className="menuHeader">
                <div className="optionDisplay">
                    <select
                        className="option"
                        value={optionDisplay}
                        onChange={e => setOptionDisplay(e.target.value)}
                    >
                        <option value="">All Products</option>
                       {loading ? category?.map((e) => {
                            return <option value={e?._id} key={e?._id}>{e?.name}</option>
                        } ): <Loading/>}
                    </select>
                    <select
                        className="option"
                        value={optionDisplay1}
                        onChange={e => setOptionDisplay1(e.target.value)}
                        style={optionDisplay === '' ?{'display':"none"}:{'display':"inline-block"}}
                    >
                        <option value="">Choose A Subcategory</option>
                       {loading ?subcategory?.map((e) => {
                            return <option value={e?._id} key={e?._id}>{e?.name}</option>
                        } ):<Loading/>}
                    </select>
                </div>
                <div className="menuSearch">
                    <input 
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="inputSearchMenu"
                        placeholder="Enter name"
                        />
                </div>
            </div>
            {loadProduct ?  <div className="listProducts">
                <div className="addProduct" onClick={() => navigate("/admin/upload")}>
                    <img className="defaultImg" src="https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg" alt="" />
                    <span>Add Product</span>
                </div>
                {listProduct?.map(product => {
                    return (
                        <div className="cardProduct" onClick={() => handleUpdate(product?._id)}>
                            <img className="productImg" src={product?.image} alt="" />
                            <span >{product?.name}</span>
                            <p className="productPrice">{product?.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                        </div>
                    )
                })}
               
               
                
            </div>:<Loading/>}
        </div>
    )
}

export default ProductManager