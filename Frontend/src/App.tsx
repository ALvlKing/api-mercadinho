import { useEffect, useState, useCallback } from 'react';
import { api } from './api';
import type { Product } from './types';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  // 1. Wrap the function in useCallback to stabilize it
  const fetchProducts = useCallback(async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch", error);
    }
  }, []); // Empty array means this function never changes

  // 2. Load data on start
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Add fetchProducts to the dependency array

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>Supermercado Legal</h1>
      {/* 3. Pass the stable function to the form */}
      <ProductForm onProductAdded={fetchProducts} />
      <ProductList products={products} refresh={fetchProducts} />
    </div>
  );
}

export default App;