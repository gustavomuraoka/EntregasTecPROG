import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./Listas/listaClientes";
import FormularioCadastroCliente from "./Formularios/formularioCadastroCliente";
import FormularioCadastroPet from "./Formularios/formularioCadastroPet";
import FormularioCadastroServico from "./Formularios/formularioCadastroServico";
import ListaPet from "./Listas/listaPets";
import ListaServico from "./Listas/listaServico";
import FormularioCadastroProduto from "./Formularios/formularioCadastroProduto";
import ListaProduto from "./Listas/listaProduto";
import ListaClienteQuantidade from "./Listas/listaClientesQuantidade";
import ListaClienteVezes from "./Listas/listaClientesVezes";

type state = {
    tela: string
}

export default class Roteador extends Component<{}, state>{
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Clientes'
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        console.log(novaTela);
        this.setState({
            tela: novaTela
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="#e3f2fd" botoes={['Menu Principal', 'Clientes', 'Pets', 'Serviços', 'Produtos']} />
        
        switch(this.state.tela) {
            case "Clientes":
                return (
                    <>
                        {barraNavegacao}
                        <FormularioCadastroCliente tema="#e3f2fd" />
                        <ListaCliente tema="#e3f2fd"/>
                    </>
                )
            
            case "Pets":
                return (
                    <>
                        {barraNavegacao}
                        <FormularioCadastroPet tema="#e3f2fd" />
                        <ListaPet tema="#e3f2fd"></ListaPet>
                    </>
                )
            
            case "Serviços":
                return (
                    <>
                        {barraNavegacao}
                        <FormularioCadastroServico tema="#e3f2fd" />
                        <ListaServico/>
                    </>
                )
            case "Produtos":
                return (
                    <>
                        {barraNavegacao}
                        <FormularioCadastroProduto/>
                        <ListaProduto/>
                    </>
                )
            default:
                return (
                    <>
                        {barraNavegacao}
                        <ListaClienteQuantidade/>
                        <ListaClienteVezes/>
                    </>
                )
        }
        
        // if (this.state.tela === 'Clientes') {
        //     return (
        //         <>
        //             {barraNavegacao}
        //             <ListaCliente tema="#e3f2fd" />
        //         </>
        //     )
        // } else {
        //     if (this.state.tela === 'Pets') {
        //         return (
        //             <>
        //                 {barraNavegacao}
        //                 <FormularioCadastroPet tema="#e3f2fd" />
        //             </>
        //         )
        //     }
        //     else {
        //         return (
        //             <>
        //                 {barraNavegacao}
        //                 <FormularioCadastroCliente tema="#e3f2fd" />
        //             </>
        //         )
        //     }
        // }
    }
}