import React from 'react';
import { TodoList } from '../../components/TodoList';
import { AddButton, Container, PlusIcon } from './styles';

export const Dashboard: React.FC = () => (
  <Container>
    <TodoList />
    <AddButton>
      <PlusIcon />
    </AddButton>
  </Container>
);
