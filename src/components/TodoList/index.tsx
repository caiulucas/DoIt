import React from 'react';

import {
  Container,
  Percentage,
  Progress,
  ProgressText,
  Quantity,
  QuantityContainer,
  QuantityText,
  Title,
  TodosInfo,
} from './styles';

export const TodoList: React.FC = () => (
  <Container>
    <Title>Lista de Trabalho</Title>

    <TodosInfo>
      <QuantityContainer>
        <Quantity>5</Quantity>
        <QuantityText>items</QuantityText>
      </QuantityContainer>

      <Progress>
        <Percentage>20%</Percentage>
        <ProgressText>concluídos</ProgressText>
      </Progress>
    </TodosInfo>
  </Container>
);
