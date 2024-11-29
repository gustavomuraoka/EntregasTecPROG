import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import Servico from "../modelo/servico"
import CPF from "../modelo/cpf"
import Cadastro from "./cadastro"

export default class CadastroServico extends Cadastro {
    private servicos: Array<Servico>
    private entrada: Entrada
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
        this.entrada = new Entrada()
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do serviço`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do serviço: `)
        let preco: number = Number(this.entrada.receberTexto(`Por favor informe o preço do serviço: `))
        let servico = new Servico(nome, preco)
        this.servicos.push(servico)
        console.log(`\nCadastro concluído :)\n`);
    }
}