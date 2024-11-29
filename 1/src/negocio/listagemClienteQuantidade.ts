import Cliente from "../modelo/cliente";
import Consumo from "../modelo/registroConsumo";
import Listagem from "./listagem";

export default class ListagemClienteQuantidade extends Listagem {
    private consumos: Array<Consumo>;

    constructor(consumos: Array<Consumo>) {
        super();
        this.consumos = consumos;
    }

    public listar(): void {
        console.log(`TOP 10 Cliente com maior número de consumos:`);

        let consumoPorCliente = new Map<Cliente, number>();

        this.consumos.forEach(consumo => {
            let cliente = consumo.cliente;
            if (consumoPorCliente.has(cliente)) {
                consumoPorCliente.set(cliente, consumoPorCliente.get(cliente)! + 1);
            } else {
                consumoPorCliente.set(cliente, 1);
            }
        });

        let sortClientes = Array.from(consumoPorCliente.entries()).sort((a, b) => b[1] - a[1]);

        sortClientes.slice(0, 10).forEach(([cliente, quantidade], index) => {
            console.log(`${cliente.nome}: ${quantidade}`);
        });

        console.log(`\n`);
    }
}