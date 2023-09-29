import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import StarsRating from 'react-star-rate'
import { toast } from 'react-toastify';
import { addDetail } from '../../actions/cartAction';
import './FoodDetails.scss'

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

    const account = useSelector(state => state.account)

    const dispatch = useDispatch();
    const { slug } = useParams()
    const navigate = useNavigate()    

    useEffect(() => {
        window.scrollTo(0,0)

        axios
        .get(`/api/product/${slug}`)
        .then(res =>{
            setFoodDetail(res.data.data);
            setStar(res.data.data.rate)
            // setStar(res.data.data.rate)
            // console.log(res.data.data);
        })
        .catch(err => console.log(err))

    },[])

    useEffect(() => {
        axios
            .get(`/api/feedback/getByProductId/${foodDetail?._id}`)
            .then(res => {
                setCommentList(res.data.data)
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
            })
            .catch(err => console.log(err + "Can not get Similar Food"))
        
    },[foodDetail])

    useEffect(() => {

        number<1?setNumber(1):setNumber(number)
    },[number])

    const handleFileUpload =(e) => {
        setImage(e.target.files[0])

         const fileImg = e.target.files[0];

            fileImg.preview = URL.createObjectURL(fileImg)

            setShowImgUpload(fileImg)
    }

    const handleSubmit = () => {
        if(!ratingStar || !commentContent ){
            toast.warning("Please rating and comment a feedback!")
        }else{
            // const data = new FormData();
            // data.append("file",image);
            // data.append("upload_preset", "seafood");
            // data.append("cloud_name", "dggciohw8");  

            // fetch("https://api.cloudinary.com/v1_1/dggciohw8/image/upload", {
            //         method: "post",
            //         body: data,
            //     })
            //     .then((res) => res.json())
            //     .then((data) => {
                
            //     // console.log(data.url);
            //     toast('Comment successfully!')
            //     .catch(err => console.log(err + "Can not comment"))
            // });     
            const feedbackProduct = {
                    productId:"650970444a77aa24a8710950",
                    content:"hang nay hong roi",
                    image:"https://www.vietnamfineart.com.vn/wp-content/uploads/2023/03/hinh-anh-girl-xau-gai-xau-nhat-2.png",
                    rate:5
                }

                axios
                .post('/api/feedback/create/', feedbackProduct)
                .then((res) => {
                    // setCommentContent('');
                    // setRatingStar()
                    // setImage()
                    // setShowImgUpload()
                    // console.log(foodDetail?._id);
                    // toast('success')
                    
                })
                .catch(err => console.log("Can not comment"))

               
        }
        
    }

    const handleSimilarProduct = (productId) => {
        navigate(`/menu/foodDetail/${productId}`)
        // console.log(productId);
    }

    const handleAddtoCart = () =>{
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

    

    let price = 50000;

    return (
        <div className="detailContent">
            <div className="topDetail">
                <div className='foodDetail'>
                    <div className='imgDetail'>
                        <img src={foodDetail?.image} alt="" />
                    </div>
                    <div className="inforDetail">
                        <span className='detailTitle'>{foodDetail?.name}</span>
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
            </div>
            <div className="bottomDetail">
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
            </div>
            <div className="comment">
                <hr style={{marginBottom: 20}} />
                    <div className='actionComment' style={account?.username !== undefined? {"display": "flex"}: {"display": "none"}}>
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
            </div>

            <div className="listComment">
                {commentList?.map((comment, index) => {
                    return (
                        <div className="commentUser" key={index}>
                            <div className="leftCommentUser">
                                <img src={comment?.image} alt="" />
                            </div>
                            <div className="rightCommentUser">
                                <span className='userComment'>Vuong</span>
                                <StarsRating
                                    value={star}
                                    disabled="true"
                                />
                                <p className='textComment' >{comment?.content}</p>
                            </div>
                        </div>
                    )
                })}
              
            </div>
        </div>
    )
}

export default FoodDetails