import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { getAllProducts } from '../lib/productapi';
import {  useNavigate } from 'react-router-dom';

const SearchDropdown = () => {
  const [query, setQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigator=useNavigate()

  // Fetch all products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getAllProducts();
        // Ensure we're setting an array of products
        const productsArray = Array.isArray(response.data) ? response.data : 
                            response.data?.products || 
                            response.data?.data || 
                            [];
        setAllProducts(productsArray);
      } catch (error) {
        console.error('Error fetching products:', error);
        setAllProducts([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const handleProductClick = (productId) => {
    navigator(`/menu/${productId}`);
    setIsOpen(false);
    setQuery('');
  };
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (query.length < 2 || !Array.isArray(allProducts)) {
      setFilteredProducts([]);
      setIsOpen(false);
      return;
    }

    const filtered = allProducts.filter(product => 
      product?.name?.toLowerCase().includes(query.toLowerCase()) ||
      product?.description?.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredProducts(filtered);
    setIsOpen(true);
  }, [query, allProducts]);

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {isOpen && (query.length >= 2) && (
        <div className="absolute z-30 w-full mt-1 bg-white rounded-lg shadow-lg border max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : filteredProducts.length > 0 ? (
            <ul className="py-2">
              {filteredProducts.map((product) => (
                <li  className="flex items-center px-4 py-2 hover:bg-gray-100" key={product._id} onClick={() => handleProductClick(product._id)}>
                  
                    {product.img && (
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div className="ml-3">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                      </p>
                    </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;