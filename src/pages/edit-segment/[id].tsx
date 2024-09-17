import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Input } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/crearsegmento/Navbar';

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

const EditSegment = () => {
  const router = useRouter();
  const { id } = router.query;
  const [nombre, setNombre] = useState('');
  const [calzadas, setCalzadas] = useState<Calzada[]>([{ id: 0, nombre: '', material: '' }]);
  const [bordillos, setBordillos] = useState<Bordillo[]>([{ id: 0, tipo: '', material: '' }]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchSegmento = async () => {
        try {
          const res = await fetch(`http://localhost:8080/api/v1/segmento/${id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch segmento');
          }
          const data: Segmento = await res.json();
          setNombre(data.nombre);
          setCalzadas(data.calzadas);
          setBordillos(data.bordillos);
        } catch (error) {
          console.error('Error fetching segmento:', error);
        }
      };

      fetchSegmento();
    }
  }, [id]);

  useEffect(() => {
    const isValid = nombre.trim() !== '' && calzadas.every(calzada => calzada.nombre.trim() !== '' && calzada.material.trim() !== '') && bordillos.every(bordillo => bordillo.tipo.trim() !== '' && bordillo.material.trim() !== '');
    setIsFormValid(isValid);
  }, [nombre, calzadas, bordillos]);

  const agregarCalzada = () => {
    setCalzadas([...calzadas, { id: 0, nombre: '', material: '' }]);
  };

  const eliminarCalzada = (index: number) => {
    const nuevasCalzadas = calzadas.filter((_, i) => i !== index);
    setCalzadas(nuevasCalzadas);
  };

  const agregarBordillo = () => {
    setBordillos([...bordillos, { id: 0, tipo: '', material: '' }]);
  };

  const eliminarBordillo = (index: number) => {
    const nuevasBordillos = bordillos.filter((_, i) => i !== index);
    setBordillos(nuevasBordillos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid && id) {
      try {
        const updatedSegmento = {
          nombre,
          calzadas,
          bordillos,
        };

        const response = await fetch(`http://localhost:8080/api/v1/segmento/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedSegmento),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        Swal.fire({
          title: '¡Éxito!',
          text: 'Segmento actualizado exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          router.push('/');
        });

        toast.success('Segmento actualizado exitosamente');
      } catch (error) {
        console.error('Failed to update segmento:', error);
        toast.error('Error al actualizar segmento');
      }
    }
  };

  return (
    <div>
        <Navbar></Navbar>
      <h1>Editar Segmento</h1>
      <Form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
      <Button
          type='submit'
          onClick={handleSubmit}
          disabled={!isFormValid}
          style={{
            backgroundColor: '#007bff', // Color primario (azul)
            color: '#fff', // Color del texto (blanco)
            border: 'none', // Sin borde
            padding: '10px 20px', // Espaciado interno
            cursor: 'pointer', // Cursor tipo puntero
            borderRadius: '4px', // Bordes redondeados
            fontSize: '16px', // Tamaño del texto
          }}
        >
          Actualizar Segmento
        </Button>

        </div>
        <Form.Field>
          <label>Nombre del Segmento</label>
          <Input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder='Nombre del Segmento'
          />
        </Form.Field>

        <Form.Field>
          <label>Calzadas</label>
          {calzadas.map((calzada, index) => (
            <div key={index} style={{ marginTop: '10px' }}>
              <Input
                placeholder='Nombre de la Calzada'
                value={calzada.nombre}
                onChange={(e) =>
                  setCalzadas(
                    calzadas.map((c, i) =>
                      i === index ? { ...c, nombre: e.target.value } : c
                    )
                  )
                }
                style={{ marginRight: '10px' }}
              />
              <Input
                placeholder='Material'
                value={calzada.material}
                onChange={(e) =>
                  setCalzadas(
                    calzadas.map((c, i) =>
                      i === index ? { ...c, material: e.target.value } : c
                    )
                  )
                }
                style={{ marginRight: '10px' }}
              />
              <Button
                style={{ marginTop: '10px' }}
                type='button'
                onClick={() => eliminarCalzada(index)}
                disabled={calzadas.length === 1}
              >
                Eliminar
              </Button>
            </div>
          ))}
          <Button type='button' onClick={agregarCalzada} style={{ marginTop: '10px' }}>
            +
          </Button>
        </Form.Field>

        <Form.Field>
          <label>Bordillos</label>
          {bordillos.map((bordillo, index) => (
            <div key={index} style={{ marginTop: '10px' }}>
              <Input
                placeholder='Tipo de Bordillo'
                value={bordillo.tipo}
                onChange={(e) =>
                  setBordillos(
                    bordillos.map((b, i) =>
                      i === index ? { ...b, tipo: e.target.value } : b
                    )
                  )
                }
                style={{ marginRight: '10px' }}
              />
              <Input
                placeholder='Material'
                value={bordillo.material}
                onChange={(e) =>
                  setBordillos(
                    bordillos.map((b, i) =>
                      i === index ? { ...b, material: e.target.value } : b
                    )
                  )
                }
              />
              <Button
                style={{ marginTop: '10px' }}
                type='button'
                onClick={() => eliminarBordillo(index)}
                disabled={bordillos.length === 1}
              >
                Eliminar
              </Button>
            </div>
          ))}
          <Button type='button' onClick={agregarBordillo} style={{ marginTop: '10px' }}>
            +
          </Button>
        </Form.Field>

        
      </Form>
      <ToastContainer />
    </div>
  );
};

export default EditSegment;
