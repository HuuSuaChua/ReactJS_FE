import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { validatePost } from './../../../helpers/validate';
import { postApi } from './../../../Api/postApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default function AdminPostAdd() {
  const [data, setData] = useState({
    "postName": "",
    "Decription": "",
    "Detail": ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validatePost(data);
    if (err === '') {
      try {
        const response = await postApi.add({ data });
        if (response.status === 200) {
          toast.success('Thêm bài viết thành công');
          document.getElementById('createPost').reset();
          setData({ postName:'', Decription:'', Detail:'' });
        } else {
          const responseData = await response.json();
          if (responseData && responseData.error && responseData.error.message) {
            toast.error(responseData.error.message);
          } else {
            toast.error('Có lỗi xảy ra khi thêm bài viết');
          }
        }
      } catch (error) {
        console.error('Lỗi khi thêm bài viết:', error);
        toast.error('Có lỗi xảy ra khi thêm bài viết');
      }
    } else {
      toast.error(err);
    }
  };
  
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className='row'>
      <div className='col-7'>
        <form id='createPost' onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="postName" className="col-4 col-form-label">Post Name</label> 
            <div className="col-8">
              <input id="postName" name="postName" placeholder="postName" type="text" className="form-control" required="required" onChange={handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="Decription" className="col-4 col-form-label">Description</label> 
            <div className="col-8">
              <textarea id="Decription" name="Decription" onChange={handleChange} cols={40} rows={5} className="form-control" defaultValue={""} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="Detail" className="col-4 col-form-label">Detail</label> 
            <div className="col-8">
              <textarea id="Detail" name="Detail" onChange={handleChange} cols={40} rows={5} className="form-control" defaultValue={""} />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-4 col-8">
              <button name="submit" type="submit" className="btn btn-primary">Submit</button>
            </div>
            <Link className='btn btn-primary' to={'/admin/post/page/1'}>Quay về</Link>
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
  );
}
