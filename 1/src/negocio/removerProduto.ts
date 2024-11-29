import Produto from "../modelo/produto";
import Listagem from "./listagem";
import Remover from "./remover";
import Entrada from "../io/entrada";

export default class RemoverProdutos extends Remover {
    private produtos: Array<Produto>
    private entrada: Entrada
    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos
        this.entrada = new Entrada()
    }
    public remover(): void {
        let nome = this.entrada.receberTexto(`Por favor informe o nome do produto: `)
        let count = 0;
        this.produtos.forEach(produto => {
            if (produto.nome === nome){
                this.produtos.splice(count, 1)
            }
            count += 1;
        })
        console.log(`\n`);
    }
}