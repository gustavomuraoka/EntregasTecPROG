import React, { useState } from "react";
import axios from "axios";
import './ListaProdutos.css'; // Certifique-se de que o caminho está correto


// Define the type of each product
interface Servico {
  id: number;
  nome: string;
  preco: number;
}

// Define the type for props
interface DataTableProps {
  data: Servico[]; // Array of products
}

const ListaServicos: React.FC<DataTableProps> = ({ data }) => {
  const [servicoEditar, setServicoEditar] = useState<Servico | null>(null);
  const [servicoNome, setServicoNome] = useState<string>("");
  const [servicoPreco, setServicoPreco] = useState<string>("");
  const [openModalEditar, setOpenModalEditar] = useState<boolean>(false);

  // Função para remover um produto
  const handleRemove = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/produtos/${id}`);
      alert("Produto removido com sucesso! Reload na página para exibir as alterações");
    } catch (error) {
      console.error("Erro ao remover o produto:", error);
      alert("Erro ao remover o produto.");
    }
  };

  // Função para carregar os dados do produto no modal para edição
  const handleEdit = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/servicos/${id}`);
      const servico = response.data;
      setServicoEditar(servico);
      setServicoNome(servico.nome);
      setServicoPreco(servico.preco.toString());
      setOpenModalEditar(true);
    } catch (error) {
      console.error("Erro ao carregar os dados do produto:", error);
    }
  };

  const handleSaveEdit = async () => {
    if (servicoEditar) {
      try {
        await axios.put(`http://localhost:3001/api/servicos/${servicoEditar.id}`, {
          nome: servicoNome,
          preco: parseFloat(servicoPreco),
        });
        alert("Serviço editado com sucesso!");
        setOpenModalEditar(false);
      } catch (error) {
        console.error("Erro ao editar o serviço:", error);
        alert("Erro ao editar o serviço.");
      }
    }
  };

  return (
    <>
      {openModalEditar && servicoEditar && (
        <div className="modal" style={{alignItems: "center"}}>
          <div className="modal-content">
            <h2>Editar Servico</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
              }}
            >
              <div>
                <label>Nome:</label>
                <input
                  type="text"
                  value={servicoNome}
                  onChange={(e) => setServicoNome(e.target.value)}
                />
              </div>
              <div>
                <label>Preço:</label>
                <input
                  type="number"
                  value={servicoPreco}
                  onChange={(e) => setServicoPreco(e.target.value)}
                />
              </div>
              <div>
                <button type="submit">Salvar Edição</button>
                <button type="button" onClick={() => setOpenModalEditar(false)}>
                  Fechar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((produto) => (
            <tr key={produto.id}>
              <td style={{ borderBottom: "0px solid" }}>{produto.id}</td>
              <td style={{ borderBottom: "0px solid" }}>{produto.nome}</td>
              <td style={{ borderBottom: "0px solid" }}>R$ {produto.preco}</td>
              <td style={{ borderBottom: "0px solid" }}>
                <button onClick={() => handleEdit(produto.id)} style={buttonStyle}>
                  Editar
                </button>
                <button onClick={() => handleRemove(produto.id)} style={buttonStyle}>
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const tableStyle: React.CSSProperties = {
  width: "90%",
  borderCollapse: "collapse",
  margin: "20px auto",
  fontSize: "18px",
  textAlign: "left",
};

const buttonStyle: React.CSSProperties = {
  padding: "6px 12px",
  margin: "0 5px",
  cursor: "pointer",
  border: "none",
  borderRadius: "4px",
  fontSize: "14px",
};

export default ListaServicos;
