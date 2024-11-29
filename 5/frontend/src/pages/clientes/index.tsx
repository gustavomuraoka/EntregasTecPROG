import React, { useState, useEffect, useRef } from "react"
import './style.css'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import BarraSuperior from "../../components/BarraSuperior";
import axios from "axios";
import ListFornecedores from "../../components/ListaFornecedores";
import ListaFornecedores from "../../components/ListaFornecedores";
import Voltar from "../../components/Voltar";
import ListaClientes from "../../components/ListaClientes";


function Clientes() {

  const [clienteNome, setClienteNome] = useState('');
  const [clienteNomeSocial, setClienteNomeSocial] = useState('');
  const [clienteCPF, setClienteCPF] = useState('');
  const [clienteDataCadastro, setClienteDataCadastro] = useState('');
  const [clienteRG, setClienteRG] = useState('');
  const [clienteDataRG, setClienteDataRG] = useState('');
  const [clienteDDD, setClienteDDD] = useState('');
  const [clienteNumero, setClienteNumero] = useState('');
  const [dataClientes, setDataClientes] = useState([])

  const navigate = useNavigate();


  const fetchClientes = async () => {
    const response = await axios.get("http://localhost:3001/api/clientes");
    setDataClientes(response.data);
  }

// Chama a função para pegar todos os produtos do BD ao montar o componente
  useEffect(() => {
    fetchClientes()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log({
      numero: clienteRG,
      dataEmissao: clienteDataRG,
      clienteCPF: clienteCPF,
    });
    try {
      const response = await axios.post("http://localhost:3001/api/clientes", {
        nome: clienteNome,
        nomeSocial: clienteNomeSocial,
        CPF: clienteCPF,
        dataCadastro: clienteDataCadastro,
      });

      const responseRG = await axios.post("http://localhost:3001/api/rg", {
        numero: clienteRG, 
        dataEmissao: clienteDataRG, 
        clienteCPF: clienteCPF,
      });

      const responseTelefone = await axios.post("http://localhost:3001/api/telefones", {
        numero: clienteNumero, 
        ddd: clienteDDD, 
        clienteCPF: clienteCPF,
      });

      alert(`Cliente criado com sucesso!`);
      setClienteNome("");
      setClienteNomeSocial("")
      setClienteCPF("")
      setClienteDataCadastro("")
      fetchClientes()
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
        <h1 className="title">Clientes</h1>
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
            value={clienteNome}
            onChange={(e) => setClienteNome(e.target.value)}
            required
            className="input-formvendas"
          />
        </div>

        <div className="form-group-formvendas">
          <label htmlFor="nomeSocial" className="label-formvendas">
            Nome Social:
          </label>
          <input
            type="text"
            id="nomeSocial"
            value={clienteNomeSocial}
            onChange={(e) => setClienteNomeSocial(e.target.value)}
            className="input-formvendas"
          />
        </div>

        <div className="form-group-formvendas">
          <label htmlFor="CPF" className="label-formvendas">
            CPF:
          </label>
          <input
            type="text"
            id="CPF"
            value={clienteCPF}
            onChange={(e) => setClienteCPF(e.target.value)}
            required
            className="input-formvendas"
          />
        </div>

        <div className="form-group-formvendas">
          <label htmlFor="dataCadastro" className="label-formvendas">
            Data de Cadastro:
          </label>
          <input
            type="date"
            id="dataCadastro"
            value={clienteDataCadastro}
            onChange={(e) => setClienteDataCadastro(e.target.value)}
            required
            className="input-formvendas"
          />
        </div>

        {/* RG */}
        <div className="form-group-formvendas">
          <label htmlFor="RG" className="label-formvendas">
            RG:
          </label>
          <input
            type="text"
            id="RG"
            value={clienteRG}
            onChange={(e) => setClienteRG(e.target.value)}
            required
            className="input-formvendas"
          />
        </div>
        
        <div className="form-group-formvendas">
          <label htmlFor="dataRG" className="label-formvendas">
            Data de Emissão RG:
          </label>
          <input
            type="date"
            id="dataRG"
            value={clienteDataRG}
            onChange={(e) => setClienteDataRG(e.target.value)}
            required
            className="input-formvendas"
          />
        </div>

        {/* Telefone */}
        <div className="form-group-formvendas">
          <label htmlFor="ddd" className="label-formvendas">
            DDD do Telefone:
          </label>
          <input
            type="text"
            id="clienteDDD"
            value={clienteDDD}
            onChange={(e) => setClienteDDD(e.target.value)}
            required
            className="input-formvendas"
          />
        </div>
        
        <div className="form-group-formvendas">
          <label htmlFor="telefone" className="label-formvendas">
            Número do Telefone:
          </label>
          <input
            type="text"
            id="clienteNuemro"
            value={clienteNumero}
            onChange={(e) => setClienteNumero(e.target.value)}
            required
            className="input-formvendas"
          />
        </div>

        <button type="submit" className="button-submit-formvendas">
          Enviar
        </button>
      </form>

    
      <hr className="line" />


      <ListaClientes data = {dataClientes}/>
    
    </main>
  )
}

export default Clientes