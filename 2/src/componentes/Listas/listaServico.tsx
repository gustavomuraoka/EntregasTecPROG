/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import './stylelistas.css';

type props = {
    tema: string
}

export default class ListaServico extends Component<props>{
    render() {
        // let tema = this.props.tema
        return (
            <div className="container-fluid">
                <span className = "titulo"> Lista de Serviços</span>
                <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action">Serviço 1 | Preço R$ 20,56</a>
                    <a href="#" className="list-group-item list-group-item-action">Serviço 2 | Preço R$ 30,55</a>
                    <a href="#" className="list-group-item list-group-item-action">Serviço 3 | Preço R$ 40,00</a>
                    <a href="#" className="list-group-item list-group-item-action">Serviço 4 | Preço R$ 50,23</a>

                </div>
            </div>
        )
    }
}