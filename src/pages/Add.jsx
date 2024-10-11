import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../features/productSlice';

const handleAddProduct = () => {
    dispatch(addProduct({ id: " " , name: 'Product 6', price: '$60', description: 'This is the sixth product.' }));
  };

  