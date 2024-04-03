import AdminProductItem from './AdminProductItem';
import React,{ useState } from 'react';
import Loading from './../../../components/Loading';
import { productApi } from './../../../Api/productApi';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Paginate from './../../../components/Paginate';

export default function AdminProductBox() {
  var [products, setProducts] = useState({})
  var [loading, setLoading] = useState(true);
  var [totalPage, setTotalPage] = useState(1)
  const [msgSuccess, setSuccessMsg] = useState('')
  const [msgWarning, setWarningMsg] = useState('')
  const [loadData, setLoadData] = useState(1);
  const [viewOption, setViewOption] = useState('preview');
  var { pageNum }= useParams()
  const handleSelect = (e) => {
    setViewOption(e.target.value)
  }
  const handlePublish = (e) => {
    var data = {
      "data": {
      "publishedAt": e.target.value == 0 ? Date.now() : null,
      }
    }
    const togglePublish = async (e) => {
    await productApi.update(e.target.getAttribute('name'), data)
    setLoadData(loadData + 1)
    }
    togglePublish(e)
  } 
  const handleDelete = (e) => {
    const deleteProduct = async (id) => {
      var c = window.confirm('delete product?')
      if (c== true)
        try {
          e.target.classList.remove('fa-trash');
          e.target.classList.add('fa-spinner');
          await productApi.del(id)
          e.target.classList.remove('fa-trash');
          e.target.classList.add('fa-spinner');
          setSuccessMsg('Delete success:' + id);
          setLoadData(loadData + 1);
        }
        catch (error) {
          setWarningMsg('Delete error:' + id + error)
        }
        finally {
          window.scroll(0, 0)
        }
    }
      deleteProduct(e.target.getAttribute('name'))
  }
  var params = {
    populate:'*',

    pagination:{
      page: pageNum ? pageNum : 1,
      pageSize : 4
    },
    publicationState: viewOption,
  }
  var myView = loading === true ? <Loading/> : products.map((product,i) =>(
  <AdminProductItem key={product.id} stt={(pageNum-1)*5+i + 1} product={product} handleDelete={handleDelete} handlePublish={handlePublish}/>
  ))
  useEffect(() => {
    const fetchData = async () => {
    var response = await productApi.getAll(params);
    console.log(response)
    setProducts (response.data.data) 
    setTotalPage(response.data.meta.pagination.pageCount);
    setLoading(false);
    }
    fetchData()
    }, [pageNum ,loadData,viewOption]);
  return (
 <div className="card-body">
    <div className="col-12">
        <p className='bg-success'>{msgSuccess}</p>
        <p className='bg-warning'>{msgWarning}</p>
    </div>
  <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4"><div className="row">
    <div className="col-sm-12 col-md-6">
      <Link to='/admin/product/add' className="btn btn-primary">Create Product</Link>
    </div>
                <div className="col-sm-12 col-md-6">
                  <div id="example1_filter" className="dataTables_filter">
                  <div className="col-12">
                    <select onChange={handleSelect}>
                      <option value='preview'>Preview</option>
                      <option value='live'>Live</option>
                    </select>
                  </div>
                    <label>Search:<input type="search" style={{width:'100px'}} className="form-control form-control-sm" placeholder aria-controls="example1" /></label>
                </div>
                </div>
                </div>
                <div className="row"><div className="col-sm-12"><table id="example1" className="table table-bordered table-striped dataTable dtr-inline" aria-describedby="example1_info">
          <thead>
            <tr>    
              <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">STT</th>
              <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">Product Id</th>
              <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">Product Name</th>
              <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Browser: activate to sort column ascending">Image</th>
              <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Platform(s): activate to sort column ascending">Price</th>
              <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Engine version: activate to sort column ascending">Public</th>
              <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="CSS grade: activate to sort column ascending">Action</th></tr>
          </thead>
          <tbody>
            {myView}
          </tbody>
        </table>
        
        </div>
        <Paginate totalPages={totalPage} currentPage={pageNum?pageNum:1} basePath='http://localhost:3000/admin/product/page/'/>
        </div></div>
</div>
  )
}
