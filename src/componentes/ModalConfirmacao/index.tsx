import React, { useState } from "react";
import Modal from "react-modal";
import { api } from "../../services/api";
import { ButtonAdd } from "../ButtonAdd";
import { Link } from "react-router-dom";

interface ModalConfirmacaoProps {
  isOpen: boolean;
  onRequestClose: () => void;
  id: string;
}

export function ModalConfirmacao({
  isOpen,
  onRequestClose,
  id,
}: ModalConfirmacaoProps) {
  async function handleDelete() {
    try {
      console.log("PASSEI AQUI:" + id);
      await api.delete(`/livros/${id}`);
    } catch (error) {
      console.error(error);
      // Trate o erro adequadamente, exibindo uma mensagem de erro ou tomando outras ações necessárias.
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <div>
          <h2>Atenção!</h2>
          <h4>Tem certeza que quer excluir esse livro?</h4>
          <div>
            <Link to={`/`}>
              <ButtonAdd
                title="confirma"
                onClick={async () => await handleDelete()}
              />
            </Link>
            <ButtonAdd title="cancelar" onClick={onRequestClose} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
