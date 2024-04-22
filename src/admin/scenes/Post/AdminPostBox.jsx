import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AdminPostItem from './AdminPostItem'; // Import AdminPostItem component
import Loading from './../../../components/Loading';
import Paginate from './../../../components/Paginate';
import { postApi } from './../../../Api/postApi';

export default function AdminPostBox() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [msgSuccess, setSuccessMsg] = useState('');
  const [msgWarning, setWarningMsg] = useState('');
  const [loadData, setLoadData] = useState(1);
  const [viewOption, setViewOption] = useState('preview');
  const { pageNum } = useParams();

  // Handle view option change
  const handleSelect = (e) => {
    setViewOption(e.target.value);
  };

  // Handle publish post
  const handlePublish = async (id) => {
    try {
      const data = {
        "data": {
          "publishedAt": posts.find(post => post.id === id).attributes.publishedAt ? null : Date.now()
        }
      };
      await postApi.update(id, data);
      setLoadData(loadData + 1);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Handle delete post
  const handleDelete = async (id) => {
    const c = window.confirm('Delete post?');
    if (c) {
      try {
        await postApi.del(id);
        setSuccessMsg('Delete success: ' + id);
        setLoadData(loadData + 1);
      } catch (error) {
        setWarningMsg('Delete error: ' + id + ' ' + error);
      }
    }
  };

  // Fetch posts data from API
  const fetchData = async () => {
    try {
      const params = {
        populate: '*',
        pagination: {
          page: pageNum ? parseInt(pageNum) : 1,
          pageSize: 5 // Number of items per page
        },
        publicationState: viewOption,
      };
      const response = await postApi.getAll(params);
      setPosts(response.data.data);
      setTotalPage(response.data.meta.pagination.pageCount);
    } catch (error) {
      console.error('Error fetching data:', error);
      setWarningMsg('Could not fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load data when component is rendered or dependencies change
  useEffect(() => {
    fetchData();
  }, [pageNum, loadData, viewOption]);

  return (
    <div className="card-body">
      {/* Display success and warning messages */}
      <div className="col-12">
        <p className='bg-success'>{msgSuccess}</p>
        <p className='bg-warning'>{msgWarning}</p>
      </div>
      {/* Filter and create new post section */}
      <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Link to='/admin/post/add' className="btn btn-primary">Create Post</Link>
          </div>
          <div className="col-sm-12 col-md-6">
            <div id="example1_filter" className="dataTables_filter">
              <div className="col-12">
                {/* Select view option */}
                <select onChange={handleSelect}>
                  <option value='preview'>Preview</option>
                  <option value='live'>Live</option>
                </select>
              </div>
              <label>Search:<input type="search" style={{width:'100px'}} className="form-control form-control-sm" placeholder aria-controls="example1" /></label>
            </div>
          </div>
        </div>
        {/* Table displaying list of posts */}
        <div className="row">
          <div className="col-sm-12">
            <table id="example1" className="table table-bordered table-striped dataTable dtr-inline" aria-describedby="example1_info">
              <thead>
                <tr>    
                  <th>STT</th>
                  <th>Post Id</th>
                  <th>Post Name</th>
                  <th>Detail</th>
                  <th>Public</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Display list of posts */}
                {loading ? <Loading /> : posts.map((post, index) => (
                  <AdminPostItem key={post.id} stt={(parseInt(pageNum) - 1) * 5 + index + 1} post={post} handleDelete={handleDelete} handlePublish={handlePublish} />
                ))}
              </tbody>
            </table>
          </div>
          {/* Display pagination */}
          <Paginate totalPages={totalPage} currentPage={parseInt(pageNum) || 1} basePath='http://localhost:3000/admin/post/page/' />
        </div>
      </div>
    </div>
  );
}
