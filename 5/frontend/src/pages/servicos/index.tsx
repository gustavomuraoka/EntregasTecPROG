import React, { useState, useEffect, useRef } from "react"
import './style.css'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import BarraSuperior from "../../components/BarraSuperior";
import axios from "axios";
import ListaProdutos from "../../components/ListaProdutos";
import Voltar from "../../components/Voltar";
import ListaServicos from "../../components/ListaServicos";


function Servicos() {

  const [servicoNome, setServicoNome] = useState("");
  const [servicoPreco, setServicoPreco] = useState("");
  const [dataProdutos, setDataServicos] = useState([])

  const navigate = useNavigate();

  // Função para buscar todos os produtos
  const fetchServicos = async () => {
    const response = await axios.get("http://localhost:3001/api/servicos");
    setDataServicos(response.data);
  }

// Chama a função para pegar todos os produtos do BD ao montar o componente
  useEffect(() => {
    fetchServicos()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/servicos", {
        nome: servicoNome,
        preco: parseFloat(servicoPreco),
      });
      alert(`Serviço criado com sucesso!`);
      setServicoNome("");
      setServicoPreco("");
      fetchServicos()
    } catch (error) {
      console.error("Erro ao salvar o serviço:", error);
      alert("Ocorreu um erro ao salvar o serviço.");
    }
  };

  return (
    <main>
        <BarraSuperior/>
      <div className="page-title">
        <Voltar/>
        <h1 className="title">Serviços</h1>
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
            value={servicoNome}
            onChange={(e) => setServicoNome(e.target.value)}
            required
            className="input-formvendas"
          />
        </div>

        <div className="form-group-formvendas">
          <label htmlFor="preco" className="label-formvendas">
            Preço:
          </label>
          <input
            type="number"
            id="preco"
            value={servicoPreco}
            onChange={(e) => setServicoPreco(e.target.value)}
            required
            min="0"
            step="0.01"
            className="input-formvendas"
          />
        </div>

        <button type="submit" className="button-submit-formvendas">
          Enviar
        </button>
      </form>

    
      <hr className="line" />

      <ListaServicos data = {dataProdutos}/>
    
    </main>
  )
}

export default Servicos