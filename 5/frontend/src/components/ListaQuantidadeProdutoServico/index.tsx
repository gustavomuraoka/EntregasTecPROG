import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Utilizacao {
  nome: string;
  tipo: string;
  numeroUtilizacoes: number;
}

const TabelaUtilizacoes = () => {
  const [dados, setDados] = useState<Utilizacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Função para buscar os dados da API
  const fetchUtilizacoes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/estatisticas/utilizacoes');
      setDados(response.data.slice(0, 10)); // Limita o número de resultados para 10
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      setError('Erro ao carregar os dados.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUtilizacoes();
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
      <h2 style={{ color: "#343a40", marginBottom: "1rem" }}>Produtos e Serviços Mais Utilizados</h2>
      <div
          style={{
            width: "100%",
            maxWidth: "800px",
            overflowX: "auto",
            borderRadius: "8px",
          }}
      >
        <table
          className="tabela-utilizacoes"
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
                Nome
              </th>
              <th
                style={{
                  padding: "0.75rem",
                  border: "1px solid #dee2e6",
                }}
              >
                Tipo
              </th>
              <th
                style={{
                  padding: "0.75rem",
                  border: "1px solid #dee2e6",
                  textAlign: "center",
                }}
              >
                Número de Utilizações
              </th>
            </tr>
          </thead>
          <tbody>
            {dados.map((item, index) => (
              <tr
                key={item.nome + index} // Usando índice para garantir unicidade
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
                  {item.nome}
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #dee2e6",
                    textAlign: "center",
                  }}
                >
                  {item.tipo}
                </td>
                <td
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #dee2e6",
                    textAlign: "center",
                  }}
                >
                  {item.numeroUtilizacoes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaUtilizacoes;
