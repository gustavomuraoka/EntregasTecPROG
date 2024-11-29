import Consumo from "../modelo/registroConsumo";
import Listagem from "./listagem";

export default class ListagemConsumoPorTipoERaca extends Listagem {
    private consumos: Array<Consumo>;

    constructor(consumos: Array<Consumo>) {
        super();
        this.consumos = consumos;
    }

    public listar(): void {
        console.log(`\nProdutos e Serviços mais consumidos por Tipo e Raça de Pet:\n`);

        const consumoPorTipoERaca = new Map<string, { produtos: Map<string, number>, servicos: Map<string, number> }>();

        this.consumos.forEach(consumo => {
            consumo.cliente.getPets.forEach(pet => {
                const tipoRacaKey = `${pet.getTipo}-${pet.getRaca}`;

                if (!consumoPorTipoERaca.has(tipoRacaKey)) {
                    consumoPorTipoERaca.set(tipoRacaKey, { produtos: new Map(), servicos: new Map() });
                }

                const produtos = consumoPorTipoERaca.get(tipoRacaKey)!.produtos;
                produtos.set(consumo.produto.nome, (produtos.get(consumo.produto.nome) || 0) + 1);

                const servicos = consumoPorTipoERaca.get(tipoRacaKey)!.servicos;
                servicos.set(consumo.servico.nome, (servicos.get(consumo.servico.nome) || 0) + 1);
            });
        });

        consumoPorTipoERaca.forEach((consumo, tipoRaca) => {
            console.log(`\nTipo e Raça do Pet: ${tipoRaca}`);

            console.log(`Produtos mais consumidos:`);
            const produtosOrdenados = Array.from(consumo.produtos.entries()).sort((a, b) => b[1] - a[1]);
            produtosOrdenados.forEach(([nome, quantidade], index) => {
                console.log(`${index + 1}. Produto: ${nome} - Quantidade consumida: ${quantidade}`);
            });

            console.log(`Serviços mais consumidos:`);
            const servicosOrdenados = Array.from(consumo.servicos.entries()).sort((a, b) => b[1] - a[1]);
            servicosOrdenados.forEach(([nome, quantidade], index) => {
                console.log(`${index + 1}. Serviço: ${nome} - Quantidade consumida: ${quantidade}`);
            });
            console.log(`----------------------------------`);
        });
    }
}