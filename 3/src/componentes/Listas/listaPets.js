import './stylelistas.css';

export default function ListaPets(props) {
    let tema = props.tema
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