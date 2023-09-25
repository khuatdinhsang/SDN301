import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import './UploadPage.scss'

function UploadPage(){

    const [name,setName] = useState('')
    const [price, setPrice] = useState('')
    const [type, setType] = useState(0)
    const [img, setImg] = useState('')

    useEffect(() =>{

    },[])

    const navigate = useNavigate()

    const handleUpload = () =>{
        if(!name || !price || type===0){
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
                    <label htmlFor='inputType'>Type</label>
                    <select 
                        className='inputType' 
                        id='inputType' 
                        value={type}
                        onChange={e => setType(e.target.value)}>
                        <option value="0">Choose a category</option>
                        <option value="1">Rice</option>
                        <option value="2">FastFood</option>
                        <option value="3">Drink</option>
                    </select>
                </div>
                <div className="inputBox">
                    <label htmlFor="">Image</label>
                    <input 
                        type="file"
                        className='inputImg'
                        onChange={e => setImg(e.target.files[0])}/>
                </div>
                <div className="submitForm">
                    <button className='uploadBtn' onClick={handleUpload}>Upload</button>
                </div>

            </div>

        </div>  
    )
}

export default UploadPage