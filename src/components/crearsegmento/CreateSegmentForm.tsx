// src/components/CreateSegmentForm.tsx


import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { Button, Form,  Input } from 'semantic-ui-react';
import Navbar from './Navbar';
import { useRouter } from 'next/router';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Calzada {
    nombre: string;
    material: string;
}

interface Bordillo {
    tipo: string;
    material: string;
}

const CreateSegmentForm = () => {
    const router = useRouter()
    const [nombre, setNombre] = useState('');
    const [bordillos, setBordillos] = useState<Bordillo[]>([{ tipo: '', material: '' }]);
    const [calzadas, setCalzadas] = useState<Calzada[]>([{ nombre: '', material: '' }]);
    const [isFormValid, setIsFormValid] = useState(false);


    useEffect(() => {
        const isValid = nombre.trim() !== '' && calzadas.every(calzada => calzada.nombre.trim() !== '' && calzada.material.trim() !== '') && bordillos.every(bordillo => bordillo.tipo.trim() !== '' && bordillo.material.trim() !== '');
        setIsFormValid(isValid);
    }, [nombre, calzadas, bordillos]);

    const agregarCalzada = () => {
        setCalzadas([...calzadas, { nombre: '', material: '' }]);
    };
    const eliminarCalzada = (index:number) => {
        const nuevasCalzadas = calzadas.filter((_, i) => i !== index);
        setCalzadas(nuevasCalzadas);
    };

    const agregarBordillo = () => {
        setBordillos([...bordillos, { tipo: '', material: '' }]);
    };

    const eliminarBordillo = (index:number) => {
        const nuevasBordillo = bordillos.filter((_, i) => i !== index);
        setBordillos(nuevasBordillo);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isFormValid) {
          
            try {
                const response = await fetch('http://localhost:8080/api/v1/segmento', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newSegmento),
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                // Clear form after submission
                setNombre('');
                setCalzadas([{ nombre: '', material: '' }]);
                setBordillos([{ tipo: '', material: '' }]);
               
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Segmento creado exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  }).then(() => {
                    // Redirigir a otra página después de cerrar el alerta
                    router.push('/');
                  });
                
            } catch (error) {
                console.error('Failed to create segmento:', error);
                alert('Error al crear segmento');
            }
            toast.success('Segmento creado exitosamente');
                setTimeout(() => {
                    router.push('/');
                  }, 3000); // 1000 ms = 1 segundo
        };
        
    
        }
        const newSegmento = {
            nombre,
            calzadas,
            bordillos,
        };

       
    return (
        <div>
        <Navbar></Navbar>
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
          Crear Segmento
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
                            style={{ marginTop: '10px'}}
                            type="button"
                            onClick={() => eliminarCalzada(index)}
                            disabled={calzadas.length === 1}  
                        >
                            eliminar
                        </Button>
                    </div>
                ))}
                {/* Botón para agregar más calzadas */}
                <Button type="button" onClick={agregarCalzada} style={{ marginTop: '10px' }}>
                    +
                </Button>
            </Form.Field>

            <Form.Field>
                <label>Bordillos</label>
                {bordillos.map((bordillo, index) => (
                    <div key={index}>
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
                            style={{ marginTop: '10px'}}
                            type="button"
                            onClick={() => eliminarBordillo(index)}
                            disabled={bordillos.length === 1}  
                        >
                            eliminar
                        </Button>
                    </div>
                ))}
                 <Button type="button" onClick={agregarBordillo} style={{ marginTop: '10px' }}>
                    +
                </Button>
            </Form.Field>
            
        <ToastContainer />
        </Form>
        </div>
    );
};

export default CreateSegmentForm;
