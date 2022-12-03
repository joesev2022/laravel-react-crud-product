import axios from 'axios';
import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const NewProduct = () => {

    const navigate = useNavigate()

    const [product, setProduct] = useState({
        name:"",
        description:"",
        photo:"",
        type:"",
        quantity:"",
        price:""
    });

    const changeHandler = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        let limit = 1024 * 1024 * 2
        if (file['size'] > limit) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong',
                footer: 'Why do I have this issue?'
            })
        }
        reader.onloadend = (file) => {
            setProduct({...product, photo:reader.result})
        }
        reader.readAsDataURL(file)
    }

    const createProduct = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', product.name)
        formData.append('description', product.description)
        formData.append('photo', product.photo)
        formData.append('type', product.type)
        formData.append('quantity', product.quantity)
        formData.append('price', product.price)
        await axios.post("/api/add_product/", formData)
            .then(({data}) => {
                toast.fire({
                    icon:'success',
                    title:'Product add successfully'
                })
                navigate('/')
            })
            .catch(({response}) => {
                toast.fire({
                    icon:'error',
                    title:'Ups... Something went wrong'
                })
                console.log(response);
            })
    }

    return (
        <div className='container'>
            <div className='products_create'>
                
                <div className='titlebar'>
                    <div className='titlebar_item'>
                        <h1>Add Product</h1>
                    </div>
                    <div className='titlebar_item'>
                        <button className='btn' onClick={(event)=>createProduct(event)}>
                            Save
                        </button>
                    </div>
                </div>

                <div className='card_wrapper'>
                    <div className='wrapper_left'>
                        <div className='card'>
                            <p>Name</p>
                            <input type="text" value={product.name} onChange={(event)=>{setProduct({...product, name:event.target.value})}}/>

                            <p>Description (Optional)</p>
                            <textarea cols="10" rows="5" value={product.description} onChange={(event)=>{setProduct({...product, description:event.target.value})}}></textarea>

                            <div className='media'>
                                <ul className='images_list'>
                                    <li className='image_item'>
                                        <div className='image_item_img'>
                                            <img src={product.photo === "" ? null : product.photo} width="117px" height="100px"/>
                                        </div>
                                    </li>
                                    <li className='image_item'>
                                        <form className='image_item_form'>
                                            <label className='image_item-form--label'>Add Image</label>
                                            <input type="file" className='image_item-form--input' onChange={changeHandler}/>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='wrapper_right'>
                        <div className='card'>
                            <p>Product Type</p>
                            <input type="text" value={product.type} onChange={(event)=>{setProduct({...product, type:event.target.value})}}/>

                            <hr className='hr'></hr>

                            <p>Inventory</p>
                            <input type="text" value={product.quantity} onChange={(event)=>{setProduct({...product, quantity:event.target.value})}}/>

                            <hr className='hr'></hr>

                            <p>Price</p>
                            <input type="text" value={product.price} onChange={(event)=>{setProduct({...product, price:event.target.value})}}/>

                            <div className='br'></div>
                        </div>
                    </div>
                </div>

                <div className='titlebar'>
                    <div className='titlebar_item'>
                        
                    </div>
                    <div className='titlebar_item'>
                        <button className='btn' onClick={(event)=>createProduct(event)}>
                            Save
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default NewProduct;
