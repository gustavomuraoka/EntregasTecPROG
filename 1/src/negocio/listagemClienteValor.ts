import Consumo from "../modelo/registroConsumo";
import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class ListagemClientesPorValor extends Listagem {

    private consumos: Array<Consumo>
    constructor(consumos: Array<Consumo>) {
        super()
        this.consumos = consumos
    }
    public listar(): void {
        console.log(`\nOs 5 clientes que mais consumiram em valor:\n`);

        const valorConsumidoPorCliente = new Map<Cliente, number>();

        this.consumos.forEach(consumo => {
            const cliente = consumo.cliente;
            const valorAtual = valorConsumidoPorCliente.get(cliente) || 0;
            valorConsumidoPorCliente.set(cliente, valorAtual + Number(consumo.valor));
        });

        const topClientes = Array.from(valorConsumidoPorCliente.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        topClientes.forEach(([cliente, valorTotal], index) => {
            console.log(`${index + 1}. Cliente: ${cliente.nome}`);
            console.log(`   Valor total consumido: R$${valorTotal.toFixed(2)}`);
            console.log(`--------------------------------------`);
        });
    }
}
