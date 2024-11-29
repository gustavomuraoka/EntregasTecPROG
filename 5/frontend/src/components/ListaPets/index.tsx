import axios from "axios";
import React, { useState } from "react";

// Define the type for each pet
interface Pet {
  id: number;
  nome: string;
  genero: string;
  raca: string;
  tipo: string;
}

// Define the type for props
interface DataTableProps {
  data: Pet[]; // Array of pets
}

const ListaPets: React.FC<DataTableProps> = ({ data }) => {
  const [petEditar, setPetEditar] = useState<Pet | null>(null);
  const [openModalEditar, setOpenModalEditar] = useState<boolean>(false);
  const [petNome, setPetNome] = useState('');
  const [petGenero, setPetGenero] = useState('');
  const [petRaca, setPetRaca] = useState('');
  const [petTipo, setPetTipo] = useState('');

  const handleRemove = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/pets/${id}`);
      alert("Pet removido com sucesso! Reload na página para exibir as alterações.");
    } catch (error) {
      console.error("Erro ao remover o pet:", error);
      alert("Erro ao remover o pet.");
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/pets/${id}`);
      const pet = response.data;

      setPetEditar(pet);

      setPetNome(pet.nome);
      setPetGenero(pet.genero);
      setPetRaca(pet.raca);
      setPetTipo(pet.tipo);

      setOpenModalEditar(true);
    } catch (error) {
      console.error("Erro ao editar o pet:", error);
    }
  };

  const handleSaveEdit = async () => {
    if (petEditar) {
      try {
        await axios.put(`http://localhost:3001/api/pets/${petEditar.id}`, {
          nome: petNome,
          genero: petGenero,
          raca: petRaca,
          tipo: petTipo,
        });

        alert("Pet editado com sucesso!");
        setOpenModalEditar(false);
      } catch (error) {
        console.error("Erro ao editar o pet:", error);
        alert("Erro ao editar o pet.");
      }
    }
  };

  return (
    <>
      {openModalEditar && petEditar && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Pet</h2>
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
                  value={petNome}
                  onChange={(e) => setPetNome(e.target.value)}
                />
              </div>
              <div>
                <label>Gênero:</label>
                <select
                  value={petGenero}
                  onChange={(e) => setPetGenero(e.target.value)}
                >
                  <option value="">Selecione o gênero</option>
                  <option value="Macho">Macho</option>
                  <option value="Fêmea">Fêmea</option>
                  <option value="Indefinido">Indefinido</option>
                </select>
              </div>
              <div>
                <label>Raça:</label>
                <input
                  type="text"
                  value={petRaca}
                  onChange={(e) => setPetRaca(e.target.value)}
                />
              </div>
              <div>
                <label>Tipo:</label>
                <input
                  type="text"
                  value={petTipo}
                  onChange={(e) => setPetTipo(e.target.value)}
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
            <th>Gênero</th>
            <th>Raça</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pet, index) => (
            <tr key={index}>
              <td>{pet.id}</td>
              <td>{pet.nome}</td>
              <td>{pet.genero}</td>
              <td>{pet.raca}</td>
              <td>{pet.tipo}</td>
              <td>
                <button
                  onClick={() => handleEdit(pet.id)}
                  style={buttonStyle}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleRemove(pet.id)}
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

export default ListaPets;
