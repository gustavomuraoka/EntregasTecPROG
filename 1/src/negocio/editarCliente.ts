import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import Cadastro from "./cadastro";
import Edicao from "./editar";

export default class EditarCliente extends Edicao {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public editar(): void {
        console.log(`\nInício da edição do cliente`);

        let cpfCliente = this.entrada.receberTexto(`Informe o CPF do cliente que deseja editar: `);
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpfCliente);

        if (cliente) {
            console.log(`Cliente encontrado: ${cliente.nome}`);
            
            let nome = this.entrada.receberTexto(`Por favor informe o novo nome do cliente: `);
            let nomeSocial = this.entrada.receberTexto(`Por favor informe o novo nome social do cliente: `);

            if (nome) {
                cliente.nome = nome;
            }
            if (nomeSocial) {
                cliente.nomeSocial = nomeSocial;
            }

            console.log(`\nEdição concluída!\n`);
        } else {
            console.log(`\nCliente com CPF ${cpfCliente} não encontrado.\n`);
        }
    }
}