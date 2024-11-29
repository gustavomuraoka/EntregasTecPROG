/* eslint-disable no-unused-vars */
import { useState } from "react";
import BarraNavegacao from "./barraNavegacao"
import ListaCliente from "./Listas/listaClientes";
import FormularioCadastroCliente from "./Formularios/formularioCadastroCliente";
import FormularioCadastroPet from "./Formularios/formularioCadastroPet";
import FormularioCadastroProduto from "./Formularios/formularioCadastroProduto";
import FormularioCadastroServico from "./Formularios/formularioCadastroServico";
import ListaClienteQntd from "./Listas/listaClientesQuantidade";
import ListaClienteVezes from "./Listas/listaClientesVezes";
import ListaPets from "./Listas/listaPets";
import ListaProduto from "./Listas/listaProduto";
import ListaServico from "./Listas/listaServico";

export default function Roteador() {
    const [tela, setTela] = useState('Clientes')
    const selecionarView = (valor, e) => {
        e.preventDefault()
        setTela(valor)
    }

    const construirView = () => {

        switch (tela){
            case 'Clientes':
                return (
                    <>
                        <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Menu Principal', 'Clientes', 'Pets', 'Serviços', 'Produtos']} />
                        <FormularioCadastroCliente/>
                        <ListaCliente tema="#e3f2fd" />
                    </>
                )
            case 'Pets':
                return (
                    <>
                        <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Menu Principal', 'Clientes', 'Pets', 'Serviços', 'Produtos']} />
                        <FormularioCadastroPet/>
                        <ListaPets/>
                    </>
                )
            case 'Produtos':
                return (
                    <>
                        <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Menu Principal', 'Clientes', 'Pets', 'Serviços', 'Produtos']} />
                        <FormularioCadastroProduto/>
                        <ListaProduto/>
                    </>
                )
            case 'Serviços':
                return (
                    <>
                        <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Menu Principal', 'Clientes', 'Pets', 'Serviços', 'Produtos']} />
                        <FormularioCadastroServico/>
                        <ListaServico/>
                    </>
                )
            default:
                return (
                    <>
                        <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Menu Principal', 'Clientes', 'Pets', 'Serviços', 'Produtos']} />
                        <ListaClienteQntd/>
                        <ListaClienteVezes/>
                    </>
                )
            
        }   
    }

    return (
        construirView()
    )
}