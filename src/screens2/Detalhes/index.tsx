import React, { useEffect, useState } from "react";
import { Link, useNavigation, useParams } from "react-router-dom";
import { LivroDTO } from "../../dtos/livroDTO";
import { ButtonAdd } from "../../componentes/ButtonAdd";
import { api } from "../../services/api";
import { ModalConfirmacao } from "../../componentes/ModalConfirmacao";

interface Params {
  livro: LivroDTO;
}

export function Detalhes() {
  const params = useParams();
  const parametro = params.id;
  //   const route = useRoute();

  // ------ BUSCA OS DADOS DO LIVRO SELECIONADO
  const [livros, setLivros] = useState<LivroDTO>(Object);

  useEffect(() => {
    async function buscaLivro() {
      try {
        const response = await api.get(`/livros/${parametro}`);
        setLivros(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    buscaLivro();
  }, []);

  // ------- CONTROLA O MODAL
  const [modal, SetModal] = useState(false);

  function handleOpenModalConfirmacao() {
    SetModal(true);
  }

  function handleCloseModalConfirmacao() {
    SetModal(false);
  }

  return (
    <div>
      <div>
        <h1>{livros.titulo}</h1>
      </div>

      <div>
        <div>
          <img
            src={livros.imagem}
            alt="Indisponível"
            style={{ width: 120, height: 180 }}
          />
          <div>
            <ModalConfirmacao
              isOpen={modal}
              onRequestClose={handleCloseModalConfirmacao}
              id={livros.id}
            />
            <h3>{livros.autor}</h3>
            <h3>{livros.editora}</h3>
            <h3>{livros.isbn}</h3>
          </div>
        </div>
        <div>
          {/* <ModalConfirmacao
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              id={livro.id}
              livro={livro}
            /> */}
          <h4>{livros.descricao}</h4>
        </div>
      </div>
      <div>
        <Link to={`/Editar/${livros.id}`} key={livros.id}>
          <ButtonAdd title="Editar" />
        </Link>
        <ButtonAdd
          title="Excluir"
          onClick={() => handleOpenModalConfirmacao()}
        />
      </div>
    </div>
  );
}
