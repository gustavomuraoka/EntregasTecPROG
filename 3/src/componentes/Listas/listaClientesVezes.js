import './stylelistas.css';

export default function ListaClienteVezes(props) {
    let tema = props.tema
    return (
        <div className="container-fluid">
            <span className = "titulo"> Lista de Clientes que mais foram atendidos</span>
            <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action">Cliente 1 | 4 Atendimentos</a>
                <a href="#" className="list-group-item list-group-item-action">Cliente 2 | 2 Atendimentos</a>
                <a href="#" className="list-group-item list-group-item-action">Cliente 3 | 2 Atendimentos</a>
                <a href="#" className="list-group-item list-group-item-action">Cliente 4 | 1 Atendimentos</a>
                <a href="#" className="list-group-item list-group-item-action">Cliente 5 | 1 Atendimentos</a>
                <a href="#" className="list-group-item list-group-item-action">Cliente 6 | 1 Atendimentos</a>
            </div>
        </div>
    )
}