import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Calzada {
  id: number;
  nombre: string;
  material: string;
}

interface Bordillo {
  id: number;
  tipo: string;
  material: string;
}

interface Segmento {
  id: number;
  nombre: string;
  calzadas: Calzada[];
  bordillos: Bordillo[];
}

const EditSegmento = () => {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState<Segmento | null>(null);

  useEffect(() => {
    if (id) {
      const fetchSegmento = async () => {
        try {
          const res = await fetch(`http://localhost:8080/api/v1/segmento/${id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch segmento');
          }
          const data: Segmento = await res.json();
          setFormData(data);
        } catch (error) {
          console.error('Error fetching segmento:', error);
        }
      };

      fetchSegmento();
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData && formData.id) {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/segmento/${formData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to update segmento');
        }

        router.push('/'); // Redirige al home o a la página deseada
      } catch (error) {
        console.error('Error updating segmento:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleCalzadaChange = (index: number, field: keyof Calzada, value: string) => {
    const updatedCalzadas = formData?.calzadas.map((calzada, i) =>
      i === index ? { ...calzada, [field]: value } : calzada
    ) || [];
    if (formData) {
      setFormData({
        ...formData,
        calzadas: updatedCalzadas,
      });
    }
  };

  const handleBordilloChange = (index: number, field: keyof Bordillo, value: string) => {
    const updatedBordillos = formData?.bordillos.map((bordillo, i) =>
      i === index ? { ...bordillo, [field]: value } : bordillo
    ) || [];
    if (formData) {
      setFormData({
        ...formData,
        bordillos: updatedBordillos,
      });
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Editar Segmento</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
          />
        </label>

        <h2>Calzadas</h2>
        {formData.calzadas.map((calzada, index) => (
          <div key={calzada.id}>
            <label>
              Nombre:
              <input
                type="text"
                value={calzada.nombre}
                onChange={(e) => handleCalzadaChange(index, 'nombre', e.target.value)}
              />
            </label>
            <label>
              Material:
              <input
                type="text"
                value={calzada.material}
                onChange={(e) => handleCalzadaChange(index, 'material', e.target.value)}
              />
            </label>
          </div>
        ))}

        <h2>Bordillos</h2>
        {formData.bordillos.map((bordillo, index) => (
          <div key={bordillo.id}>
            <label>
              Tipo:
              <input
                type="text"
                value={bordillo.tipo}
                onChange={(e) => handleBordilloChange(index, 'tipo', e.target.value)}
              />
            </label>
            <label>
              Material:
              <input
                type="text"
                value={bordillo.material}
                onChange={(e) => handleBordilloChange(index, 'material', e.target.value)}
              />
            </label>
          </div>
        ))}

        <button type="submit">Actualizar Segmento</button>
      </form>
    </div>
  );
};

export default EditSegmento;
