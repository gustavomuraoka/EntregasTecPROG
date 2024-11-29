/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";

type props = {
    tema: string
}

export default class ListaPet extends Component<props>{
    render() {
        return (
            <div className="container-fluid">
                <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action">Pet 1</a>
                    <a href="#" className="list-group-item list-group-item-action">Pet 2</a>
                    <a href="#" className="list-group-item list-group-item-action">Pet 3</a>

                </div>
            </div>
        )
    }
}