import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import Pet from "../modelo/pet";
import Remover from "./remover";

export default class RemoverPet extends Remover {
    private clientes: Array<Cliente>;
    private pets: Array<Pet>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>, pets: Array<Pet>) {
        super();
        this.clientes = clientes;
        this.pets = pets;
        this.entrada = new Entrada();
    }

    public remover(): void {
        console.log(`\nInício da remoção do pet`);

        let cpfCliente = this.entrada.receberTexto(`Informe o CPF do cliente responsável pelo pet que deseja excluir: `);
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpfCliente);

        if (cliente) {
            console.log(`Cliente encontrado: ${cliente.nome}`);

            let nomePet = this.entrada.receberTexto(`Informe o nome do pet que deseja remover: `);

            let indexPet = cliente.getPets.findIndex(pet => pet.getNome === nomePet);

            if (indexPet !== -1) {
                let petRemovido = cliente.getPets.splice(indexPet, 1)[0];
                console.log(`Pet ${petRemovido.getNome} removido com sucesso!`);
            } else {
                console.log(`\nPet com nome ${nomePet} não encontrado.\n`);
            }

            let indexPetGeral = this.pets.findIndex(pet => pet.getNome === nomePet);
                if (indexPetGeral !== -1) {
                    this.pets.splice(indexPetGeral, 1);
                }
            console.log(`\nRemoção concluída!\n`);
        } else {
            console.log(`\nCliente com CPF ${cpfCliente} não encontrado.\n`);
        }
    }
}