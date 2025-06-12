import React from 'react';

export default function ProductList({ products, onRefresh }: { products: any[]; onRefresh: () => void }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Lista de Productos</h2>
      <ul className="list-disc pl-5">
        {products.map((p) => (
          <li key={p.id} className="mb-1">
            <strong>{p.attributes.nombre}</strong> - ${p.attributes.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}