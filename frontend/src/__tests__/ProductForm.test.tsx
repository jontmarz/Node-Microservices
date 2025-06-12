import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ProductForm from '../components/ProductForm';
import * as api from '../services/api';

vi.mock('../services/api', () => ({
  createProduct: vi.fn().mockResolvedValue(undefined),
}));

describe('ProductForm', () => {
  it('renderiza inputs y botón', () => {
    render(<ProductForm onCreated={() => {}} />);
    expect(screen.getByPlaceholderText('Nombre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Precio')).toBeInTheDocument();
    expect(screen.getByText('Crear')).toBeInTheDocument();
  });

  it('permite ingresar valores y dispara submit', async () => {
    const onCreatedMock = vi.fn();
    render(<ProductForm onCreated={onCreatedMock} />);
    fireEvent.change(screen.getByPlaceholderText('Nombre'), {
      target: { value: 'Test Producto' }
    });
    fireEvent.change(screen.getByPlaceholderText('Precio'), {
      target: { value: '99.9' }
    });
    fireEvent.click(screen.getByText('Crear'));
    await waitFor(() => {
      expect(onCreatedMock).toHaveBeenCalled();
    });
  });
});
