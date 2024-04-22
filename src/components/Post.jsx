import React from 'react';
import { Link } from 'react-router-dom';
import { AppUrl } from '../Api/AppUrl';
import currency from 'currency.js';
import { useDispatch } from "react-redux";
import { addToCart } from "../scenes/state/cartSlice"; 

export default function Post(props) {
  const dispatch = useDispatch();
  const post = props.post;
  
  // Hàm để giới hạn chiều dài của detail và thêm dấu ...
  const limitDetailLength = (detail, maxLength) => {
    if (detail.length > maxLength) {
      return detail.substring(0, maxLength) + '...';
    } else {
      return detail;
    }
  };

  return (
    <div className="thumbnail" style={{ height: '100px' }}>  
      <div className="caption cntr">
        <Link to={'/post/' + post.id}><p>{post.attributes.postName}</p></Link>
        <div className="actionList">
          <Link to={'/post/' + post.id}><p>{limitDetailLength(post.attributes.Detail, 10)}</p></Link>
        </div> 
        <br className="clr" />
      </div>
    </div>
  );
}
