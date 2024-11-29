import React, { useState, useEffect, useRef } from "react"
import './style.css'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import BarraSuperior from "../../components/BarraSuperior";
import axios from "axios";
import ListFornecedores from "../../components/ListaFornecedores";
import ListaFornecedores from "../../components/ListaFornecedores";
import Voltar from "../../components/Voltar";
import ListaClientes from "../../components/ListaClientes";
import ListaPets from "../../components/ListaPets";

interface Cliente {
  id: number;
  nome: string;
}


function Clientes() {

  const [petNome, setPetNome] = useState('');
  const [petRaca, setPetRaca] = useState('');
  const [petGenero, setPetGenero] = useState('');
  const [petTipo, setPetTipo] = useState('');
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [dataPets, setDataPets] = useState([])

  const navigate = useNavigate();


  const fetchPets = async () => {
    const response = await axios.get("http://localhost:3001/api/pets");
    setDataPets(response.data);
  }

  const fetchClientes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/clientes");
      setClientes(response.data); // Define os clientes no estado
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

// Chama a função para pegar todos os produtos do BD ao montar o componente
  useEffect(() => {
    fetchPets()
    fetchClientes()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/pets", {
        nome: petNome,
        tipo: petTipo,
        raca: petRaca,
        genero: petGenero,
        clienteId: clienteSelecionado,
      });

      alert(`Pet criado com sucesso!`);
      setPetNome('');
      setPetRaca('');
      setPetGenero('');
      setPetTipo('');
      setClienteSelecionado('');
      fetchPets()
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Ocorreu um erro ao salvar.");
    }
  };

  return (
    <main>
        <BarraSuperior/>
      <div className="page-title">
        <Voltar/>
        <h1 className="title">Pets</h1>
        <hr className="line" />
        </div>

      <form onSubmit={handleSubmit} className="form-formvendas">
        <div className="form-group-formvendas">
          <label htmlFor="nome" className="label-formvendas">
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            value={petNome}
            onChange={(e) => setPetNome(e.target.value)}
            required
            className="input-formvendas"
          />
        </div>

        <div className="form-group-formvendas">
          <label htmlFor="nomeSocial" className="label-formvendas">
            Raça do Pet:
          </label>
          <input
            type="text"
            id="nomeSocial"
            value={petRaca}
            onChange={(e) => setPetRaca(e.target.value)}
            className="input-formvendas"
          />
        </div>

        <div className="form-group-formvendas">
          <label htmlFor="CPF" className="label-formvendas">
            Tipo do Pet:
          </label>
          <input
            type="text"
            id="CPF"
            value={petTipo}
            onChange={(e) => setPetTipo(e.target.value)}
            required
            className="input-formvendas"
          />
        </div>

        <div className="form-group-formvendas">
          <label htmlFor="petGenero" className="label-formvendas">
            Gênero do Pet
          </label>
          <select
            id="petGenero"
            value={petGenero}
            onChange={(e) => setPetGenero(e.target.value)}
            required
            className="input-formvendas"
          >
            <option value="">Selecione o gênero</option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
            <option value="Indefinido">Indefinido</option>
          </select>
        </div>

        <div className="form-group-formvendas">
          <label htmlFor="cliente" className="label-formvendas">
            Dono:
          </label>
          <select
            id="cliente"
            value={clienteSelecionado}
            onChange={(e) => setClienteSelecionado(e.target.value)}
            required
            className="input-formvendas"
          >
            <option value="">Selecione o cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="button-submit-formvendas">
          Enviar
        </button>
      </form>

    
      <hr className="line" />


      <ListaPets data = {dataPets}/>
    
    </main>
  )
}

export default Clientes