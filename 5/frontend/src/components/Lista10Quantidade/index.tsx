import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Cliente {
  clienteId: number;
  nome: string;
  totalVendas: number;
}

const Lista10Quantidade: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/estatisticas/quantidade');
        setClientes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        setError('Erro ao carregar os dados.');
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
        <h2 style={{ color: "#343a40", marginBottom: "1rem" }}>Top 10 Clientes com Mais Vendas</h2>
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
                    Total de Vendas
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
                    {cliente.totalVendas}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
  );
};

export default Lista10Quantidade;
