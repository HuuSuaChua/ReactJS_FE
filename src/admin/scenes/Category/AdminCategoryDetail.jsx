import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoryApi } from './../../../Api/categoryApi';
import Loading from './../../../components/Loading';

export default function AdminCategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const params = { populate: '*' };
        const response = await categoryApi.get(id, params);
        setCategory(response.data.data);
      } catch (error) {
        console.error('Error fetching category detail:', error);
      }
    };
    fetchCategory();
  }, [id]);

  if (!category) {
    return <Loading/>;
  }
console.log(category)
  return (
    <div className="category-detail-content">
      <div className="category-detail-content">
      <h2>Category Detail</h2>
      <p><strong>ID:</strong> {category.id}</p>
      <p><strong>Category Name:</strong> {category.attributes.categoryName}</p>
      <p><strong>Description:</strong> {category.attributes.description}</p>
    </div>
    <Link className='btn btn-primary' to={'/admin/category/page/1'}>Quay về</Link>
    </div>
  );
}

