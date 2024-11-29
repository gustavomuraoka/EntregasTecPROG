import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Empresa from "../modelo/empresa"
import Pet from "../modelo/pet"
import Produto from "../modelo/produto"
import Consumo from "../modelo/registroConsumo"
import Servico from "../modelo/servico"
import Cadastro from "./cadastro"

export default class CadastroConsumo extends Cadastro {
    private consumos: Array<Consumo>
    private clientes: Array<Cliente>
    private servicos: Array<Servico>
    private produtos: Array<Produto>
    private entrada: Entrada

    constructor(consumos: Array<Consumo>, clientes: Array<Cliente>, servicos: Array<Servico>, produtos: Array<Produto>) {
        super()
        this.consumos = consumos
        this.clientes = clientes
        this.servicos = servicos
        this.produtos = produtos
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro do Pet`);
        let cpfCliente = this.entrada.receberTexto(`Por favor informe o cpf do cliente: `)
        let servConsumo = this.entrada.receberTexto(`Por favor informe o nome do serviço: `)
        let prodConsumo = this.entrada.receberTexto(`Por favor informe o produto utilizado: `)

        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpfCliente);
        let servico = this.servicos.find(servico => servico.nome === servConsumo);
        let produto = this.produtos.find(produto => produto.nome === prodConsumo);

        if (cliente && servico && produto) {
            this.consumos.push(new Consumo(cliente, servico, produto))
        }
        else {
            console.log(`Alguma das informações não corresponde, tente novamente!`);
            if (!cliente) console.log(`Cliente com CPF ${cpfCliente} não encontrado.`);
            if (!servico) console.log(`Serviço ${servConsumo} não encontrado.`);
            if (!produto) console.log(`Produto ${prodConsumo} não encontrado.`);
        }
    }
}