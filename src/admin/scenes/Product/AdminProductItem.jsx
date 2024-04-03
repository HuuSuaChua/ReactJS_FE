import React from 'react'
import { AppUrl } from './../../../Api/AppUrl';
import { Link } from 'react-router-dom';

export default function AdminProductItem(props) {
  var product = props.product
  var stt = props.stt
  var handleDelete = props.handleDelete
  var handlePublish = props.handlePublish
  var myView =product.attributes.publishedAt == null ? (<input type="range" min={0} max={1} value={0} style={{width:'40px'}} onClick={handlePublish} name={product.id}/>):(<input type="range" min={0} max={1} value={1} style={{width:'40px'}} onClick={handlePublish} name={product.id}/>)
  let imageElement;
  if (product.attributes.image && product.attributes.image.data && product.attributes.image.data.length > 0) {
    const imageUrl = AppUrl.ImageURL + product.attributes.image.data[0].attributes.url;
    imageElement = <img style={{ width: '80px', height: '80px' }} src={imageUrl} alt="Sản phẩm" />;
  } else {
    imageElement = <img src="" alt="Hình ảnh chưa có" />;
  }
  return (
    <tr className="odd">
              <td className="dtr-control sorting_1" tabIndex={0}>{stt}</td>
              <td>{product.id}</td>
              <td>{product.attributes.productName}</td>
              <td>{imageElement}</td>
              <td>{product.attributes.price}</td>
              <td>{myView}</td>
              <td style={{fontSize:'1.2em'}}><i class="fas fa-eye view-icon"></i><Link to={'/admin/product/edit/'+ product.id}><i class="fas fa-edit edit-icon"></i></Link><i name={product.id} class="fas fa-trash" onClick={handleDelete}></i></td>
            </tr>
  )
}
