import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import Cadastro from "./cadastro";
import Edicao from "./editar";

export default class EditarPet extends Edicao {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public editar(): void {
        console.log(`\nInício da edição do pet`);

        let cpfCliente = this.entrada.receberTexto(`Informe o CPF do cliente responsável pelo pet que deseja editar: `);
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpfCliente);

        if (cliente) {
            console.log(`Cliente encontrado: ${cliente.nome}`);
            
            let nomePet = this.entrada.receberTexto(`Informe o nome do pet que deseja editar: `);
            let pet = cliente.getPets.find(pet => pet.getNome === nomePet);

            if (pet){
                pet.setNome = this.entrada.receberTexto(`Informe o nome do pet que deseja editar: `);
                pet.setRaca = this.entrada.receberTexto(`Informe a raça do pet que deseja editar: `);
                pet.setGenero = this.entrada.receberTexto(`Informe o gênero do pet que deseja editar: `);
                pet.setTipo = this.entrada.receberTexto(`Informe o tipo do pet que deseja editar: `);
            }
            else {
                console.log('O Pet não pode ser encontrado!\n')
            }
            console.log(`\nEdição concluída!\n`);
        } else {
            console.log(`\nCliente com CPF ${cpfCliente} não encontrado.\n`);
        }
    }
}