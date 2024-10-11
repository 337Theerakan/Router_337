import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.products); 
  const id = parseInt(productId);


  if (isNaN(id)) {
    return <h2 className="text-red-500 text-center text-3xl mt-6">Invalid Product ID</h2>;
  }

  const product = productList.find(p => p.id === id); 

  if (!product) {
    return <h2 className="text-red-500 text-center text-3xl mt-6">Product not found</h2>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-2xl text-gray-700 mt-2">Price: <span className="text-blue-600">{product.price}</span></p>
          <p className="text-gray-600 mt-4">{product.description}</p>
        </div>
        <div className="flex justify-center p-4">
          <button 
            onClick={() => navigate('/')} 
            className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition duration-200"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
