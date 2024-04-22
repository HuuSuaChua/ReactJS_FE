import React from 'react'
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className="navbar">
  <div className="navbar-inner">
    <div className="container">
      <a href='#st' data-target=".nav-collapse" data-toggle="collapse" className="btn btn-navbar">
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </a>
      <div className="nav-collapse">
        <ul className="nav">
          <li className="active"><a href="/">Home	</a></li>
          <li ><Link to={'/product'} >Products</Link></li>
          <li ><Link to={'/post'} >Post</Link></li>
          <li ><Link to={'/page'} >Page</Link></li>
          <li ><Link to={'/gridview'} >Grid View</Link></li>
          <li ><Link to={'/weather'} >Weather</Link></li>
          <li ><Link to={'/goldprice'} >Gold Price</Link></li>
          <li ><Link to={'/usdprice'} >USD Price</Link></li>
        </ul>
      </div>
    </div>
  </div>
</div>

  )
}
