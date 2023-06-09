import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { api } from "../../services/api";
import { LivroDTO } from "../../dtos/livroDTO";
import { ButtonAdd } from "../../componentes/ButtonAdd";
import { Link, useParams } from "react-router-dom";

interface Params {
  livro: LivroDTO;
}

interface data {
  titulo: string;
  autor: string;
  editora: string;
  isbn: string;
  descricao: string;
  imagem: string;
}

export function Cadastro() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [editora, setEditora] = useState("");
  const [isbn, setIsbn] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");

  const params = useParams();
  const parametro = params.id;
  //   const route = useRoute();

  const [livro, setLivro] = useState<LivroDTO>(Object);

  useEffect(() => {
    async function buscaLivro() {
      try {
        const response = await api.get(`/livros/${parametro}`);
        console.log("response", response.data);
        setLivro(response.data);
        setTitulo(response.data.titulo);
        setAutor(response.data.autor);
        setEditora(response.data.editora);
        setIsbn(response.data.isbn);
        setImagem(response.data.imagem);
        setDescricao(response.data.descricao);
      } catch (error) {
        console.log(error);
      }
    }
    if (parametro) {
      buscaLivro();
    }
  }, []);

  //objeto
  const [livros, setLivros] = useState<LivroDTO>({
    id: "",
    titulo: "",
    autor: "",
    editora: "",
    isbn: "",
    descricao: "",
    imagem: "",
  });

  async function handleCadastro() {
    if (!titulo || !autor || !editora || !isbn || !imagem || !descricao) {
      alert("Todos os campos são obrigatórios.");
      return;
    } else {
      const data = {
        ...livro,
        id: String(uuidv4()),
        titulo: titulo,
        autor: autor,
        editora: editora,
        isbn: isbn,
        descricao: descricao,
        imagem: imagem,
      };

      try {
        console.log("route: " + parametro);
        if (parametro) {
          console.log("put");
          data.id = livro.id;
          await api.put(`/livros/${data.id}`, data);
        } else {
          await api.post("/livros", data);
        }
        <Link to={`/Dashboard`}></Link>;
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <div>
        <h1>Cadastrar / Alterar Livro</h1>
      </div>
      <div>
        <h3>Titulo:</h3>
        <input
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
        />
        <div>
          <h3>Autor:</h3>
          <input
            value={autor}
            onChange={(event) => setAutor(event.target.value)}
          />
        </div>
        <div>
          <h3>Editora:</h3>
          <input
            value={editora}
            onChange={(event) => setEditora(event.target.value)}
          />
        </div>
        <div>
          <h3>ISBN:</h3>
          <input
            value={isbn}
            onChange={(event) => setIsbn(event.target.value)}
          />
        </div>
        <div>
          <div>
            <h3>Capa:</h3>
            <h2>Link Imagem Capa:</h2>
            <input
              value={imagem}
              onChange={(event) => setImagem(event.target.value)}
            />
          </div>
          <div>
            <h3>Resumo:</h3>
            <input
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        <Link to={`/`}>
          <ButtonAdd title="adicionar" onClick={() => handleCadastro()} />
        </Link>
      </div>
    </div>
  );
}
