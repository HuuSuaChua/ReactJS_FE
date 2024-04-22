import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react';
import { validateCategory } from './../../../helpers/validate';
import { categoryApi } from './../../../Api/categoryApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
export default function AdminCategoryEdit() {
  const { id } = useParams();
  const [data, setData] = useState({
    "categoryName":"",
    "description":"",
    });
    useEffect(()=>{
      const fetchData = async () =>{
        var params ={
          populate:'*'
        }
        var response = await categoryApi.get(id,params)
        var oldCategory = response.data.data
        setData({
          "categoryName": oldCategory.attributes.categoryName,
          "description": oldCategory.attributes.description,
          })
      }
      fetchData();
    },[id])
    const handleSubmit = (e) => {
      e.preventDefault();
      var err = (validateCategory(data))
      if (err == '') {
        const updateCategory= async (id,data) => {
          var sendData = {
            "data": data
          }
          try {
              document.getElementById('submit').innerText ='Update Category...';
              const response = await categoryApi.update(id,sendData);
              console.log(response)
            if (response.status == '200') toast.success('Success!');
            document.getElementById('editCategory').reset();
            document.getElementById('submit').innerText ='Submit'
            setData({ categoryName:'',
            description:'',
          })
          }
          catch (error) {
            toast.error('Error', error)
          }
        }
        updateCategory(id,data);
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
        
       
  return (
      <div>
    <div className='row'>
      <div className='col-7'>
      <div className='row'><h2>Edit Category</h2></div>
 <form id='editCategory' onSubmit={handleSubmit}>
  <div className="form-group row">
    <label htmlFor="categoryName" className="col-4 col-form-label">Category Name</label> 
    <div className="col-8">
      <input id="categoryName" name="categoryName" placeholder="categoryName" type="text" className="form-control" required="required" onChange={handleChange} value={data.categoryName} />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="description" className="col-4 col-form-label">description</label> 
    <div className="col-8">
      <textarea id="description" name="description" onChange={handleChange} cols={40} rows={5} className="form-control" value={data.description} />
    </div>
  </div>
  <div className="form-group row">
    <div className="offset-4 col-8">
      <button id="submit" type="submit" className="btn btn-primary">Submit</button>
    </div>
  </div>
</form>
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
