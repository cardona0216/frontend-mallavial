import CreateSegmentForm from '@/components/crearsegmento/CreateSegmentForm';
import React from 'react'
import { Container, Header } from 'semantic-ui-react';

export default function crear() {
    return (
        <Container>
            <Header as='h1'>Crear Nuevo Segmento</Header>
            <CreateSegmentForm />
        </Container>
    );
}
