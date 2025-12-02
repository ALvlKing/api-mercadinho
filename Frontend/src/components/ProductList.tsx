import type { Product } from '../types';
import { api } from '../api';

interface Props {
  products: Product[];
  refresh: () => void; // Callback to refresh the product list
}

export const ProductList = ({ products, refresh }: Props) => {

  const deleteProduct = async (id: number) => {
    if (!confirm("Você tem certeza?")) return;
    await api.delete(`/products/${id}`);
    refresh();
  };

  const updateQuantity = async (id: number, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty < 0) return; // Prevent negative stock
    await api.patch(`/products/${id}`, { quantity: newQty });
    refresh();
  };

  const toggleAvailability = async (id: number, currentStatus: boolean) => {
    await api.patch(`/products/${id}`, { isAvailable: !currentStatus });
    refresh();
  };

  return (
    <div>
      <h3>Inventário</h3>
      {products.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {products.map((p) => (
            <li 
              key={p.id} 
              style={{ 
                border: '1px solid #000000ff', 
                marginBottom: '10px',
                padding: '10px', 
                borderRadius: '8px',
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: p.isAvailable ? '#000000ff' : '#3f0000ff'
              }}
            >
              {/* Left Side: Info */}
              <div>
                <strong style={{ fontSize: '1.1rem' }}>{p.name}</strong>
                <div style={{ marginTop: '5px', color: '#666' }}>
                  Status: 
                  <span 
                    onClick={() => toggleAvailability(p.id, p.isAvailable)}
                    style={{ 
                      cursor: 'pointer', 
                      marginLeft: '5px', 
                      fontWeight: 'bold',
                      color: p.isAvailable ? 'green' : 'red' 
                    }}
                  >
                    {p.isAvailable ? 'Em Estoque' : 'Indisponível'}
                  </span>
                </div>
              </div>

              {/* Right Side: Controls */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid #eee', borderRadius: '4px' }}>
                  <button onClick={() => updateQuantity(p.id, p.quantity, -1)} style={{ padding: '5px 10px' }}>-</button>
                  <span style={{ minWidth: '30px', textAlign: 'center' }}>{p.quantity}</span>
                  <button onClick={() => updateQuantity(p.id, p.quantity, 1)} style={{ padding: '5px 10px' }}>+</button>
                </div>

                <button 
                  onClick={() => deleteProduct(p.id)}
                  style={{ backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};