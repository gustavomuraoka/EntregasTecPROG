import Remover from "./remover";
import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Servico from "../modelo/servico";

export default class RemoverServico extends Remover {
    private servicos: Array<Servico>
    private entrada: Entrada
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    public remover(): void {
        let servNome = this.entrada.receberTexto(`Por favor informe o nome do serviço: `)
        let count = 0;
        this.servicos.forEach(servico => {
            if (servico.nome === servNome){
                this.servicos.splice(count, 1)
            }
            count += 1;
        })
        console.log(`Serviço removido com sucesso :)\n`);
    }
}