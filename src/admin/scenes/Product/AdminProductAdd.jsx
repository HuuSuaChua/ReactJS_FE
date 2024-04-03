import React from 'react'
import { ToastContainer } from 'react-toastify'
import CategorySelect from '../../../components/CategorySelect'
import { useState } from 'react';
import { validateProduct } from './../../../helpers/validate';
import { productApi } from './../../../Api/productApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUpload from './../../../components/FileUpload';
import { AppUrl } from './../../../Api/AppUrl';
export default function AdminProductAdd() {
  const [data, setData] = useState({
    "productName":"",
    "description":"",
    "detail": "",
    "category":"",
    "price":"",
    "image": ["1", "2"],
    });
    const handleSubmit = (e) => {
      e.preventDefault();
      var err = (validateProduct(data))
      if (err == '') {
        const addProduct = async (data) => {
          var sendData = {
            "data": data
          }
          try {
              const response = await productApi.add(sendData);
              console.log(response)
            if (response.status == '200') toast.success('thanh cong');
            document.getElementById('createProduct').reset();
            setData({ productName:'',
            description:'',
            category:'',
            price:'',
            image: [1, 2],})
          }
          catch (error) {
            toast.error('bi loi', error)
          }
      }
      addProduct(data);
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
    <div className='row'>
      <div className='col-7'>
 <form id='createProduct' onSubmit={handleSubmit}>
  <div className="form-group row">
    <label htmlFor="productName" className="col-4 col-form-label">Product Name</label> 
    <div className="col-8">
      <input id="productName" name="productName" placeholder="productName" type="text" className="form-control" required="required" onChange={handleChange} />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="description" className="col-4 col-form-label">description</label> 
    <div className="col-8">
      <textarea id="description" name="description" onChange={handleChange} cols={40} rows={5} className="form-control" defaultValue={""} />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="detail" className="col-4 col-form-label">detail</label> 
    <div className="col-8">
      <textarea id="detail" name="detail" onChange={handleChange} cols={40} rows={5} className="form-control" defaultValue={""} />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="price" className="col-4 col-form-label">price</label> 
    <div className="col-8">
      <input id="price" name="price" onChange={handleChange} type="text" className="form-control" required="required" />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="select" className="col-4 col-form-label">category</label> 
    <div className="col-8">
      <CategorySelect handleChange={handleChange}/>
    </div>
  </div> 
  <div className="form-group row">
    <div className="offset-4 col-8">
      <button name="submit" type="submit" className="btn btn-primary">Submit</button>
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
  )
}
