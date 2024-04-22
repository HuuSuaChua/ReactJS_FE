import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postApi } from './../../Api/postApi';
import Loading from './../../components/Loading';


export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const params = { populate: '*' };
        const response = await postApi.get(id, params);
        setPost(response.data.data);
      } catch (error) {
        console.error('Error fetching post detail:', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <Loading/>;
  }

  return (
    <div className="post-detail-content">
      <div className="post-detail-content">
      <h2>Post Detail</h2>
      <p><strong>ID:</strong> {post.id}</p>
      <p><strong>Post Name:</strong> {post.attributes.postName}</p>
      <p><strong>Description:</strong> {post.attributes.Decription}</p>
      <p><strong>Detail:</strong> {post.attributes.Detail}</p>
      </div>
      <Link className='btn btn-primary' to={'/post'}>Quay về</Link>
    </div>
  );
}

