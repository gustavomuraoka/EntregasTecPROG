import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Consumo from "../modelo/registroConsumo";
import Listagem from "./listagem";

export default class ListagemConsumo extends Listagem {
    private consumos: Array<Consumo>
    private entrada: Entrada
    constructor(consumos: Array<Consumo>) {
        super()
        this.consumos = consumos
        this.entrada = new Entrada()
    }
    public listar(): void {
        console.log(`\nLista de todos os consumos:`);
        this.consumos.forEach(consumo => {
            console.log(`Cliente: ` + consumo.cliente.nome);
            console.log(`Serviço: ` + consumo.servico.nome);
            console.log(`Produto: ` + consumo.produto.nome);
            console.log(`Valor total: ` + consumo.valor);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }

    public listar_especifico(clientes: Array<Cliente>): void {
        console.log(`\nConsulta de consumos de um cliente específico`);
        
        let cpfCliente = this.entrada.receberTexto(`Informe o CPF do cliente: `);
    
        let cliente = clientes.find(cliente => cliente.getCpf.getValor === cpfCliente.trim());

        if (cliente) {
            console.log(`\nConsumos do cliente: ${cliente.nome}`);
            
            let consumosCliente = this.consumos.filter(consumo => consumo.cliente.getCpf.getValor === cpfCliente);

            if (consumosCliente.length > 0) {
                consumosCliente.forEach(consumo => {
                    console.log(`Serviço: ` + consumo.servico.nome);
                    console.log(`Produto: ` + consumo.produto.nome);
                    console.log(`Valor total: ` + consumo.valor);
                    console.log(`--------------------------------------`);
                });
            } else {
                console.log(`\nEste cliente não possui consumos registrados.\n`);
            }
        } else {
            console.log(`\nCliente com CPF ${cpfCliente} não encontrado.\n`);
        }
    }
}