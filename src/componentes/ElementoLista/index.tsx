import React from "react";

import { LivroDTO } from "../../dtos/livroDTO";

interface ElementoListaProps {
  data: LivroDTO;
}

export function ElementoLista({ data }: ElementoListaProps) {
  return (
    <button>
      <img
        src={data.imagem}
        alt="Imagem do livro"
        style={{ width: 120, height: 180 }}
      />
      <p>{data.titulo}</p>
      <p>{data.autor}</p>
      <p>{data.editora}</p>
    </button>
  );
}
