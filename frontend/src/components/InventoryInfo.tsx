import React, { useState } from 'react';
import { getInventory, updateInventory } from '../services/api';

export default function InventoryInfo() {
  const [productId, setProductId] = useState('');
  const [stock, setStock] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState(0);

  const fetchStock = async () => {
    const res = await getInventory(productId);
    setStock(res);
  };

  const updateStock = async () => {
    await updateInventory(productId, cantidad);
    setCantidad(0);
    fetchStock();
  };

  return (
    <div className="border-t pt-4">
      <h2 className="text-lg font-semibold mb-2">Inventario</h2>
      <input
        className="border p-2 mr-2"
        type="text"
        placeholder="ID del producto"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button className="bg-gray-700 text-white px-4 py-2 rounded mr-2" onClick={fetchStock}>
        Consultar
      </button>
      {stock !== null && <span className="font-bold">Stock: {stock}</span>}
      <div className="mt-4">
        <input
          className="border p-2 mr-2"
          type="number"
          placeholder="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={updateStock}>
          Actualizar
        </button>
      </div>
    </div>
  );
}