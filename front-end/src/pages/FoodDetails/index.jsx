import { useState } from 'react';
import StarsRating from 'react-star-rate'
import './FoodDetails.scss'

function FoodDetails(){

    const [number, setNumber] = useState(1)
    const [star, setStar] = useState(5)
    const [foodSize, setFoodSize] = useState('0')
    
    const [ratingStar, setRatingStar] = useState(0)
    const [commentContent, setCommentContent] = useState('')
    const handleSubmit = () => {
        console.log(commentContent);
    }

    let price = 50000;

    return (
        <div className="detailContent">
            <div className="topDetail">
                <div className='foodDetail'>
                    <div className='imgDetail'>
                        <img src="https://i.pinimg.com/736x/30/da/50/30da50228346d0976ff6f87e7eb5db29--dwarf-planet-royalty-free-image.jpg" alt="" />
                    </div>
                    <div className="inforDetail">
                        <span className='detailTitle'>Pizza Mozzarella</span>
                        <p className='detailPrice'>
                            {price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                        </p>
                        <div className='star'>
                            <StarsRating
                                value={star}
                                disabled='true'
                            />
                        </div>
                        <select className='foodSize' defaultValue={foodSize} onChange={e => {setFoodSize(e.target.value); console.log(e.target.value);}}>
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
                        <button className='addFood'>Add to Cart</button>
                    </div>
                </div>
            </div>
            <div className="bottomDetail">
                <h3>Similar Product</h3>
                <div className='listSimilarProduct'>
                    <div className="cardSimilar">
                        <img className='imgCardSimilar' src="https://i.pinimg.com/736x/30/da/50/30da50228346d0976ff6f87e7eb5db29--dwarf-planet-royalty-free-image.jpg" alt="" />
                        <span className='detailTitle'>Pizza Mozzarella</span>
                        <p className='detailPrice'>
                            {price.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </p>
                    </div>
                    <div className="cardSimilar">
                        <img className='imgCardSimilar' src="https://i.pinimg.com/736x/30/da/50/30da50228346d0976ff6f87e7eb5db29--dwarf-planet-royalty-free-image.jpg" alt="" />
                        <span className='detailTitle'>Pizza Mozzarella</span>
                        <p className='detailPrice'>
                            {price.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </p>
                    </div>
                    <div className="cardSimilar">
                        <img className='imgCardSimilar' src="https://i.pinimg.com/736x/30/da/50/30da50228346d0976ff6f87e7eb5db29--dwarf-planet-royalty-free-image.jpg" alt="" />
                        <span className='detailTitle'>Pizza Mozzarella</span>
                        <p className='detailPrice'>
                            {price.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </p>
                    </div>
                    <div className="cardSimilar">
                        <img className='imgCardSimilar' src="https://i.pinimg.com/736x/30/da/50/30da50228346d0976ff6f87e7eb5db29--dwarf-planet-royalty-free-image.jpg" alt="" />
                        <span className='detailTitle'>Pizza Mozzarella</span>
                        <p className='detailPrice'>
                            {price.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </p>
                    </div>
                    
                    
                    
                </div>
            </div>
            <div className="comment">
                <hr style={{marginBottom: 20}} />
                    <div className='actionComment'>
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
                                <button
                                    className='submitComment'
                                    onClick={() => handleSubmit()}
                                 >Comment</button>
                            </div>
                    </div>
            </div>
        </div>
    )
}

export default FoodDetails