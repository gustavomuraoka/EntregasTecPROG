import Cliente from "./cliente"
import Produto from "./produto"
import Servico from "./servico"


export default class Consumo {
    public cliente: Cliente
    public servico: Servico
    public produto: Produto
    public valor: Number

    constructor(cliente: Cliente, servico: Servico, produto: Produto) {
        this.cliente = cliente
        this.servico = servico
        this.produto = produto
        this.valor = servico.preco + produto.preco
    }
}