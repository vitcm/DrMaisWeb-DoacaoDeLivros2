import React from "react";

import { Container, Title } from "./style";
import { useTheme } from "styled-components";
import { LivroDTO } from "../../dtos/livroDTO";

interface Props {
  title: string;
  onClick?: () => void;
}

export function ButtonAdd({ title, onClick }: Props) {
  const theme = useTheme();
  return (
    <Container onClick={onClick}>
      <Title>{title}</Title>
    </Container>
  );
}
