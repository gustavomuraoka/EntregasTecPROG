import Entrada from "../io/entrada";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
import Edicao from "./editar";

export default class EditarServico extends Edicao {
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public editar(): void {
        console.log(`\nInício da edição do produto`);

        let servNome = this.entrada.receberTexto(`Informe o nome do serviço que deseja editar: `);
        
        let servico = this.servicos.find(servico => servico.nome == servNome);

        if (servico) {
            console.log(`Produto encontrado: ${servico.nome}`);

            let nome = this.entrada.receberTexto(`Por favor informe o novo nome do serviço: `);
            let preco = this.entrada.receberNumero(`Por favor informe o novo preço do serviço: `);

            if (nome) {
                servico.nome = nome;
            }
            if (!isNaN(preco) && preco > 0) {
                servico.preco = preco;
            }

            console.log(`\nEdição do serviço concluída!\n`);
        } else {
            console.log(`\nServiço não encontrado.\n`);
        }
    }
}
