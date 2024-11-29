import axios from "axios";
import React, { useEffect, useState } from "react";
import { json } from "stream/consumers";
// Define the type of each product
interface Cliente {
  id: number;
  nome: string;
  nomeSocial: string;
  CPF: string;
  dataCadastro: string;
}

// Define the type for props
interface DataTableProps {
  data: Cliente[]; // Array of products
}

const ListaClientes: React.FC<DataTableProps> = ({ data }) => {

  const [clienteEditar, setClienteEditar] = useState<Cliente | null>(null);
  const [openModalEditar, setOpenModalEditar] = useState<boolean>(false);
  const [clienteNome, setClienteNome] = useState('');
  const [clienteNomeSocial, setClienteNomeSocial] = useState('');
  const [clienteDataCadastro, setClienteDataCadastro] = useState('');
  const [telefones, setTelefones] = useState<{ [key: number]: string }>({});


  const handleRemove = async (id: number) => {
    try {
      // Fazendo a requisição DELETE para remover o produto
      await axios.delete(`http://localhost:3001/api/clientes/${id}`);
      alert("Produto removido com sucesso! Reload na página para exibir as alterações");
    } catch (error) {
      console.error("Erro ao remover o produto:", error);
      alert("Erro ao remover o produto.");
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/clientes/${id}`);
      const cliente = response.data;
  
      setClienteEditar(cliente);
  
      setClienteNome(cliente.nome);
      setClienteNomeSocial(cliente.nomeSocial);
      setClienteDataCadastro(cliente.dataCadastro);

      setOpenModalEditar(true);
    } catch (error) {
      console.error("Erro ao editar o cliente:", error);
    }
  };
  

  const handleSaveEdit = async () => {
    if (clienteEditar) {
      try {
        await axios.put(`http://localhost:3001/api/clientes/${clienteEditar.id}`, {
          nome: clienteNome,
          nomeSocial: clienteNomeSocial,
          dataCadastro: clienteDataCadastro,
        });
  
        alert("Cliente editado com sucesso!");
        setOpenModalEditar(false);
      } catch (error) {
        console.error("Erro ao editar o cliente:", error);
        alert("Erro ao editar o cliente.");
      }
    }
  };

  const getTelefoneByID = async (clienteId: number) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/telefones/${clienteId}`);
      setTelefones((prev) => ({
        ...prev,
        [clienteId]: response.data, // Armazena o telefone no estado
      }));
    } catch (error) {
      setTelefones((prev) => ({
        ...prev,
        [clienteId]: 'Não Informado', // Define um valor padrão em caso de erro
      }));
    }
  };
  
  useEffect(() => {
    data.forEach((cliente) => {
      getTelefoneByID(cliente.id); // Busca o telefone para cada cliente
    });
  }, [data]);
  
  return (
    <>
      {openModalEditar && clienteEditar && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Cliente</h2>
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
                  value={clienteNome}
                  onChange={(e) => setClienteNome(e.target.value)}
                />
              </div>
              <div>
                <label>Nome Social:</label>
                <input
                  type="text"
                  value={clienteNomeSocial}
                  onChange={(e) => setClienteNomeSocial(e.target.value)}
                />
              </div>
              <div>
                <label>Data de Cadastro:</label>
                <input
                  type="date"
                  value={clienteDataCadastro}
                  onChange={(e) => setClienteDataCadastro(e.target.value)}
                />
              </div>
              <div>
                <button type="submit">Salvar Edição</button>
                <button
                  type="button"
                  onClick={() => setOpenModalEditar(false)}
                >
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
            <th>Nome Social</th>
            <th>CPF</th>
            <th>Data de Cadastro</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cliente, index) => (
            <tr key={index}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.nomeSocial}</td>
              <td>{cliente.CPF}</td>
              <td>{cliente.dataCadastro.slice(0, 10)}</td>
              <td>{telefones[cliente.id] || "Carregando..."}</td>
              <td>
                  <button
                    onClick={() => handleEdit(cliente.id)}
                    style={buttonStyle}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleRemove(cliente.id)}
                    style={buttonStyle}
                  >
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

// Simple styling for the table
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

export default ListaClientes;