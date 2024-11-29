import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";
import CadastroCliente from "../negocio/cadastroCliente";
import ListagemClientes from "../negocio/listagemClientes";
import CadastroProduto from "../negocio/cadastroProduto";
import ListagemProdutos from "../negocio/listagemProdutos";
import RemoverProdutos from "../negocio/removerProduto";
import CadastroServico from "../negocio/cadastroServico";
import ListagemServicos from "../negocio/listagemServicos";
import EditarCliente from "../negocio/editarCliente";
import RemoverCliente from "../negocio/removerCliente";
import EditarProduto from "../negocio/editarProdutos";
import EditarServico from "../negocio/editarServico";
import RemoverServico from "../negocio/removerServico";
import CadastroPet from "../negocio/cadastroPet";
import ListagemPets from "../negocio/listagemPets";
import EditarPet from "../negocio/editarPet";
import RemoverPet from "../negocio/removerPet";
import CadastroConsumo from "../negocio/cadastroConsumo";
import ListagemConsumo from "../negocio/listagemConsumo";
import ListagemClienteQuantidade from "../negocio/listagemClienteQuantidade";
import ListagemConsumoQntd from "../negocio/listagemConsumoQuantidade";
import ListagemConsumoPorTipoERaca from "../negocio/listagemTipoRaca";
import ListagemClientesPorValor from "../negocio/listagemClienteValor";

console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`)
let empresa = new Empresa()
let execucao = true

while (execucao) {
    console.log(`Opções:`);
    console.log(`1 - Cadastrar cliente`);
    console.log(`2 - Listar todos os clientes`);
    console.log(`3 - Editar ou Remover um cliente`);
    console.log(`4 - Cadastrar produto`);
    console.log(`5 - Listar produtos`);
    console.log(`6 - Editar ou Remover um produto`);
    console.log(`7 - Adicionar servicos`);
    console.log(`8 - Listar serviços`);
    console.log(`9 - Editar ou Remover um serviço`);
    console.log(`10 - Cadastrar um pet`);
    console.log(`11 - Listar todos os pets`);
    console.log(`12 - Editar ou Remover um pet`);
    console.log(`13 - Registrar consumo`);
    console.log(`14 - Listar todos consumos`);
    console.log(`15 - Listar consumo por cliente`);
    console.log(`16 - Listar clientes que mais consumiram em quantidade`);
    console.log(`17 - Listar serviços e produtos mais consumidos`);
    console.log(`18 - Listar serviços e produtos mais consumidos por tipos e raças`);
    console.log(`19 - Listar os 5 clientes que mais gastaram em valores`);
    console.log(`0 - Sair`);

    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

    switch (opcao) {
        case 1:
            let cadastro = new CadastroCliente(empresa.getClientes)
            cadastro.cadastrar()
            break;
        case 2:
            let listagem = new ListagemClientes(empresa.getClientes)
            listagem.listar()
            break;
        case 3:
            let opcaoCliente = entrada.receberNumero(`Por favor, escolha uma opção (1 - Editar / 2 - Remover): `)
            switch (opcaoCliente) {
                case 1:
                    let edit_prod = new EditarCliente(empresa.getClientes)
                    edit_prod.editar()
                    break;
                case 2:
                    let rem_prod = new RemoverCliente(empresa.getClientes)
                    rem_prod.remover()
                    break;
                default:
                    console.log('Opção Inválida')
                    break
            }
            break;
        case 4:        
            let cad_prod = new CadastroProduto(empresa.getProdutos)
            cad_prod.cadastrar()
            break;
        case 5:
            let list_prod = new ListagemProdutos(empresa.getProdutos)
            list_prod.listar()
            break;
        case 6:
            let opcaoProduto = entrada.receberNumero(`Por favor, escolha uma opção (1 - Editar / 2 - Remover): `)
            switch (opcaoProduto) {
                case 1:
                    let edit_prod = new EditarProduto(empresa.getProdutos)
                    edit_prod.editar()
                    break;
                case 2:
                    let remove_prod = new RemoverProdutos(empresa.getProdutos)
                    remove_prod.remover()
                    break
                default:
                    console.log('Opção Inválida')
                    break
            }
            break;
            
        case 7:
            let cad_serv = new CadastroServico(empresa.getServicos)
            cad_serv.cadastrar()
            break;
        case 8:
            let list_serv = new ListagemServicos(empresa.getServicos)
            list_serv.listar()
            break;
        case 9:
            let opcaoServico = entrada.receberNumero(`Por favor, escolha uma opção (1 - Editar / 2 - Remover): `)
            switch (opcaoServico) {
                case 1:
                    let edit_serv = new EditarServico(empresa.getServicos)
                    edit_serv.editar()
                    break;
                case 2:
                    let rem_serv = new RemoverServico(empresa.getServicos)
                    rem_serv.remover()
                    break;
                default:
                    console.log('Opção Inválida')
                    break
            }
            break;
        case 10:
            let cad_pet = new CadastroPet(empresa.getClientes)
            let pet = cad_pet.cadastrar()
            if (pet) {
                empresa.getPets.push(pet)
            }
            break;
        case 11:
            let listagem_pet = new ListagemPets(empresa.getPets)
            listagem_pet.listar()
            break;
        case 12:
            let opcaoPet = entrada.receberNumero(`Por favor, escolha uma opção (1 - Editar / 2 - Remover): `)
            switch (opcaoPet) {
                case 1:
                    let edit_pet = new EditarPet(empresa.getClientes)
                    edit_pet.editar()
                    break;
                case 2:
                    let rem_pet = new RemoverPet(empresa.getClientes, empresa.getPets)
                    rem_pet.remover()
                    break;
                default:
                    console.log('Opção Inválida')
                    break
                }
                break;
        case 13:
            let cad_consumo = new CadastroConsumo(empresa.getConsumos, empresa.getClientes, empresa.getServicos, empresa.getProdutos)
            cad_consumo.cadastrar()
            break;
        case 14:
            let listar_consumo = new ListagemConsumo(empresa.getConsumos)
            listar_consumo.listar()
            break;
        case 15:
            let listar_consumo_spec = new ListagemConsumo(empresa.getConsumos)
            listar_consumo_spec.listar_especifico(empresa.getClientes)
            break;
        case 16:
            let listar_clientes_qntd = new ListagemClienteQuantidade(empresa.getConsumos)
            listar_clientes_qntd.listar()
            break;
        case 17:
            let listar_consumo_qntd = new ListagemConsumoQntd(empresa.getConsumos)
            listar_consumo_qntd.listar()
            break;
        case 18:
            let listar_tipo_raca = new ListagemConsumoPorTipoERaca(empresa.getConsumos)
            listar_tipo_raca.listar()
            break;
        case 19:
            let listar_cliente_valor = new ListagemClientesPorValor(empresa.getConsumos)
            listar_cliente_valor.listar()
            break;
        case 0:
            execucao = false
            console.log(`Até mais`)
            break;
        default:
            console.log(`Operação não entendida :(`)
    }
}