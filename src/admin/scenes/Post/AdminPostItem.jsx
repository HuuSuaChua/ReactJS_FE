import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminPostItem(props) {
  const { post, stt, handleDelete, handlePublish } = props;

  const togglePublish = () => {
    handlePublish(post.id);
  };

  // Hàm này sẽ hiển thị 5 ký tự đầu tiên của chuỗi và dấu ... nếu chuỗi vượt quá 5 ký tự
  const formatDetail = (detail) => {
    if (detail.length > 5) {
      return detail.substring(0, 5) + '...';
    } else {
      return detail;
    }
  };

  const myView = post.attributes.publishedAt == null ?
    (<input type="range" min={0} max={1} value={0} style={{ width: '40px' }} onClick={togglePublish} name={post.id} />) :
    (<input type="range" min={0} max={1} value={1} style={{ width: '40px' }} onClick={togglePublish} name={post.id} />);
console.log('name',post)
  return (
    <tr className="odd">
      <td className="dtr-control sorting_1" tabIndex={0}>{stt}</td>
      <td>{post.id}</td>
      <td>{post.attributes.postName}</td>
      <td>{formatDetail(post.attributes.Detail)}</td>
      <td>{myView}</td>
      <td style={{ fontSize: '1.2em' }}>
        <Link to={`/admin/post/${post.id}`}><i className="fas fa-eye view-icon"></i></Link>
        <Link to={`/admin/post/edit/${post.id}`}><i className="fas fa-edit edit-icon"></i></Link>
        <i name={post.id} className="fas fa-trash" onClick={() => handleDelete(post.id)}></i>
      </td>
    </tr>
  );
}
