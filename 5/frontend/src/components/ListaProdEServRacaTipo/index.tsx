import React, { useEffect, useState } from "react";
import axios from "axios";

interface JsonData {
  [key: string]: {
    [key: string]: {
      servico: string;
      produto: string;
    };
  };
}

const TabelaTipoRaca: React.FC = () => {
  const [data, setData] = useState<JsonData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os dados
  const fetchData = async () => {
    try {
      const response = await axios.get<JsonData>(
        "http://localhost:3001/api/estatisticas/raca-e-tipo"
      );
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar os dados.");
    } finally {
      setLoading(false);
    }
  };

  // Chama fetchData ao montar o componente
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  if (!data) {
    return <p>Não há dados disponíveis.</p>;
  }

  // Obtém as categorias principais (Cão, Humano, etc.)
  const mainCategories = Object.keys(data);

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

    <h2 style={{ color: "#343a40", marginBottom: "1rem" }}>Produtos e Serviços Mais Utilizados por Raça e Tipo</h2>
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
                Tipo
              </th>
              <th
                style={{
                  padding: "0.75rem",
                  border: "1px solid #dee2e6",
                }}
              >
                Raça
              </th>
              <th
                style={{
                  padding: "0.75rem",
                  border: "1px solid #dee2e6",
                  textAlign: "center",
                }}
              >
                Serviço
              </th>
              <th
                style={{
                  padding: "0.75rem",
                  border: "1px solid #dee2e6",
                  textAlign: "center",
                }}
              >
                Produto
              </th>
            </tr>
          </thead>
          <tbody>
            {mainCategories.map((category, categoryIndex) => {
              const subcategories = Object.keys(data[category]);

              return (
                <React.Fragment key={category}>
                  {/* Linha separadora antes de cada categoria, exceto a primeira */}
                  {categoryIndex > 0 && (
                    <tr style={{
                      backgroundColor: "#ffffff",
                      transition: "background-color 0.3s ease",
                    }}>
                      <td colSpan={4} style={{ backgroundColor: "#f0f0f0", height: "5px" }}></td>
                    </tr>
                  )}
                  {/* Linhas de dados da categoria */}
                  {subcategories.map((subcategory, index) => {
                    const { servico, produto } = data[category][subcategory];
                    return (
                      <tr key={`${category}-${subcategory}`}>
                        {/* Renderiza a célula de categoria apenas na primeira linha de cada grupo */}
                        {index === 0 && (
                          <td rowSpan={subcategories.length}>{category}</td>
                        )}
                        <td
                          style={{
                            padding: "0.75rem",
                            border: "1px solid #dee2e6",
                            textAlign: "center",
                          }}
                        >
                          {subcategory}
                        </td>

                        <td
                          style={{
                            padding: "0.75rem",
                            border: "1px solid #dee2e6",
                            textAlign: "center",
                          }}
                        >
                          {servico}
                        </td>

                        <td
                          style={{
                            padding: "0.75rem",
                            border: "1px solid #dee2e6",
                            textAlign: "center",
                          }}
                        >
                          {produto}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default TabelaTipoRaca;
