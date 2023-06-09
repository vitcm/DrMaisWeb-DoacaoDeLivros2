import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LivroDTO } from "../../dtos/livroDTO";
import { ElementoLista } from "../../componentes/ElementoLista";
import { ButtonAdd } from "../../componentes/ButtonAdd";
import { api } from "../../services/api";

export function Dashboard2() {
  const [livros, setLivros] = useState<LivroDTO[]>([]); // Estado para armazenar os livros
  const [livrosFiltrados, setLivrosFiltrados] = useState<LivroDTO[]>([]); // Estado para armazenar a lista de livros filtrada
  const [termoPesquisa, setTermoPesquisa] = useState(""); //Estado para armazenar o termo de pesquisa

  //--------FAZ A PESQUISA(FILTRO):
  const filtrarLivros = useCallback(() => {
    const termo = termoPesquisa.toLowerCase();
    const livrosFiltrados = livros.filter((livro) => {
      const { titulo, autor, editora } = livro;
      return (
        (titulo && titulo.toLowerCase().includes(termo)) ||
        (autor && autor.toLowerCase().includes(termo)) ||
        (editora && editora.toLowerCase().includes(termo))
      );
    });
    setLivrosFiltrados(livrosFiltrados);
  }, [termoPesquisa, livros]);

  useEffect(() => {
    filtrarLivros();
  }, [filtrarLivros]);

  //--------CARREGA A PÁGINA COM TODOS OS ITENS DA API:
  const getLivros = async () => {
    try {
      const response = await api.get("/livros");
      setLivros(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // FAZ COM QUE NÃO HAJA ATRASO NO CARREGAMENTO DOS DADOS
  useEffect(() => {
    getLivros();
  }, []);

  return (
    <div>
      <div>
        <h1>Doação de livros</h1>
      </div>

      <div>
        <input
          placeholder="Pesquise o livro"
          onChange={(event) => setTermoPesquisa(event.target.value)}
        />
      </div>

      <div>
        {livrosFiltrados.map((item) => (
          <Link to={`/Detalhes/${item.id}`} key={item.id}>
            <ElementoLista key={item.id} data={item} />
          </Link>
        ))}
      </div>

      <div>
        <Link to={`/Cadastro/`}>
          <ButtonAdd title="Cadastrar" />
        </Link>
      </div>
    </div>
  );
}
