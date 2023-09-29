import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import './UploadPage.scss'

function UploadPage(){

    const [name,setName] = useState('')
    const [price, setPrice] = useState('')
    const [type, setType] = useState('')
    const [img, setImg] = useState('')
    const [showImg, setShowImg] = useState()
    const [typeSubcategory, setTypeSubcategory] = useState('')
    const [category, setCategory] = useState([])
    const [subcategory, setSubcategory] = useState([])

    useEffect(() =>{
        axios
        .get('/api/category/getAll')
        .then((res) =>{
            setCategory(res.data.data)
        })
        .catch(err => console.log(err))

        axios
        .get('/api/subCategory/getAll')
        .then((res) =>{
            setSubcategory(res.data.data)
        })
        .catch(err => console.log(err))
    },[])
    
    useEffect(() => {

        // Clean up
        return () => {
           showImg && URL.revokeObjectURL(showImg.preview)
        }
    }, [showImg])

    const handleFileUpload = (e) => {
            setImg(e.target.files[0])
            const fileImg = e.target.files[0];

            fileImg.preview = URL.createObjectURL(fileImg)

            setShowImg(fileImg)
    }

    const navigate = useNavigate()

    const handleUpload = () =>{
        if(!name || !price || !type || !typeSubcategory){
            toast.warning("An Inforation is blank!")
        }else{
            const data = new FormData();
            data.append("file",img);
            data.append("upload_preset", "seafood");
            data.append("cloud_name", "dggciohw8");      
            
             fetch("https://api.cloudinary.com/v1_1/dggciohw8/image/upload", {
                method: "post",
                body: data,
            })
            .then((res) => res.json())
            .then((data) => {
            // const newProduct = {
            //     name: name, 
            //     price: price, 
            //     type: type, 
            //     img: data.url
            // };
            console.log(data.url);

            // axios.post()
            });           
        }

    }

    return (
       <div className="uploadPage">
            <div className='uploadContain'>
                <h3 className="uploadTitle">Upload Product</h3>
                <div className="uploadContent">
                    <div className="inputBox">
                        <label htmlFor='inputName'>Name</label>
                        <input 
                            type="text" 
                            className='inputName' 
                            id='inputName' 
                            placeholder='Enter Food Name' 
                            value={name}
                            onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputPrice'>Price</label>
                        <input 
                            type="number"  
                            className='inputPrice' 
                            id='inputPrice' 
                            placeholder='Enter Food Price'
                            value={price}
                            onChange={e => setPrice(e.target.value)}/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputType'>Category</label>
                        <select 
                            className='inputType' 
                            id='inputType' 
                            value={type}
                            onChange={e => setType(e.target.value)}>
                            
                            <option value="">Choose a category</option>
                            {category?.map((e) => {
                                return <option value={e?._id} key={e?._id}>{e?.name}</option>
                            } )}
                        </select>
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputTypeSub'>Subcategory</label>
                        <select 
                            className='inputTypeSub' 
                            id='inputTypeSub' 
                            value={typeSubcategory}
                            onChange={e => setTypeSubcategory(e.target.value)}>
                            <option value="">Choose a category</option>
                            {subcategory?.map(e => {
                                return <option value={e?._id} key={e?._id}>{e?.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="">Image</label>
                        <input 
                            type="file"
                            className='inputImg'
                            onChange={handleFileUpload}/>
                    </div>
                    <div className="inputBox">
                        {showImg && (
                            <img src={showImg.preview} alt='' width={"100%"}/>
                        )}
                    </div>
                    <div className="submitForm">
                        <button className='uploadBtn' onClick={handleUpload}>Upload</button>
                    </div>

                </div>

            </div>  
       </div>
    )
}

export default UploadPage