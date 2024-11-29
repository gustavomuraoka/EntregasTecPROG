import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Empresa from "../modelo/empresa"
import Pet from "../modelo/pet"
import Cadastro from "./cadastro"

export default class CadastroPet extends Cadastro {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public cadastrar(): Pet | undefined {
        console.log(`\nInício do cadastro do Pet`);
        let cpfCliente = this.entrada.receberTexto(`Por favor informe o cpf do cliente responsável pelo pet: `)

        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpfCliente);

        if (cliente) {
            console.log(`Cliente encontrado: ${cliente.nome}`);
            let nome = this.entrada.receberTexto(`Por favor informe o nome do pet: `)
            let raca = this.entrada.receberTexto(`Por favor informe a raça do pet: `);
            let genero = this.entrada.receberTexto(`Por favor informe o gênero do pet: `);
            let tipo = this.entrada.receberTexto(`Por favor informe o tipo do pet: `);
            let pet = new Pet(nome, raca, genero, tipo)
            cliente.getPets.push(pet)
            return pet
        }
        else {
            console.log(`Cliente não encontrado`);
        }
    }
}