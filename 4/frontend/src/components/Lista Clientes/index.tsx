import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListaCliente.css'
interface Endereco {
  id: number;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais: string;
}

interface Telefone {
  id: number;
  numero: string;
  ddd: string;
}

interface Cliente {
  id: number;
  nome: string;
  nomeSocial: string;
  email: string | null;
  endereco: Endereco;
  telefones: Telefone[];
}

const TabelaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [modalCliente, setModalCliente] = useState<Cliente | null>(null); // Modal para edição
  const [showCreateModal, setShowCreateModal] = useState(false); // Modal para criação
  const [newCliente, setNewCliente] = useState({
    nome: "",
    nomeSocial: "",
    email: "",
    endereco: {
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      codigoPostal: "",
      informacoesAdicionais: ""
    },
    telefones: [{ numero: "", ddd: "" }]
  });
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os clientes
  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get<Cliente[]>('http://localhost:32831/cliente/clientes', {
        validateStatus: (status) => status === 200 || status === 302,
      });
      if (response.data) {
        setClientes(response.data);
      } else {
        setError('Nenhum dado retornado pela API');
      }
    } catch (err) {
      setError('Erro ao carregar a lista de clientes');
      console.error(err);
    }
  };

  // Função para alternar a linha expandida
  const toggleRow = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  // Função para abrir o modal de edição
  const openEditModal = (id: number) => {
    const cliente = clientes.find((c) => c.id === id);
    console.log(cliente)
    if (cliente) {
      setModalCliente(cliente);
    }
  };

  // Função para fechar o modal de edição
  const closeEditModal = () => {
    setModalCliente(null);
  };

  // Função para fechar o modal de criação
  const closeCreateModal = () => {
    setShowCreateModal(false);
    setNewCliente({
      nome: "",
      nomeSocial: "",
      email: "",
      endereco: {
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        numero: "",
        codigoPostal: "",
        informacoesAdicionais: ""
      },
      telefones: [{ numero: "", ddd: "" }]
    });
  }

  // Função para enviar as atualizações do cliente
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalCliente) {
      try {
        await axios.put('http://localhost:32831/cliente/atualizar', modalCliente, {
          headers: { 'Content-Type': 'application/json' },
        });
        setClientes((prev) =>
          prev.map((c) => (c.id === modalCliente.id ? modalCliente : c))
        );
        closeEditModal();
      } catch (err) {
        console.error('Erro ao atualizar cliente', err);
      }
    }
  };

  // Função para criar um novo cliente
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:32831/cliente/cadastrar', newCliente, {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', },
      });
      setClientes((prev) => [...prev, response.data]);
      fetchClientes();
      closeCreateModal();
    } catch (err) {
      console.error('Erro ao criar cliente', err);
    }
  };

  // Função para excluir um cliente
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:32831/cliente/excluir`, {
        data: { id },
      });
      setClientes((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Erro ao excluir cliente', err);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Tabela de Clientes</h1>
      <button
        style={{
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={() => setShowCreateModal(true)}
      >
        Criar Cliente
      </button>
      {clientes.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ccc' }}>
              <th style={{ textAlign: 'left', padding: '8px' }}>Nome</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <React.Fragment key={cliente.id}>
                {/* Linha principal */}
                <tr
                  style={{
                    cursor: 'pointer',
                    backgroundColor: expandedRow === cliente.id ? '#f9f9f9' : '#fff',
                    borderBottom: '1px solid #ddd',
                  }}
                  onClick={() => toggleRow(cliente.id)}
                >
                  <td style={{ padding: '8px' }}>{cliente.nomeSocial || cliente.nome}</td>
                  <td style={{ padding: '8px' }}>
                    <button
                    className='secondary'
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(cliente.id);
                      }}
                    >
                      Editar
                    </button>
                    <button
                    className='danger'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(cliente.id);
                      }}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
                {/* Linha expandida */}
                {expandedRow === cliente.id && (
                  <tr>
                    <td colSpan={2} style={{ padding: '8px', backgroundColor: '#f9f9f9' }}>
                      <strong>Nome:</strong> {cliente.nome || 'Não informado'}
                      <br />
                      <strong>Email:</strong> {cliente.email || 'Não informado'}
                      <br />
                      <strong>Endereço:</strong> {cliente.endereco.rua}, {cliente.endereco.numero}, {cliente.endereco.bairro}, {cliente.endereco.cidade} - {cliente.endereco.estado}, {cliente.endereco.codigoPostal}
                      <br />
                      <strong>Informações adicionais:</strong> {cliente.endereco.informacoesAdicionais}
                      <br />
                      <strong>Telefones:</strong>
                      <ul>
                        {cliente.telefones.map((telefone) => (
                          <li key={telefone.id}>
                            ({telefone.ddd}) {telefone.numero}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Carregando clientes...</p>
      )}

      {/* Modal de Criação */}
      {showCreateModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}
        >
        <h2>Criar Cliente</h2>
        <form onSubmit={handleCreateSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={newCliente.nome}
              onChange={(e) => setNewCliente({ ...newCliente, nome: e.target.value })}
            />
          </label>
          <br />
          <label>
            Nome Social:
            <input
              type="text"
              value={newCliente.nomeSocial}
              onChange={(e) => setNewCliente({ ...newCliente, nomeSocial: e.target.value })}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={newCliente.email}
              onChange={(e) => setNewCliente({ ...newCliente, email: e.target.value })}
            />
          </label>
          <br />
          <div>
            <label>
              Estado:
              <input
                type="text"
                value={newCliente.endereco.estado}
                onChange={(e) => setNewCliente({
                  ...newCliente,
                  endereco: { ...newCliente.endereco, estado: e.target.value }
                })}
              />
            </label>
            <br />
            <label>
              Cidade:
              <input
                type="text"
                value={newCliente.endereco.cidade}
                onChange={(e) => setNewCliente({
                  ...newCliente,
                  endereco: { ...newCliente.endereco, cidade: e.target.value }
                })}
              />
            </label>
            <br />
            <label>
              Bairro:
              <input
                type="text"
                value={newCliente.endereco.bairro}
                onChange={(e) => setNewCliente({
                  ...newCliente,
                  endereco: { ...newCliente.endereco, bairro: e.target.value }
                })}
              />
            </label>
            <br />
            <label>
              Rua:
              <input
                type="text"
                value={newCliente.endereco.rua}
                onChange={(e) => setNewCliente({
                  ...newCliente,
                  endereco: { ...newCliente.endereco, rua: e.target.value }
                })}
              />
            </label>
            <br />
            <label>
              Número:
              <input
                type="text"
                value={newCliente.endereco.numero}
                onChange={(e) => setNewCliente({
                  ...newCliente,
                  endereco: { ...newCliente.endereco, numero: e.target.value }
                })}
              />
            </label>
            <br />
            <label>
              Código Postal:
              <input
                type="text"
                value={newCliente.endereco.codigoPostal}
                onChange={(e) => setNewCliente({
                  ...newCliente,
                  endereco: { ...newCliente.endereco, codigoPostal: e.target.value }
                })}
              />
            </label>
            <br />
            <label>
              Informações Adicionais:
              <input
                type="text"
                value={newCliente.endereco.informacoesAdicionais}
                onChange={(e) => setNewCliente({
                  ...newCliente,
                  endereco: { ...newCliente.endereco, informacoesAdicionais: e.target.value }
                })}
              />
            </label>
          </div>

          <br />
          <label>
            Telefone:
            <input
              type="text" placeholder = 'ddd'
              value={newCliente.telefones[0].ddd}
              style={{"width": "2rem"}}
              onChange={(e) => setNewCliente({
                ...newCliente,
                telefones: [{ ...newCliente.telefones[0], ddd: e.target.value }]
              })}
            />
            <input
              type="text"
              value={newCliente.telefones[0].numero}
              onChange={(e) => setNewCliente({
                ...newCliente,
                telefones: [{ ...newCliente.telefones[0], numero: e.target.value }]
              })}
            />
            
          </label>

          <br />
          <button type="submit">Salvar</button>
          <button type="button" onClick={closeCreateModal}>
            Cancelar
          </button>
        </form>
      </div>
      )}

      {modalCliente && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            width: '90%',
            maxWidth: '500px',
          }}
        >
          <h2>Editar Cliente</h2>
          <form onSubmit={handleEditSubmit}>
            <label>
              Nome:
              <input
                type="text"
                value={modalCliente.nome}
                onChange={(e) =>
                  setModalCliente({ ...modalCliente, nome: e.target.value } as Cliente)
                }
              />
            </label>
            <br />
            <label>
              Nome Social:
              <input
                type="text"
                value={modalCliente.nomeSocial}
                onChange={(e) =>
                  setModalCliente({ ...modalCliente, nomeSocial: e.target.value } as Cliente)
                }
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                value={modalCliente.email || ''}
                onChange={(e) =>
                  setModalCliente({ ...modalCliente, email: e.target.value } as Cliente)
                }
              />
            </label>
            <br />
            <div>
              <label>
                Estado:
                <input
                  type="text"
                  value={modalCliente.endereco.estado}
                  onChange={(e) =>
                    setModalCliente({
                      ...modalCliente,
                      endereco: { ...modalCliente.endereco, estado: e.target.value },
                    } as Cliente)
                  }
                />
              </label>
              <br />
              <label>
                Cidade:
                <input
                  type="text"
                  value={modalCliente.endereco.cidade}
                  onChange={(e) =>
                    setModalCliente({
                      ...modalCliente,
                      endereco: { ...modalCliente.endereco, cidade: e.target.value },
                    } as Cliente)
                  }
                />
              </label>
              <br />
              <label>
                Bairro:
                <input
                  type="text"
                  value={modalCliente.endereco.bairro}
                  onChange={(e) =>
                    setModalCliente({
                      ...modalCliente,
                      endereco: { ...modalCliente.endereco, bairro: e.target.value },
                    } as Cliente)
                  }
                />
              </label>
              <br />
              <label>
                Rua:
                <input
                  type="text"
                  value={modalCliente.endereco.rua}
                  onChange={(e) =>
                    setModalCliente({
                      ...modalCliente,
                      endereco: { ...modalCliente.endereco, rua: e.target.value },
                    } as Cliente)
                  }
                />
              </label>
              <br />
              <label>
                Número:
                <input
                  type="text"
                  value={modalCliente.endereco.numero}
                  onChange={(e) =>
                    setModalCliente({
                      ...modalCliente,
                      endereco: { ...modalCliente.endereco, numero: e.target.value },
                    } as Cliente)
                  }
                />
              </label>
              <br />
              <label>
                Código Postal:
                <input
                  type="text"
                  value={modalCliente.endereco.codigoPostal}
                  onChange={(e) =>
                    setModalCliente({
                      ...modalCliente,
                      endereco: { ...modalCliente.endereco, codigoPostal: e.target.value },
                    } as Cliente)
                  }
                />
              </label>
            </div>
            <br />
            <label>
              Telefone:
              <input
                type="text"
                value={modalCliente.telefones[0]?.numero || ''}
                onChange={(e) =>
                  setModalCliente({
                    ...modalCliente,
                    telefones: [
                      { ...modalCliente.telefones[0], numero: e.target.value },
                    ],
                  } as Cliente)
                }
              />
              <input
                type="text"
                value={modalCliente.telefones[0]?.ddd || ''}
                onChange={(e) =>
                  setModalCliente({
                    ...modalCliente,
                    telefones: [
                      { ...modalCliente.telefones[0], ddd: e.target.value },
                    ],
                  } as Cliente)
                }
              />
            </label>
            <br />
            <button type="submit">Salvar</button>
            <button type="button" onClick={closeEditModal}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TabelaClientes;
