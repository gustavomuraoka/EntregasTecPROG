import './style.css';

export default function FormularioCadastroPet(props) {
    let tema = props.tema
    return (
        <div className="container-fluid">
                <form>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Raça" aria-label="Raça" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Tipo" aria-label="Tipo" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-radios mb-3">
                        <input type="radio" id="generoChoice1" name="genero" value="macho" />
                        <label htmlFor="generoChoice1">Macho</label>

                        <input type="radio" id="generoChoice2" name="genero" value="femea" />
                        <label htmlFor="generoChoice2">Fêmea</label>

                        <input type="radio" id="generoChoice3" name="genero" value="indefinido" />
                        <label htmlFor="generoChoice3">Indefinido</label>
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" type="button" style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>
            </div>
    )
}
