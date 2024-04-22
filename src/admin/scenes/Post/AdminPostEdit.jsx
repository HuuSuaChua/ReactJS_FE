import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react';
import { validatePost } from './../../../helpers/validate';
import { postApi } from './../../../Api/postApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
export default function AdminPostEdit() {
  const { id } = useParams();
  const [data, setData] = useState({
    "postName": "",
    "Decription": "",
    "Detail": ""
    });
    useEffect(()=>{
      const fetchData = async () =>{
        var params ={
          populate:'*'
        }
        var response = await postApi.get(id,params)
        var oldPost = response.data.data
        setData({
          "postName": oldPost.attributes.postName,
          "Decription": oldPost.attributes.Decription,
          "Detail": oldPost.attributes.Detail,
          })
      }
      fetchData();
    },[id])
    const handleSubmit = (e) => {
      e.preventDefault();
      var err = (validatePost(data))
      if (err == '') {
        const updatePost= async (id,data) => {
          var sendData = {
            "data": data
          }
          try {
              document.getElementById('submit').innerText ='Update Post...';
              const response = await postApi.update(id,sendData);
              console.log(response)
            if (response.status == '200') toast.success('Success!');
            document.getElementById('editPost').reset();
            document.getElementById('submit').innerText ='Submit'
            setData({ postName:'',
            Decription:'',
            Detail:'',
          })
          }
          catch (error) {
            toast.error('Error', error)
          }
        }
        updatePost(id,data);
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
      <div className='row'><h2>Edit Post</h2></div>
 <form id='editPost' onSubmit={handleSubmit}>
  <div className="form-group row">
    <label htmlFor="postName" className="col-4 col-form-label">Post Name</label> 
    <div className="col-8">
      <input id="postName" name="postName" placeholder="postName" type="text" className="form-control" required="required" onChange={handleChange} value={data.postName} />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="Decription" className="col-4 col-form-label">Decription</label> 
    <div className="col-8">
      <textarea id="Decription" name="Decription" onChange={handleChange} cols={40} rows={5} className="form-control" value={data.Decription} />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="Detail" className="col-4 col-form-label">Detail</label> 
    <div className="col-8">
      <textarea id="Detail" name="Detail" onChange={handleChange} cols={40} rows={5} className="form-control" value={data.Detail} />
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
