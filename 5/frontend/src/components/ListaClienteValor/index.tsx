import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ClienteData {
  totalConsumido: number | null; // Total pode ser nulo
  clienteId: number;
  nome: string;
}

const ListaClienteValor: React.FC = () => {
  const [clientes, setClientes] = useState<ClienteData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os dados
  const fetchClientes = async () => {
    try {
      const response = await axios.get<ClienteData[]>(
        'http://localhost:3001/api/estatisticas/clientes-valor'
      );
      setClientes(response.data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar dados.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch de dados na montagem do componente
  useEffect(() => {
    fetchClientes();
  }, []);

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  if (clientes.length === 0) {
    return <p>Não há dados disponíveis.</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ color: "#343a40", marginBottom: "1rem" }}>
        Clientes que mais Consumiram por Valor
      </h2>
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          overflowX: "auto",
          borderRadius: "8px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#ffffff",
            textAlign: "left",
            border: "1px solid #dee2e6",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#343a40", color: "#ffffff" }}>
              <th
                style={{
                  padding: "0.75rem",
                  border: "1px solid #dee2e6",
                  textAlign: "center",
                }}
              >
                ID
              </th>
              <th
                style={{
                  padding: "0.75rem",
                  border: "1px solid #dee2e6",
                }}
              >
                Nome
              </th>
              <th
                style={{
                  padding: "0.75rem",
                  border: "1px solid #dee2e6",
                  textAlign: "center",
                }}
              >
                Total Consumido (R$)
              </th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr
                key={cliente.clienteId}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff",
                  transition: "background-color 0.3s ease",
                }}
              >
                <td
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #dee2e6",
                    textAlign: "center",
                  }}
                >
                  {cliente.clienteId}
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #dee2e6",
                  }}
                >
                  {cliente.nome}
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #dee2e6",
                    textAlign: "center",
                  }}
                >
                  {cliente.totalConsumido !== null && cliente.totalConsumido !== undefined
                    ? cliente.totalConsumido.toFixed(2)
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default ListaClienteValor;
