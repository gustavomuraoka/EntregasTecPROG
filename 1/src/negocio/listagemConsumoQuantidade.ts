import Consumo from "../modelo/registroConsumo";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
import Listagem from "./listagem";

export default class ListagemConsumoQntd extends Listagem {
    
    private consumos: Array<Consumo>;

    constructor(consumos: Array<Consumo>) {
        super();
        this.consumos = consumos;
    }

    public listar(): void {
        console.log(`\nServiços e Produtos mais utilizados:`);

        let usoServicos = new Map<string, number>();
        let usoProdutos = new Map<string, number>();

        this.consumos.forEach(consumo => {
            let nomeServico = consumo.servico.nome;
            let nomeProduto = consumo.produto.nome;

            usoServicos.set(nomeServico, (usoServicos.get(nomeServico) || 0) + 1);
            usoProdutos.set(nomeProduto, (usoProdutos.get(nomeProduto) || 0) + 1);
        });

        let servicosOrdenados = Array.from(usoServicos.entries()).sort((a, b) => b[1] - a[1]);
        let produtosOrdenados = Array.from(usoProdutos.entries()).sort((a, b) => b[1] - a[1]);

        console.log(`\nServiços mais utilizados:`);
        servicosOrdenados.forEach(([nome, quantidade], index) => {
            console.log(`${index + 1}. Serviço: ${nome} - Quantidade de utilizações: ${quantidade}`);
        });

        console.log(`\nProdutos mais utilizados:`);
        produtosOrdenados.forEach(([nome, quantidade], index) => {
            console.log(`${index + 1}. Produto: ${nome} - Quantidade de utilizações: ${quantidade}`);
        });

        console.log(`\n`);
    }
}