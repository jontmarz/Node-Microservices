import React, { useState } from 'react';
import { createProduct } from '../services/api';

export default function ProductForm({ onCreated }: { onCreated: () => void }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct({ nombre, precio });
    setNombre('');
    setPrecio(0);
    onCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Nuevo Producto</h2>
      <input
        className="border p-2 mr-2"
        type="text"
        value={nombre}
        placeholder="Nombre"
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        className="border p-2 mr-2"
        type="number"
        value={precio}
        placeholder="Precio"
        onChange={(e) => setPrecio(Number(e.target.value))}
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Crear
      </button>
    </form>
  );
}