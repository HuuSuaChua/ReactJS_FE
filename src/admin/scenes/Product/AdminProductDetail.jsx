import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productApi } from './../../../Api/productApi';
import Loading from './../../../components/Loading';
import { AppUrl } from './../../../Api/AppUrl';

export default function AdminProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const params = { populate: '*' };
        const response = await productApi.get(id, params);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <Loading />;
  }

  const renderImages = () => {
    if (product.attributes.image && product.attributes.image.data && product.attributes.image.data.length > 0) {
      return product.attributes.image.data.map((image, index) => {
        const imageUrl = AppUrl.ImageURL + image.attributes.url;
        return <img key={index} style={{ width: '80px', height: '80px' }} src={imageUrl} alt={`Hình ảnh ${index + 1}`} />;
      });
    } else {
      return <img src="" alt="Hình ảnh chưa có" />;
    }
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <h2>Product Detail</h2>
        <p><strong>ID:</strong> {product.id}</p>
        <p><strong>Product Name:</strong> {product.attributes.productName}</p>
        <p><strong>Description:</strong> {product.attributes.description}</p>
        <p><strong>Detail:</strong> {product.attributes.detail}</p>
        <p><strong>Price:</strong> {product.attributes.price}</p>
        <p><strong>Images:</strong> {renderImages()}</p>
      </div>
      <Link className='btn btn-primary' to={'/admin/product/page/1'}>Quay về</Link>
    </div>
  );
}
