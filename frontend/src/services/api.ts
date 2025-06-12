import axios from 'axios';

const API_PRODUCT = 'http://localhost:3001/api';
const API_INVENTORY = 'http://localhost:3002/api';
const HEADERS = { headers: { 'x-api-key': 'miclaveultrasecreta' } };

export async function getProducts() {
  const res = await axios.get(`${API_PRODUCT}/productos`);
  return res.data.data;
}

export async function createProduct(product: { nombre: string; precio: number }) {
  await axios.post(`${API_PRODUCT}/productos`, {
    data: { type: 'producto', attributes: product }
  });
}

export async function getInventory(productId: string) {
  const res = await axios.get(`${API_INVENTORY}/inventario/${productId}`, HEADERS);
  return res.data.data.attributes.cantidad;
}

export async function updateInventory(productId: string, cantidad: number) {
  await axios.patch(
    `${API_INVENTORY}/inventario/${productId}`,
    {
      data: {
        type: 'inventario',
        attributes: { cantidad }
      }
    },
    HEADERS
  );
}