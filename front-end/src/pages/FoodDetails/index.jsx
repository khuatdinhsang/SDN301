import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import StarsRating from 'react-star-rate'
import { toast } from 'react-toastify';
import { addDetail } from '../../actions/cartAction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Loading from '../Loading';
import './FoodDetails.scss'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function FoodDetails(){

    const [number, setNumber] = useState(1)
    const [star, setStar] = useState(5)
    const [foodSize, setFoodSize] = useState('0')
    const [ratingStar, setRatingStar] = useState()
    const [commentContent, setCommentContent] = useState('')
    const [foodDetail, setFoodDetail] = useState()
    const [image, setImage] = useState();
    const [showImgUpload, setShowImgUpload] = useState()
    const [commentList, setCommentList] = useState([])
    const [similarProduct, setSimilarProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingSimilar, setLoadingSimilar] = useState(false)
    const [loadingComment, setLoadingComment] = useState(false)
    const [isComment, setIsComment] = useState(false)
    const [loadingUpload, setLoadingUpload] = useState(true)
    const [isDelete, setIsDelete] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [idDelete, setIdDelete] = useState()

    const account = useSelector(state => state.account)

    const dispatch = useDispatch();
    const { slug } = useParams()
    const navigate = useNavigate()    

    useEffect(() => {
        window.scrollTo(0,0)
        setLoading(false)

        axios
        .get(`/api/product/${slug}`)
        .then(res =>{
            setFoodDetail(res.data.data);
            setStar(res.data.data.rate)
            setLoading(true)
            // setStar(res.data.data.rate)
            // console.log(res.data.data);
        })
        .catch(err => console.log(err))

    },[slug])

    useEffect(() => {
        axios
            .get(`/api/feedback/getByProductId/${foodDetail?._id}`)
            .then(res => {
                setCommentList(res.data.data)
                setLoadingComment(true)
            })
            .catch(err => console.log(err + "Can not get Comment List"))
        

        const subCategory = {
            subCategoryId: foodDetail?.subCategoryId._id
        }
        axios
            .put(`/api/product/getBySubcategoryId`,subCategory)
            .then(res => {
                const newList = res.data.data.filter(item => {
                    return item?._id !== foodDetail?._id 
                })
                setSimilarProduct(newList)
                setLoadingSimilar(true)
            })
            .catch(err => console.log(err + "Can not get Similar Food"))
        
    },[foodDetail])

    useEffect(() => {
        axios
            .get(`/api/feedback/getByProductId/${foodDetail?._id}`)
            .then(res => {
                setCommentList(res.data.data)
                setLoadingComment(true)
            })
            .catch(err => console.log(err + "Can not get Comment List"))
        
    },[isComment])

    useEffect(() => {

        number<1?setNumber(1):setNumber(number)
    },[number])

    useEffect(()=>{
        setLoadingComment(false)
         axios
            .get(`/api/feedback/getByProductId/${foodDetail?._id}`)
            .then(res => {
                setCommentList(res.data.data)
                setLoadingComment(true)
            })
            .catch(err => console.log(err + "Can not get Comment List"))
    },[isDelete])

    const handleFileUpload =(e) => {
        setImage(e.target.files[0])

         const fileImg = e.target.files[0];

            fileImg.preview = URL.createObjectURL(fileImg)

            setShowImgUpload(fileImg)
    }

    const handleSubmit = () => {
        if(!ratingStar || !commentContent  || !image){
            toast.warning("Please rating and comment a feedback!")
        }else{
            setLoadingUpload(false)
            const data = new FormData();
            data.append("file",image);
            data.append("upload_preset", "seafood");
            data.append("cloud_name", "dggciohw8");  

            fetch("https://api.cloudinary.com/v1_1/dggciohw8/image/upload", {
                    method: "post",
                    body: data,
                })
                .then((res) => res.json())
                .then((data) => {
                     const feedbackProduct = {
                        productId:`${slug}`,
                        content: commentContent,
                        image: data.url,
                        rate: +ratingStar
                    }

                    axios
                    .post('/api/feedback/create/', feedbackProduct, {
                        headers: {
                            Authorization: `Bearer ${account?.accessToken}`
                        }
                    })
                    .then((res) => {
                        setCommentContent('');
                        setRatingStar(0)
                        setImage()
                        setShowImgUpload()
                        setIsComment(!isComment)
                        setLoadingUpload(true)                          
                        toast.success("Comment Succesfully")    
                    })
                    .catch(err => console.log("Can not comment"))
            })
             .catch(err => console.log(err + "Can not comment"))
          
        }
        
    }

    const handleDeleteComment = (id) => {
        setModalDelete(!modalDelete)
        setIdDelete(id)
    }

    const submitDelete = () => {
        axios
        .delete(`/api/feedback/delete/${idDelete}`,{
             headers: {
                Authorization: `Bearer ${account?.accessToken}`
            }
        })
        .then(res => {
            setIsDelete(!isDelete)
            setModalDelete(!modalDelete)
            toast.success("Delete Comment successfully!")
        })
        .catch(err => console.log(err + "Can not delete comment"))
    }



    const handleEditComment = ( ) => {

    }


    const handleSimilarProduct = (productId) => {
        navigate(`/menu/foodDetail/${productId}`)
        // console.log(productId);
    }

    const handleAddtoCart = () =>{
        if(foodDetail?.quantity <= 0 ){
            toast.warning(`${foodDetail?.name} is sold out`)
        }else if(account?.username === undefined){
            toast.warning("You have to login to add food!")
        } else{
            const newItem = {
                _id: foodDetail?._id,
                name: foodDetail?.name,
                price: foodDetail?.price,
                image: foodDetail?.image,
                description: foodDetail?.description,
                total: +number,
                totalPrice: foodDetail?.price * +number,
            }
            const action = addDetail(newItem);
            // console.log(newItem);
            dispatch(action);
            toast.success(`Add ${foodDetail?.name} to cart successfully!`)
        }
    }

    

    let price = 50000;

    return (
        <div className="detailContent">
            
            {loading ? <div className="topDetail">
                <div className='foodDetail'>
                    <div className='imgDetail'>
                        <img src={foodDetail?.image} alt="" />
                    </div>
                    <div className="inforDetail">
                        <span className='detailTitle'>{foodDetail?.name}</span>
                        {foodDetail?.quantity <= 0 ?<p className='soldOut'>SOLD OUT</p>:'' }
                        <p className='detailPrice'>
                            {foodDetail?.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                        </p>
                        <div className='star'>
                            <StarsRating
                                value={star}
                                disabled='true'
                            />
                        </div>
                        <select className='foodSize' defaultValue={foodSize} onChange={e => {setFoodSize(e.target.value); }}>
                            <option value="0">Choose an option</option>
                            <option value="1">S</option>
                            <option value="2">M</option>
                            <option value="3">L</option>
                        </select>
                        <input 
                            type="number"
                            className='numberFood'
                            value={number}
                            onChange={(e)=>{setNumber(e.target.value)}}/>
                        <button className='addFood' onClick={() => {handleAddtoCart()}}>Add to Cart</button>
                    </div>
                </div>
            </div>: <Loading/>}
            {loadingSimilar? <div className="bottomDetail">
                <h3>Similar Product</h3>
                <div className='listSimilarProduct'>
                    {similarProduct.map((product, index) => {
                        return (
                             index<4? (
                             <div className="cardSimilar" key={product?._id} >
                                <img className='imgCardSimilar' src={product?.image} alt="" onClick={() => handleSimilarProduct(product?._id)} />
                                <span className='detailTitle'>{product?.name}</span>
                                <p className='detailPrice'>
                                    {price.toLocaleString("vi", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </p>
                            </div>) : ''
                        )
                    } )}
                   
                    
                    
                </div>
            </div>: <Loading/>}
            { loadingUpload?
            <div className="comment">
                <hr style={{marginBottom: 20}} />
                    <div className='actionComment'  style={account?.username !== undefined? {"display": "flex"}: {"display": "none"}}>
                            <div className="leftComment">
                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                            </div>
                            <div className="rightComment">
                                <StarsRating
                                value={ratingStar}
                                onChange={(value) => setRatingStar(value)}
                                 />
                               <textarea
                                    className='textComment' 
                                    rows="6"
                                    value={commentContent}
                                    onChange={(e) => setCommentContent(e.target.value)}   
                                ></textarea>
                                <div className="uploadImg">
                                    <input 
                                        type="file"
                                        className='inputImg'
                                        onChange={handleFileUpload}/>
                                    {showImgUpload && (
                                        <img src={showImgUpload.preview} alt='' width={"100%"}/>
                                    )}
                                </div>
                                <button
                                    className='submitComment'
                                    onClick={() => handleSubmit()}
                                 >Comment</button>

                            </div>
                    </div>
            </div>:<Loading/>}

            {loadingComment?<div className="listComment">
                {commentList?.map((comment, index) => {
                    return (
                        <div className="commentUser" key={index}>
                            <div className="leftCommentUser">
                                <img src={comment?.image} alt="" />
                            </div>
                            <div className="rightCommentUser">
                                <span className='userComment'>Vuong</span>
                                <StarsRating
                                    value={comment?.rate}
                                    disabled="true"
                                />
                                <p className='textComment' >{comment?.content}</p>
                            </div>
                            <div className="endCommentUser">
                                <EditIcon 
                                    className='editIcon' 
                                    style={account?.username !== undefined? {"display": "inline-block"}: {"display": "none"}}
                                    onClick={() => handleEditComment()}    
                                />
                                <DeleteForeverIcon
                                    className='deleteIcon' 
                                    style={account?.username !== undefined? {"display": "inline-block"}: {"display": "none"}}
                                    onClick={() => handleDeleteComment(comment?._id)}
                                />
                            </div>
                        </div>
                    )
                })}
              
            </div>:<Loading/>}
            {modalDelete?<section className='popUp'>
                <span className="overlay"></span>

                <div className="modal-box">
                    <CheckCircleOutlineIcon className='checkIcon'/>
                    <h2>Confirm Delete</h2>
                    <h3>Do you absolutely want to delete your comment?</h3>

                    <div className="buttons">
                        <button className="close-btn" onClick={() => setModalDelete(false)}>No, Thanks</button>
                        <button className="open-btn" onClick={() => submitDelete()}>Confirm</button>
                    </div>
                </div>
            </section>:''}
        </div>
    )
}

export default FoodDetails