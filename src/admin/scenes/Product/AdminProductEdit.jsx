import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import CategorySelect from '../../../components/CategorySelect'
import { useState } from 'react';
import { validateProduct } from './../../../helpers/validate';
import { productApi } from './../../../Api/productApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUpload from './../../../components/FileUpload';
import { AppUrl } from './../../../Api/AppUrl';
import { useParams } from 'react-router-dom';
export default function AdminProductEdit() {
  const { id } = useParams();
  const [data, setData] = useState({
    "productName":"",
    "description":"",
    "detail": "",
    "category":"",
    "price":"",
    "image": ["1", "2"],
    });
    useEffect(()=>{
      const fetchData = async () =>{
        var params ={
          populate:'*'
        }
        var response = await productApi.get(id,params)
        var oldProduct = response.data.data
        setData({
          "productName": oldProduct.attributes.productName,
          "description": oldProduct.attributes.description,
          "category": oldProduct.attributes.category.data.id,
          "price": oldProduct.attributes.price,
          'image': oldProduct.attributes.image.data.map((img) => (img.id))
          })
        var oldImages = oldProduct.attributes.image.data.map((img) => {
            return (
            {
              id: img.id,
              url: img.attributes.url
            }
            )
            })
            setImages([...oldImages])
      }
      fetchData();
    },[id])
    const handleSubmit = (e) => {
      e.preventDefault();
      var err = (validateProduct(data))
      if (err == '') {
        const updateProduct = async (id,data) => {
          var sendData = {
            "data": data
          }
          try {
              document.getElementById('submit').innerText ='Update Product...';
              const response = await productApi.update(id,sendData);
              console.log(response)
            if (response.status == '200') toast.success('Success!');
            document.getElementById('editProduct').reset();
            document.getElementById('submit').innerText ='Submit'
            setData({ productName:'',
            description:'',
            category:'',
            price:'',
            image: [1, 2],})
          }
          catch (error) {
            toast.error('Error', error)
          }
        }
        updateProduct(id,data);
      }
      else {
          toast.error(err);
          return false;
      }
    }
    const handleChange = (event)=> {
      setData({
      ...data,
      [event.target.name]: event.target.value
      })
      }
      const [images,setImages] = useState([]);
      const addImage = (id, url) => {
        setData({
            ...data,
            "image":
            [...data.image,
                 id
            ]
        })
        setImages([
          ...images,
          {
            id: id,
            url: url
          }
        ])
        }
        const handleRemove = (e) => {
          var id = e.target.name;
          setData({
          ...data,
          'image': data.image.filter((img) => {
          return img != id
          })
          })
          setImages(images.filter((img) => {
          return img.id != id
          }))
        }
        var myViewImage = images.length == 0 ? 'no image': images.map((img) => {
          return( 
          <div>
            <img src={AppUrl.ImageURL + img.url} alt='hinh'  style={{margin:'5px',width:'100px',height:'100px'}}/>
            <button className='btn' name={img.id} onClick={handleRemove}>Remove</button>
          </div>
                )
        })
  return (
      <div>
    <div className='row'>
      <div className='col-7'>
      <div className='row'><h2>Edit Product</h2></div>
 <form id='editProduct' onSubmit={handleSubmit}>
  <div className="form-group row">
    <label htmlFor="productName" className="col-4 col-form-label">Product Name</label> 
    <div className="col-8">
      <input id="productName" name="productName" placeholder="productName" type="text" className="form-control" required="required" onChange={handleChange} value={data.productName} />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="description" className="col-4 col-form-label">description</label> 
    <div className="col-8">
      <textarea id="description" name="description" onChange={handleChange} cols={40} rows={5} className="form-control" value={data.description} />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="detail" className="col-4 col-form-label">detail</label> 
    <div className="col-8">
      <textarea id="detail" name="detail" onChange={handleChange} cols={40} rows={5} className="form-control" value={data.detail} />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="price" className="col-4 col-form-label">price</label> 
    <div className="col-8">
      <input id="price" name="price" onChange={handleChange} type="text" className="form-control" required="required" value={data.price} />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="select" className="col-4 col-form-label">category</label> 
    <div className="col-8">
      <CategorySelect handleChange={handleChange} defaultValue={data.category}/>
    </div>
  </div> 
  <div className="form-group row">
    <div className="offset-4 col-8">
      <button id="submit" type="submit" className="btn btn-primary">Submit</button>
    </div>
  </div>
</form>
      </div>
      <div className='col-5'>
        <FileUpload addImage={addImage} />
        <div id='upLoadImgs'>{myViewImage}</div>
      </div>
 


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
    </div>
  )
}
