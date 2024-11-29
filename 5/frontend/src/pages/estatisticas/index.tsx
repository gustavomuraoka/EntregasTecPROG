import React, { useState, useEffect, useRef } from "react"
import './style.css'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import BarraSuperior from "../../components/BarraSuperior";
import axios from "axios";
import Voltar from "../../components/Voltar";
import Lista10Quantidade from "../../components/Lista10Quantidade";
import TabelaUtilizacoes from "../../components/ListaQuantidadeProdutoServico";
import TabelaTipoRaca from "../../components/ListaProdEServRacaTipo";
import ListaClienteValor from "../../components/ListaClienteValor";


function Estatisticas() {

  return (
    <main>
      <BarraSuperior />
      
      <div className="page-title">
        <Voltar/>
        <h1 className="title">Estatísticas</h1>
        <hr className="line" />
      </div>

      <Lista10Quantidade/>
      <TabelaUtilizacoes/>
      <TabelaTipoRaca/>
      <ListaClienteValor/>

    </main>
  )
}

export default Estatisticas