import React, { useEffect, useState } from 'react'
import CategoryMenu from './CategoryMenu'
import Loading from './../../components/Loading';
import { categoryApi } from './../../Api/categoryApi';
import { productApi } from './../../Api/productApi';
import Filter from './Filter';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';
import GridView from './../../components/GridView';

export default function GridViewList() {
  
var {pageNum} = useParams()
var [categories, setCategories] = useState({})
var [products, setProducts] = useState({})
var [loading, setLoading] = useState(true);
var [filterkey, setFilterkey] = useState('')
var [maxPrice, setMaxPrice] = useState(null)
var [category, setCategory] = useState(null)
var [totalPage,setTotalPage] = useState(1)
const handleFilterByName = (e) => {
  setFilterkey(e.target.value)
}
const handleFilterByCategory = (e) => {
  if (e.target.innerText === 'All Category') 
  setCategory(null) 
  else setCategory(e.target.innerText);
console.log(category)
}
const handleFilterByMaxPrice = (e) => {
  setMaxPrice(e.target.value)
}
var params = {
  populate:'*',
  pagination:{
    page: pageNum ? pageNum : 1,
    pageSize : 4
  },
  filters:{
    productName:{
      $contains: filterkey ? filterkey: null,
    },
    price:{
      $lt: maxPrice ? maxPrice: null
    },
    category:{
      categoryName:{
        $eq: category ? category : null
      }
    }
  }
  // 'pagination[page]' : pageNum ? pageNum : 1,
  // 'pagination[pageSize]' : 12,
  // 'filters[productName][$contains]': filterkey ? filterkey: null,
  // 'filters[price][$lt]': maxPrice ? maxPrice: 100000
}

var myView1 = loading === true ? <Loading /> : <CategoryMenu categories={categories} handleFilterByCategory={handleFilterByCategory}/>
var myView2 = loading === true ? <Loading/> : <GridView products={products} />

  useEffect(() => {
    const fetchData = async () => {
    var response1 = await categoryApi.getAll();
    var response2 = await productApi.getAll(params);
    setCategories (response1.data.data)
    setProducts (response2.data.data)
   
    setTotalPage (response2.data.meta.pagination.pageCount)
    setLoading(false);
    }
    fetchData()
    }, [pageNum , filterkey,maxPrice,category])
return (
    <div className="row">
  <div id="sidebar" className="span3">
    {myView1 }
  </div>
  <div className="span9">
    <Filter handleFilterByName={handleFilterByName} handleFilterByMaxPrice={handleFilterByMaxPrice} handleFilterByCategory={handleFilterByCategory}/>
    {myView2}
    <Paginate totalPages={totalPage} currentPage={pageNum?pageNum:1} basePath='http://localhost:3000/gridview/page/'/>
  </div>
</div>

  )
}
