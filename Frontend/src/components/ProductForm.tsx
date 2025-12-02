import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../api';

// 1. Define the validation schema (Should match Backend logic)
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  quantity: z.number({ error: "Quantity must be a number" }).min(0),
  isAvailable: z.boolean().optional(),
});

// Derive the TypeScript type from the schema
type ProductFormData = z.infer<typeof productSchema>;

interface Props {
  onProductAdded: () => void; // Callback to tell parent to refresh list
}

export const ProductForm = ({ onProductAdded }: Props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      await api.post('/products', data);
      reset(); // Clear form
      onProductAdded(); // Refresh list
    } catch (error) {
      console.error("Falha ao adicionar produto", error);
      alert("Falha ao adicionar produto");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
      <h3>Adicionar Produto</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <input {...register("name")} placeholder="Nome do Produto" />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input 
          type="number" 
          placeholder="Quantidade" 
          {...register("quantity", { valueAsNumber: true })} 
        />
        {errors.quantity && <p style={{ color: 'red' }}>{errors.quantity.message}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          <input type="checkbox" {...register("isAvailable")} /> Disponível?
        </label>
      </div>

      <button type="submit">Adicionar Produto</button>
    </form>
  );
};
