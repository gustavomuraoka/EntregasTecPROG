export default function FormularioCadastroProduto(props) {
    let tema = props.tema
    return (
        <div className="container-fluid">
                <form>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nome do Produto" aria-label="Nome do Serviço" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-preco mb-3">
                        <input type="number" min="0.00" max="10000.00" step="0.01" />
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" type="button" style={{ background: tema }}>Cadastrar</button>
                    </div>
                </form>
            </div>
    )
}