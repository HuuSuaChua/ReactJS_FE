import React from 'react'
import { Link } from 'react-router-dom';

export default function AdminCategoryItem(props) {
  var category = props.category
  var stt = props.stt
  var handleDelete = props.handleDelete
  var handlePublish = props.handlePublish
  var myView =category.attributes.publishedAt == null ?
(<input type="range" min={0} max={1} value={0} style={{width:'40px'}} onClick={handlePublish} name={category.id}/>):
  (<input type="range" min={0} max={1} value={1} style={{width:'40px'}} onClick={handlePublish} name={category.id}/>)
  return (
    <tr className="odd">
              <td className="dtr-control sorting_1" tabIndex={0}>{stt}</td>
              <td>{category.id}</td>
              <td>{category.attributes.categoryName}</td>
              <td>{myView}</td>
              <td style={{fontSize:'1.2em'}}><Link to={'/admin/category/'+ category.id}><i class="fas fa-eye view-icon"></i></Link><Link to={'/admin/category/edit/'+ category.id}><i class="fas fa-edit edit-icon"></i></Link><i name={category.id} class="fas fa-trash" onClick={handleDelete}></i></td>
            </tr>
  )
}
