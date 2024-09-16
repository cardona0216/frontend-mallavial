// pages/index.js
import { useEffect, useState } from 'react';

import { Container, Table, Header, Button } from 'semantic-ui-react';
import { Segmento } from './types';

import Link from 'next/link';


const fetchSegmentos = async () => {
  const res = await fetch('http://localhost:8080/api/v1/segmento');
  const data = await res.json();
  return data;
};

const Home = () => {
  const [segmentos, setSegmentos] = useState<Segmento[]>([]);

  const handleEdit = (id: number) => {
    // Redirige a la página de edición del segmento
    window.location.href = `/edit-segment/${id}`;
};

const handleDelete = async (id: number) => {
  try {
      const response = await fetch(`http://localhost:8080/api/v1/segmento/${id}`, {
          method: 'DELETE',
          
        });
        console.log(response);

      if (response.ok) {
          // Actualiza el estado para eliminar el segmento de la tabla
          setSegmentos(segmentos.filter(segmento => segmento.id !== id));
      } else {
          console.error('Error al eliminar el segmento');
      }
  } catch (error) {
      console.error('Error al realizar la solicitud', error);
  }
};

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSegmentos();
      setSegmentos(data);
    };

    loadData();
  }, []);

  return (
    <Container>
    
      <Header as='h1'>Segmentos Viales</Header>
      <Link href="/create-segment" passHref>
                <Button primary>
                    Crear Nuevo Segmento
                </Button>
      </Link>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Calzadas</Table.HeaderCell>
            <Table.HeaderCell>Bordillos</Table.HeaderCell>
            <Table.HeaderCell>Editar</Table.HeaderCell>
            <Table.HeaderCell>Eliminar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {segmentos.map(segmento => (
            <Table.Row key={segmento.id}>
              <Table.Cell>{segmento.id}</Table.Cell>
              <Table.Cell>{segmento.nombre}</Table.Cell>
              <Table.Cell>
                <ul>
                  {segmento.calzadas.length > 0 ? (
                    segmento.calzadas.map(calzada => (
                      <li key={calzada.id}>
                        {calzada.nombre} ({calzada.material})
                      </li>
                    ))
                  ) : (
                    <li>No hay calzadas</li>
                  )}
                </ul>
              </Table.Cell>
              <Table.Cell>
                <ul>
                  {segmento.bordillos.length > 0 ? (
                    segmento.bordillos.map(bordillo => (
                      <li key={bordillo.id}>
                        {bordillo.tipo} ({bordillo.material})
                      </li>
                    ))
                  ) : (
                    <li>No hay bordillos</li>
                  )}
                </ul>
              </Table.Cell>
              <Table.Cell>
                                <Button onClick={() => handleEdit(segmento.id)} primary>Editar</Button>
                               
              </Table.Cell>
              <Table.Cell>
                                
                                <Button onClick={() => handleDelete(segmento.id)} negative>Eliminar</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default Home;
