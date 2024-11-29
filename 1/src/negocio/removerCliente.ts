import Remover from "./remover";
import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";

export default class RemoverCliente extends Remover {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(produtos: Array<Cliente>) {
        super()
        this.clientes = produtos
        this.entrada = new Entrada()
    }
    public remover(): void {
        let cpfCliente = this.entrada.receberTexto(`Por favor informe o cpf do cliente: `)
        let count = 0;
        this.clientes.forEach(cliente => {
            if (cliente.getCpf.getValor === cpfCliente){
                this.clientes.splice(count, 1)
            }
            count += 1;
        })
        console.log(`Cliente removido com sucesso :)\n`);
    }
}