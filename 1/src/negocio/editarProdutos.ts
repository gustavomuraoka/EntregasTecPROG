import Entrada from "../io/entrada";
import Produto from "../modelo/produto";
import Edicao from "./editar";

export default class EditarProduto extends Edicao {
    private produtos: Array<Produto>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public editar(): void {
        console.log(`\nInício da edição do produto`);

        let prodNome = this.entrada.receberTexto(`Informe o nome do produto que deseja editar: `);
        
        let produto = this.produtos.find(produto => produto.nome == prodNome);

        if (produto) {
            console.log(`Produto encontrado: ${produto.nome}`);

            let nome = this.entrada.receberTexto(`Por favor informe o novo nome do produto: `);
            let preco = this.entrada.receberNumero(`Por favor informe o novo preço do produto: `);

            if (nome) {
                produto.nome = nome;
            }
            if (!isNaN(preco) && preco > 0) {
                produto.preco = preco;
            }

            console.log(`\nEdição do produto concluída!\n`);
        } else {
            console.log(`\nProduto não encontrado.\n`);
        }
    }
}
