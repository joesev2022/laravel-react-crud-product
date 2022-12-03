import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {

    const navigate = useNavigate()
    const {id} = useParams()

    const [product, setProduct] = useState({
        name:"",
        description:"",
        photo:"",
        type:"",
        quantity:"",
        price:""
    });

    const [avatar, setAvatar] = useState(true)

    useEffect(()=>{
        getProduct()
    }, [])

    const getProduct = async () => {
        await axios.get(`/api/get_edit_product/${id}`)
            .then(({data})=>{
                setProduct({...product, 
                    name:data.product.name, 
                    description:data.product.description,
                    photo:data.product.photo,
                    type:data.product.type,
                    quantity:data.product.quantity,
                    price:data.product.price
                })
            })
            .catch(({response:{data}})=>{
                toast.fire({
                    icon:'error',
                    title:'Ups... Something went wrong'
                })
                console.log(data);
            })
    }

    const outImage = (img) => {
        return '/upload/'+img
    }

    const changeHandler = (e) => {
        let file = e.target.files[0]
        let limit = 1024 * 1024 * 2
        if (file['size'] > limit) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong',
                footer: 'Why do I have this issue?'
            })
        } else {
            let reader = new FileReader()
            reader.onload = e => {
                setAvatar(false)
                setProduct({...product, photo:reader.result})
            }
            reader.readAsDataURL(file)
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', product.name)
        formData.append('description', product.description)
        formData.append('photo', product.photo)
        formData.append('type', product.type)
        formData.append('quantity', product.quantity)
        formData.append('price', product.price)
        await axios.post(`/api/update_product/${id}`, formData)
            .then((data) => {
                toast.fire({
                    icon: 'success',
                    title: "Product update successfully"
                })
                navigate("/")
            })
            .catch((error) => {

            })
    }

    return (
        <div className='container'>
            <div className='product_edit'>
            <div className='titlebar'>
                    <div className='titlebar_item'>
                        <h1>Edit Product</h1>
                    </div>
                    <div className='titlebar_item'>
                        <button className='btn' onClick={(event => updateProduct(event))}>
                            Update
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
                                            {avatar === true
                                                ?<img src={outImage(product.photo)} width="117px" height="100px"/>
                                                :<img src={product.photo} width="117px" height="100px"/> 
                                            }
                                        </div>
                                    </li>
                                    <li className='image_item'>
                                        <form className='image_item_form'>
                                            <label className='image_item-form--label'>Add Image</label>
                                            <input type="file" className='image_item-form--input' onChange={changeHandler} />
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
                        <button className='btn' onClick={(event => updateProduct(event))}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;
