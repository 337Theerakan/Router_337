import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';
import { Dialog, Transition } from '@headlessui/react';

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();

  const handleAddProduct = (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const price = parseFloat(priceRef.current.value);
    const description = descriptionRef.current.value.trim();

    if (name && !isNaN(price) && description) {
      const newId = productList.length > 0 ? Math.max(...productList.map(product => product.id)) + 1 : 1;

      dispatch(addProduct({
        id: newId,
        name,
        price: `$${price}`,
        description,
      }));
      resetForm();
      setOpen(false);
      navigate('/');
    } else {
      alert("Please provide valid product details.");
    }
  };

  const resetForm = () => {
    nameRef.current.value = '';
    priceRef.current.value = '';
    descriptionRef.current.value = '';
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  const renderProductLink = (product) => (
    <Link to={`/product/${product.id}`} className="text-blue-600 hover:underline text-2xl"> 
      {product.name} - {product.price}
    </Link>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">Product List</h2>
      <ul className="mb-6 space-y-4">
        {productList.map(product => (
          <li key={product.id} className="flex justify-between items-center border-b py-3 bg-white shadow-sm rounded-lg p-4 hover:bg-gray-50">
            {renderProductLink(product)}
            <button
              onClick={() => handleRemoveProduct(product.id)}
              className="text-red-600 hover:text-red-800 text-lg" 
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button 
        onClick={() => setOpen(true)} 
        className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition duration-200 text-xl" 
      >
        Add New Product
      </button>

      <Transition show={open} as={React.Fragment}>
        <Dialog onClose={() => setOpen(false)} className="relative z-10">
          <Transition.Child
            as={React.Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={React.Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md bg-white shadow-lg rounded-lg">
                    <div className="flex h-full flex-col overflow-y-scroll">
                      <div className="px-6 py-4 border-b">
                        <h3 className="text-lg font-semibold leading-6 text-gray-900 text-2xl">Add New Product</h3> 
                      </div>
                      <div className="relative mt-4 flex-1 px-6">
                        <form onSubmit={handleAddProduct} className="flex flex-col space-y-4">
                          <div>
                            <label htmlFor="name" className="block mb-1 text-lg">Product Name:</label> 
                            <input
                              id="name"
                              type="text"
                              ref={nameRef}
                              required
                              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-600"
                              aria-label="Product Name"
                            />
                          </div>
                          <div>
                            <label htmlFor="price" className="block mb-1 text-lg">Product Price:</label> 
                            <input
                              id="price"
                              type="number"
                              ref={priceRef}
                              required
                              min="0"
                              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-600"
                              aria-label="Product Price"
                            />
                          </div>
                          <div>
                            <label htmlFor="description" className="block mb-1 text-lg">Product Description:</label> 
                            <input
                              id="description"
                              type="text"
                              ref={descriptionRef}
                              required
                              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-600"
                              aria-label="Product Description"
                            />
                          </div>
                          <button type="submit" className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition duration-200 text-lg">
                            Add Product
                          </button>
                        </form>
                      </div>
                      <div className="absolute top-0 right-0 p-2">
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-600"
                          onClick={() => setOpen(false)}
                        >
                          &times; 
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default Products;
