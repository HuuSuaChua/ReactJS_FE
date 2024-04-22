import React, { useEffect, useState } from 'react'
import PostBox from './../../components/PostBox';
import Loading from './../../components/Loading';
import { postApi } from './../../Api/postApi';
import Filter from './Filter';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';

export default function PostList() {
  
var {pageNum} = useParams()
var [posts, setPosts] = useState({})
var [loading, setLoading] = useState(true);
var [filterkey, setFilterkey] = useState('')
var [totalPage,setTotalPage] = useState(1)
const handleFilterByName = (e) => {
  setFilterkey(e.target.value)
}
var params = {
  populate:'*',
  pagination:{
    page: pageNum ? pageNum : 1,
    pageSize : 4
  },
  filters:{
    postName:{
      $contains: filterkey ? filterkey: null,
    },
  }
  // 'pagination[page]' : pageNum ? pageNum : 1,
  // 'pagination[pageSize]' : 12,
  // 'filters[postName][$contains]': filterkey ? filterkey: null,
  // 'filters[price][$lt]': maxPrice ? maxPrice: 100000
}

var myView2 = loading === true ? <Loading/> : <PostBox posts={posts} />

  useEffect(() => {
    const fetchData = async () => {
    var response2 = await postApi.getAll(params)
    setPosts (response2.data.data)
    console.log("a",response2)
    setTotalPage (response2.data.meta.pagination.pageCount)
    setLoading(false);
    }
    fetchData()
    }, [pageNum , filterkey])
return (
    <div className="row">
  <div className="span9">
    <Filter handleFilterByName={handleFilterByName} />
    {myView2}
    <Paginate totalPages={totalPage} currentPage={pageNum?pageNum:1} basePath='http://localhost:3000/posts/page/'/>
  </div>
</div>

  )
}
