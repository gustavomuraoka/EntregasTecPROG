import Cliente from "./cliente"
import Pet from "./pet"
import Produto from "./produto"
import Consumo from "./registroConsumo"
import Servico from "./servico"

export default class Empresa{
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private servicos: Array<Servico>
    private pets: Array<Pet>
    private consumos: Array<Consumo>

    constructor(){
        this.clientes = []
        this.produtos = []
        this.servicos = []
        this.pets = []
        this.consumos = []
    }
    public get getClientes(){
        return this.clientes
    }
    public get getProdutos(){
        return this.produtos
    }
    public get getServicos(){
        return this.servicos
    }
    public get getPets(){
        return this.pets
    }
    public get getConsumos(){
        return this.consumos
    }
}