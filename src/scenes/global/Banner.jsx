import React from 'react'
import { Link } from 'react-router-dom';
import WatchVN from '../../components/WatchVN';
export default function Banner() {
  return (
    <header id="header">
  <div className="row">
    <div className="span4">
      <h1>
        <Link className="logo" to={'/'}><span>React Shop</span> 
          <img src="/app/assets/img/logo-bootstrap-shoping-cart.png" alt="bootstrap sexy shop" />
        </Link>
      </h1>
    </div>
    <div className="span4">
      <div className="offerNoteWrapper">
        <h1 className="dotmark">
          <i className="icon-cut" />
          Thương hiệu quý tộc Shop Hàng Hiệu
        </h1>
      </div>
        <WatchVN/>
    </div>
    <div className="span4 alignR">
      <p><br /> <strong> Support (24/7) :  0937492470 </strong><br /><br /></p>
      <span className="btn btn-mini">[ 2 ] <span className="icon-shopping-cart" /></span>
      <span className="btn btn-warning btn-mini">$</span>
      <span className="btn btn-mini">£</span>
      <span className="btn btn-mini">€</span>
    </div>
  </div>
</header>

  )
}
