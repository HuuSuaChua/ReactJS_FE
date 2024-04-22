import React from 'react';
import Product from './Product'

export default function GridView(props) {
  const products = props.products;
  
  const gridView = products === undefined ? "Khong co du lieu": products.map((product) => (
    <div key={product.id} className="grid-item">
      <Product product={product} />
    </div>
  ));

  return (
    <div className="grid-container">
      {gridView}
    </div>
  );
}
