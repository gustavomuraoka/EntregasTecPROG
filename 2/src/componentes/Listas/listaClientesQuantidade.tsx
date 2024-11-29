/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import './stylelistas.css';

type props = {
    tema: string
}

export default class ListaClienteQuantidade extends Component<props>{
    render() {
        // let tema = this.props.tema
        return (
            <div className="container-fluid">
                <span className = "titulo"> Lista de Clientes que mais gastaram em Quantidade</span>
                <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action">Cliente 1 | Valor R$ 3000,00</a>
                    <a href="#" className="list-group-item list-group-item-action">Cliente 2 | Valor R$ 300,00</a>
                    <a href="#" className="list-group-item list-group-item-action">Cliente 3 | Valor R$ 100,00</a>
                    <a href="#" className="list-group-item list-group-item-action">Cliente 4 | Valor R$ 20,00</a>
                    <a href="#" className="list-group-item list-group-item-action">Cliente 5 | Valor R$ 10,00</a>
                    <a href="#" className="list-group-item list-group-item-action">Cliente 6 | Valor R$ 5,00</a>
                </div>
            </div>
        )
    }
}