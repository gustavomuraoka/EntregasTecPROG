import React, { useState, useEffect } from "react";
import './style.css';
import { useNavigate } from "react-router-dom";
import BarraSuperior from "../../components/BarraSuperior";
import axios from "axios";

interface Cliente {
  id: number;
  nome: string;
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
  fornecedor: {
    nome: string;
  };
}

interface Servico {
  id: number;
  nome: string;
  preco: number;
}

interface Pet {
  id: number;
  nome: string;
}

interface Venda {
  id: number;
  produto: Produto | null;
  cliente: Cliente;
  servico: Servico | null;
  pet: Pet | null;
  quantidade: number | null;
  valor: number;
}

function Main() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);

  const [selectedProduto, setSelectedProduto] = useState("");
  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedServico, setSelectedServico] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  const [valor, setValor] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [produtosRes, clientesRes, servicosRes, petsRes, vendasRes] = await Promise.all([
          axios.get("http://localhost:3001/api/produtos"),
          axios.get("http://localhost:3001/api/clientes"),
          axios.get("http://localhost:3001/api/servicos"),
          axios.get("http://localhost:3001/api/pets"),
          axios.get("http://localhost:3001/api/venda"),
        ]);

        setProdutos(produtosRes.data);
        setClientes(clientesRes.data);
        setServicos(servicosRes.data);
        setPets(petsRes.data);
        setVendas(vendasRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const produtoSelecionado = produtos.find((produto) => produto.id === Number(selectedProduto));
    const servicoSelecionado = servicos.find((servico) => servico.id === Number(selectedServico));
    const valorCalculado = (produtoSelecionado?.preco || 0) + (servicoSelecionado?.preco || 0);

    try {
      await axios.post("http://localhost:3001/api/venda", {
        produtoId: selectedProduto || null,
        clienteId: selectedCliente,
        servicoId: selectedServico || null,
        petId: selectedPet || null,
        valor: valorCalculado,
      });

      alert("Venda registrada com sucesso!");

      // Atualiza a lista de vendas
      const vendasRes = await axios.get("http://localhost:3001/api/venda");
      setVendas(vendasRes.data);
    } catch (error) {
      console.error("Erro ao registrar venda:", error);
      alert("Ocorreu um erro ao registrar a venda.");
    }
  };

  return (
    <main>
      <BarraSuperior />

      <div className="page-title">
        <div className="button-container">
          <button onClick={() => navigate("/Produtos")} className="button-url">Produtos</button>
          <button onClick={() => navigate("/Clientes")} className="button-url">Clientes</button>
          <button onClick={() => navigate("/Servicos")} className="button-url">Serviços</button>
          <button onClick={() => navigate("/Pets")} className="button-url">Pets</button>
          <button onClick={() => navigate("/Estatisticas")} className="button-url">Estatísticas</button>
        </div>


        <h1 className="title">Registrar Venda</h1>
        <hr className="line" />
      </div>

      <form onSubmit={handleSubmit} className="form-formvendas">
        <div className="form-group-formvendas">
          <label htmlFor="produto">Produto:</label>
          <select
            id="produto"
            value={selectedProduto}
            onChange={(e) => setSelectedProduto(e.target.value)}
            className="select-formvendas"
          >
            <option value="">Selecione um produto</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group-formvendas">
          <label htmlFor="cliente">Cliente:</label>
          <select
            id="cliente"
            value={selectedCliente}
            onChange={(e) => setSelectedCliente(e.target.value)}
            required
            className="select-formvendas"
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group-formvendas">
          <label htmlFor="servico">Serviço:</label>
          <select
            id="servico"
            value={selectedServico}
            onChange={(e) => setSelectedServico(e.target.value)}
            className="select-formvendas"
          >
            <option value="">Selecione um serviço</option>
            {servicos.map((servico) => (
              <option key={servico.id} value={servico.id}>
                {servico.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group-formvendas">
          <label htmlFor="pet">Pet:</label>
          <select
            id="pet"
            value={selectedPet}
            onChange={(e) => setSelectedPet(e.target.value)}
            className="select-formvendas"
          >
            <option value="">Selecione um pet</option>
            {pets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.nome}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="button-submit-formvendas">
          Registrar Venda
        </button>
      </form>

      <div style={{ margin: "2rem" }}>
        <h2>Vendas Registradas</h2>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Produto</th>
                <th>Serviço</th>
                <th>Pet</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {vendas.map((venda) => (
                <tr key={venda.id}>
                  <td data-label="Cliente">{venda.cliente.nome}</td>
                  <td data-label="Produto">{venda.produto?.nome || "N/A"}</td>
                  <td data-label="Serviço">{venda.servico?.nome || "N/A"}</td>
                  <td data-label="Pet">{venda.pet?.nome || "N/A"}</td>
                  <td data-label="Valor">R$ {venda.valor.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Main;
