import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch} from "react-redux";
import { addToCart } from "../state/cartSlice"; 
import { useSelector } from "react-redux";
import currency from 'currency.js';
import AuthBox from './AuthBox';
import WatchVN from '../../components/WatchVN';
export default function AppBar() {

var cartItems = useSelector((state) => state.cart.items)
const totalItems = cartItems.reduce((total, item) => {
  return total + item.count;
}, 0);
const total = cartItems.reduce((totalPrice, item) => { 
  console.log(item)
  return totalPrice + item.count * item.attributes.price;
 }, 0);
  return (
    <div className="navbar navbar-inverse navbar-fixed-top">
  <div className="topNav">
    <div className="container">
      <div className="alignR">
        <div className="pull-left socialNw">
          <a href="https://twitter.com/home"><span className="icon-twitter" /></a>
          <a href="https://www.facebook.com/"><span className="icon-facebook" /></a>
          <a href="https://www.youtube.com/"><span className="icon-youtube" /></a>
          <a href="https://www.instagram.com/"><span className="icon-instagram" /></a>
          
        </div>
        <a className="active" href="/"> <span className="icon-home" /> Home</a> 
        <AuthBox/>
        <a href="contact.html"><span className="icon-envelope" /> Contact us</a>
        <Link to='/cart'><span className="icon-shopping-cart" /> {totalItems} Item(s) - <span className="badge badge-warning"> [{currency(total,{ symbol: 'đ', separator: '.', decimal: ',' }).format()}]</span></Link>
        
      </div>
    </div>
  </div>
</div>

  )
}
