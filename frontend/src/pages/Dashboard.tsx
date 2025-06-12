import React, { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import InventoryInfo from '../components/InventoryInfo';
import { getProducts } from '../services/api';

export default function Dashboard() {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Panel de Productos e Inventario</h1>
      <ProductForm onCreated={fetchProducts} />
      <ProductList products={products} onRefresh={fetchProducts} />
      <InventoryInfo />
    </div>
  );
}