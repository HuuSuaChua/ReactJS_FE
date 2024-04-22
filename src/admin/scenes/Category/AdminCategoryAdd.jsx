import React from 'react'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react';
import { validateCategory } from './../../../helpers/validate';
import { categoryApi } from './../../../Api/categoryApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
export default function AdminCategoryAdd() {
  const [data, setData] = useState({
    "categoryName":"",
    "description":"",
    });
    const handleSubmit = (e) => {
      e.preventDefault();
      var err = (validateCategory(data))
      if (err === '') {
        const addCategory = async (data) => {
          var sendData = {
            "data": data
          }
          try {
              const response = await categoryApi.add(sendData);
              console.log(response)
            if (response.status == '200') toast.success('thanh cong');
            document.getElementById('createCategory').reset();
            setData({ categoryName:'',
            description:'',
            })
          }
          catch (error) {
            toast.error('bi loi', error)
          }
      }
      addCategory(data);
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
    <div className='row'>
      <div className='col-7'>
 <form id='createCategory' onSubmit={handleSubmit}>
  <div className="form-group row">
    <label htmlFor="categoryName" className="col-4 col-form-label">Category Name</label> 
    <div className="col-8">
      <input id="categoryName" name="categoryName" placeholder="categoryName" type="text" className="form-control" required="required" onChange={handleChange} />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="description" className="col-4 col-form-label">description</label> 
    <div className="col-8">
      <textarea id="description" name="description" onChange={handleChange} cols={40} rows={5} className="form-control" defaultValue={""} />
    </div>
  </div>
  <div className="form-group row">
    <div className="offset-4 col-8">
      <button name="submit" type="submit" className="btn btn-primary">Submit</button>
    </div>
    <Link className='btn btn-primary' to={'/admin/category/page/1'}>Quay về</Link>
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
  )
}
