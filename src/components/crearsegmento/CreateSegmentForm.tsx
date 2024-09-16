// src/components/CreateSegmentForm.tsx

import { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

interface Calzada {
    nombre: string;
    material: string;
}

interface Bordillo {
    tipo: string;
    material: string;
}

const CreateSegmentForm = () => {
    const [nombre, setNombre] = useState('');
    const [calzadas, setCalzadas] = useState<Calzada[]>([{ nombre: '', material: '' }]);
    const [bordillos, setBordillos] = useState<Bordillo[]>([{ tipo: '', material: '' }]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newSegmento = {
            nombre,
            calzadas,
            bordillos,
        };

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

            alert('Segmento creado exitosamente');
        } catch (error) {
            console.error('Failed to create segmento:', error);
            alert('Error al crear segmento');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
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
                    <div key={index}>
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
                        />
                    </div>
                ))}
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
                    </div>
                ))}
            </Form.Field>
            <Button type='submit'>Crear Segmento</Button>
        </Form>
    );
};

export default CreateSegmentForm;
